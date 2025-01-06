/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import { emailNotification, getOpsData, getOpsSoapAction, getOpsWsdl, sendNotification, sendSoap, sendToEopf } from 'actions/tmOne';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Row } from 'Components/Layout';
import Alert from 'Components/Alert';
import NavTabs from 'Components/NavTabs';
import { generateEopfAssignments, generatePDF, generateSoapXML, generateXML } from '../Common/Utilities';

const useSend = () => checkFlag('flags.assignment_notification_send');

const NotePreview = (props) => {
  const {
    note,
    cable,
    onCancel,
    getCableValue,
    setEditMode,
    fetchData,
    perseqnum,
  } = props;

  const dispatch = useDispatch();

  // ====================== Data Retrieval ======================

  const assignmentsRef = useSelector(state => state.noteCableAssignmentsRef);

  const opsWsdl = useSelector(state => state.getOpsWsdl);
  const opsWsdlErrored = useSelector(state => state.getOpsWsdlErrored);
  const opsWsdlLoading = useSelector(state => state.getOpsWsdlLoading);

  const opsAction = useSelector(state => state.getOpsSoapAction);
  const opsActionErrored = useSelector(state => state.getOpsSoapActionErrored);
  const opsActionLoading = useSelector(state => state.getOpsSoapActionLoading);

  const opsData = useSelector(state => state.getOpsData);
  const opsDataErrored = useSelector(state => state.getOpsDataErrored);
  const opsDataLoading = useSelector(state => state.getOpsDataLoading);

  const opsLoading = opsWsdlLoading || opsActionLoading || opsDataLoading;
  const opsErrored = opsWsdlErrored || opsActionErrored || opsDataErrored;

  const prepareNoteSendError = opsLoading || opsErrored;

  useEffect(() => {
    // Fetch OPS Data to Prepare for Send Notification (Not Applicable to Memo)
    dispatch(getOpsWsdl());
    dispatch(getOpsSoapAction());
    dispatch(getOpsData({ PV_NM_SEQ_NUM_I: note?.NM_SEQ_NUM }));
  }, []);

  const getPreviewText = () => {
    const notePreview = [
      `${getCableValue('CLASSIFICATION')}\n\n`,
      `${getCableValue('DRAFTING OFFICE')}`,
      `${getCableValue('DATE')} - ${getCableValue('TELEPHONE')}`,
      `${getCableValue('APPROVING OFFICE')}\n`,
      `${getCableValue('CLEARANCE')}\n`,
      // `${getCableValue('DISTRIBUTION')}\n`,
      // `${getCableValue('ACTION')}\n`,
      // `${getCableValue('INFORMATION')}\n`,
      `${getCableValue('SPECIAL HANDLING')}\n`,
      `${getCableValue('CAPTIONS')}\n`,
      `${getCableValue('E.O.')}\n`,
      `${getCableValue('TAGS')}\n`,
      `${getCableValue('SUBJECT')}\n`,
      `1. ${getCableValue('ASSIGNMENTS')}\n`,
      `2. ${getCableValue('COMBINED TOD')}\n`,
      `3. ${getCableValue('EFM')}\n`,
      `4. ${getCableValue('REMARKS')}\n`,
      `5. ${getCableValue('PARAGRAPHS')}\n`,
      `${getCableValue('EOM')}`,
    ];
    return notePreview.join('\n');
  };

  const handleSend = () => {
    const nmSeqNum = note?.NM_SEQ_NUM;
    const type = 'C';
    let now = new Date();
    now = now.toISOString();
    const datetime = now.replace(/\D/g, '');
    const date = datetime.substring(0, 8);
    const time = datetime.substring(8, 14);
    const filename = `TMONE_CABLE_${nmSeqNum}_${date}_${time}.pdf`;

    // ------------ Handle Send ------------

    dispatch(sendNotification({
      I_NM_SEQ_NUM: nmSeqNum,
      I_NOTE_TYPE: type,
    }, fetchData));

    const xml = generateXML(cable, getPreviewText(), getCableValue('SUBJECT'));
    const encodedXml = Buffer.from(xml).toString('base64');

    console.log('XML:\n', xml);
    console.log('xml of type: \n', typeof xml);
    console.log('Encoded XML:\n', encodedXml);
    console.log('encodedXml of type: \n', typeof encodedXml);

    // to: getCableValue('TO_ADDRESS'),

    dispatch(emailNotification({
      to: 'ShahM1@state.gov',
      subject: getCableValue('SUBJECT'),
      body: 'XML test runs on Jan 6th, 2025',
      attachments: [{
        filename: `${getCableValue('SUBJECT')}.xml`,
        content: encodedXml,
      }],
    }));

    // ------------ Handle PDF ------------

    if (cable?.O_LAST_SENT_DATE) {
      dispatch(sendToEopf({
        transactionid: uuidv4().substring(0, 19),
        perseqnum,
        documenttype: 'TMONEAC',
        pdffilename: filename,
        pdffile: generatePDF(getPreviewText, filename),
        createid: note?.NM_CREATE_ID,
        assignments: generateEopfAssignments(assignmentsRef, note, now),
      }));
    }

    // ------------ Handle OPS ------------

    const opsLogData = opsData?.PQRY_OTL_LOG_TM1_O?.[0];
    if (opsLogData) {
      const soapXml = generateSoapXML(opsLogData);
      dispatch(sendSoap({
        soapRequest: {
          WSDL: opsWsdl.PV_PARM_VALUE_O,
          ACTION: opsAction.PV_PARM_VALUE_O,
          SOAP: soapXml,
        },
        logRequest: {
          PV_OTL_TM_DATA_I: soapXml,
          PV_ETL_SEQ_NBR_I: opsLogData.ETL_SEQ_NUM,
        },
      }, null));
    }
  };

  return (
    <Row fluid className="tabbed-card box-shadow-standard">
      <Row fluid className="tabbed-card--header">
        <NavTabs
          tabs={[{ text: 'Preview', value: 'PREVIEW' }]}
          value="PREVIEW"
          styleVariant="lightBorderBottom"
        />
      </Row>
      <div className="position-content position-form notification-card">
        <button className="toggle-edit-mode notification-card__rebuild" onClick={() => setEditMode(true)}>
          <FA name="pencil" />
          <div>Edit</div>
        </button>
        <div className="notification-card__header">
          <span>
            Notification
          </span>
          <span>
            The Notification Cable for {getCableValue('EMPLOYEE FULL NAME')} will be emailed to the Dos Communications Center from the preparer {getCableValue('FROM_ADDRESS')}.
          </span>
        </div>
        <Row fluid className="position-content--description">
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={50}
              minRows={1}
              maxLength="500"
              name="preview-body"
              value={getPreviewText()}
              draggable={false}
              disabled
            />
          </Linkify>
          <div className="word-count">
            {getPreviewText()?.length} / 500
          </div>
        </Row>
        {useSend ?
          <div className="position-form--actions">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleSend}>
              Send Cable
            </button>
          </div> :
          <>
            {prepareNoteSendError &&
              <Alert
                type="error"
                title="Error preparing data for send functionality"
                messages={[{ body: 'Please try again.' }]}
              />
            }
            <div className="position-form--actions">
              <button onClick={onCancel}>Back</button>
            </div>
          </>
        }
      </div>
    </Row>
  );
};

NotePreview.propTypes = {
  note: PropTypes.shape({
    NM_SEQ_NUM: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    NM_NOTIFICATION_IND: PropTypes.string,
    NM_CREATE_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  cable: PropTypes.shape({
    O_LAST_SENT_DATE: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  getCableValue: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  perseqnum: PropTypes.string.isRequired,
};

NotePreview.defaultProps = {
  note: undefined,
  cable: undefined,
  onCancel: EMPTY_FUNCTION,
};

export default NotePreview;
