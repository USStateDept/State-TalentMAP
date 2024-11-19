import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { getGal, sendNotification } from 'actions/assignmentNotifications';
import { checkFlag } from 'flags';
import { ifEnter } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Row } from 'Components/Layout';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import NavTabs from 'Components/NavTabs';
import InteractiveElement from 'Components/InteractiveElement';
import { generateHTML, generatePDF, generateSoapXML, generateXML } from '../Common/Utilities';
import { getOpsData, getOpsWsdl, sendSoap, sendToEopf } from '../../../../actions/assignmentNotifications';

const useNotificationSend = () => checkFlag('flags.assignment_notification_send');
const useMemoSend = () => checkFlag('flags.assignment_memo_send');

const Preview = (props) => {
  const {
    note,
    cable,
    onCancel,
    memo,
    getCableValue,
    setEditMode,
    fetchData,
  } = props;

  const dispatch = useDispatch();

  const useSend = memo ? useMemoSend() : useNotificationSend();

  // ====================== Data Retrieval ======================

  const assignmentsRef = useSelector(state => state.noteCableAssignmentsRef);

  const gal = useSelector(state => state.getGal);
  const galErrored = useSelector(state => state.getGalErrored);
  const galLoading = useSelector(state => state.getGalLoading);

  const opsWsdl = useSelector(state => state.getOpsWsdl);
  const opsWsdlErrored = useSelector(state => state.getOpsWsdlErrored);
  const opsWsdlLoading = useSelector(state => state.getOpsWsdlLoading);

  const opsData = useSelector(state => state.getOpsData);
  const opsDataErrored = useSelector(state => state.getOpsDataErrored);
  const opsDataLoading = useSelector(state => state.getOpsDataLoading);

  const [recipientMode, setRecipientMode] = useState(false);
  const [galQuery, setGalQuery] = useState('');
  const [recipients, setRecipients] = useState([]);

  const opsLoading = opsWsdlLoading || opsDataLoading;
  const opsErrored = opsWsdlErrored || opsDataErrored;

  const disableSend = opsLoading || opsErrored;

  useEffect(() => {
    // Fetch OPS Data to Prepare for Send Notification (Not Applicable to Memo)
    dispatch(getOpsWsdl());
    dispatch(getOpsData({ PV_NM_SEQ_NUM_I: note?.NM_SEQ_NUM }));
  }, []);

  const getPreviewText = (fullPreview) => {
    if (!memo) {
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
    }
    const memoPreview = [
      `${getCableValue('ASSIGNMENTS')}\n`,
      `${getCableValue('COMBINED TOD')}\n`,
      `${getCableValue('REMARKS')}\n`,
      `${getCableValue('PARAGRAPHS')}\n`,
    ];
    if (fullPreview) {
      const memoFullPreview = [
        '\n\n',
        'MEMORANDUM\n',
        `TO: ${getCableValue('TO_ADDRESS')}\n`,
        `FROM: ${getCableValue('FROM_ADDRESS')}\n`,
        `SUBJECT: ${getCableValue('SUBJECT')}\n`,
        `LAST SENT: ${cable?.O_LAST_SENT_DATE}\n`,
        ...memoPreview,
      ];
      return memoFullPreview.join('\n');
    }
    return memoPreview.join('\n');
  };

  const handleSend = () => {
    const nmSeqNum = note?.NM_SEQ_NUM;
    const type = memo ? 'M' : 'C';
    let now = new Date();
    now = now.toISOString();
    now = now.replace(/\D/g, '');
    const date = now.substring(0, 8);
    const time = now.substring(8, 14);
    const filename = `TMONE_${memo ? 'MEMO' : 'CABLE'}_${nmSeqNum}_${date}_${time}.pdf`;

    // ------------ Handle Send ------------

    generateXML(cable, getPreviewText(), getCableValue('SUBJECT'));
    generateHTML(getCableValue, cable?.O_LAST_SENT_DATE, getPreviewText());
    dispatch(sendNotification({
      I_NM_SEQ_NUM: nmSeqNum,
      I_NOTE_TYPE: type,
    }, fetchData, memo));

    // ------------ Handle PDF ------------

    if (cable?.O_LAST_SENT_DATE) {
      const assignmentsParam = [];
      if (assignmentsRef) {
        assignmentsRef.forEach(a => {
          assignmentsParam.push({
            positionnumber: a.POS_NUM_TXT,
            location: a.POS_LOCATION_CODE,
            positiontitle: a.POS_TITLE_TXT,
            eta: a.ASGD_ETA_DATE,
            ted: a.ASGD_ETD_TED_DATE,
            travelfunction: a.TF_CD,
            datesent: cable?.O_LAST_SENT_DATE,
            status: a.ASGS_CODE,
            nmnotificationind: note?.NM_NOTIFICATION_IND,
            effectivedate: cable?.O_LAST_SENT_DATE,
          });
        });
      }
      dispatch(sendToEopf({
        transactionid: uuidv4(),
        perseqnum: nmSeqNum,
        documenttype: `Assignment ${memo ? 'Memo' : 'Cable'}`,
        pdffilename: filename,
        pdffile: generatePDF(getPreviewText, filename, memo),
        createid: note?.NM_CREATE_ID,
        assignments: assignmentsParam,
      }, null, memo));
    }

    // ------------ Handle OPS ------------

    if (!memo) {
      const opsLogData = opsData?.PQRY_OTL_LOG_TM1_O?.[0];
      if (opsLogData) {
        const soapXml = generateSoapXML(opsLogData);
        dispatch(sendSoap({
          soapRequest: {
            WSDL: opsWsdl.PV_PARM_VALUE_O,
            SOAP: soapXml,
          },
          logRequest: {
            PV_OTL_TM_DATA_I: soapXml,
            PV_ETL_SEQ_NBR_I: opsLogData.ETL_SEQ_NUM,
          },
        }, null));
      }
    }
  };

  const getOverlay = () => {
    let overlay;
    if (galLoading) {
      overlay = <Spinner type="small" size="small" />;
    } else if (galErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  if (recipientMode) {
    return (
      <Row fluid className="tabbed-card box-shadow-standard">
        <Row fluid className="tabbed-card--header">
          <NavTabs
            tabs={[{ text: 'Recipients', value: 'RECIPIENTS' }]}
            value="RECIPIENTS"
            styleVariant="lightBorderBottom"
          />
        </Row>
        <div className="position-content position-form notification-card">
          <div className="notification-card__header">
            <span>
              Memorandum
            </span>
            <span>
              Search by last name for a list of recipients to add to the email.
            </span>
          </div>
          <div className="gal-lookup">
            <div className="gal-lookup__input">
              <label htmlFor="gal-lookup" className="gal-label">GAL Lookup</label>
              <div>
                <input
                  id="gal-lookup"
                  name="gal-lookup"
                  placeholder="Last Name"
                  value={galQuery}
                  onChange={(e) => setGalQuery(e.target.value)}
                  onKeyUp={(e) => { if (ifEnter(e)) dispatch(getGal({ PV_LAST_NAME_I: galQuery })); }}
                />
                <button onClick={() => dispatch(getGal({ PV_LAST_NAME_I: galQuery }))}>
                  Search
                </button>
              </div>
            </div>
            <div className="recipients">
              <div className="recipients-list">
                <div className="gal-label">Recipient Results</div>
                {getOverlay() || (
                  gal?.length > 0 &&
                  <div className="gal-result">
                    {gal?.map(g => (
                      <div
                        key={g.GAL_SMTP_EMAIL_ADRS_TEXT}
                        tabIndex={0}
                        role="button"
                        className="gal-result__item clickable"
                        onClick={() => {
                          const match = recipients.find(r => r.GAL_SMTP_EMAIL_ADRS_TEXT === g.GAL_SMTP_EMAIL_ADRS_TEXT);
                          if (!match) {
                            setRecipients([...recipients, g]);
                          }
                        }}
                      >
                        {g.GAL_DISPLAY_NAME}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="recipients-list">
                <div className="gal-label">Added Recipients</div>
                {recipients?.length > 0 &&
                  <div className="gal-result">
                    {recipients?.map(g => (
                      <div className="gal-result__item">
                        <div>{g.GAL_DISPLAY_NAME}</div>
                        <InteractiveElement
                          title={`Remove Recipient ${g.GAL_DISPLAY_NAME}`}
                          onClick={() => {
                            const removed = recipients.filter(r => r.GAL_SMTP_EMAIL_ADRS_TEXT !== g.GAL_SMTP_EMAIL_ADRS_TEXT);
                            setRecipients(removed);
                          }}
                          className="delete-button"
                        >
                          <FA name="trash" className="fa-lg" />
                        </InteractiveElement>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="position-form--actions">
            <button onClick={() => setRecipientMode(false)}>Back to Preview</button>
            <button onClick={() => handleSend()} disabled={recipients?.length === 0}>Email Memo</button>
          </div>
        </div>
      </Row>
    );
  }
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
          {memo ?
            <>
              <span>
                Memorandum
              </span>
              <span className="notification-card__header-subtitle">To</span>
              <span>
                {getCableValue('TO_ADDRESS') ?? '---'}
              </span>
              <span className="notification-card__header-subtitle">From</span>
              <span>
                {getCableValue('FROM_ADDRESS') ?? '---'}
              </span>
              <span className="notification-card__header-subtitle">Subject</span>
              <span>
                {getCableValue('SUBJECT') ?? '---'}
              </span>
              <span className="notification-card__header-subtitle">Last Sent</span>
              <span>
                {cable?.O_LAST_SENT_DATE ?? '---'}
              </span>
              <span className="notification-card__header-subtitle">Body</span>
            </> :
            <>
              <span>
                Notification
              </span>
              <span>
                The Notification Cable for {getCableValue('EMPLOYEE FULL NAME')} will be emailed to the Dos Communications Center from the preparer {getCableValue('FROM_ADDRESS')}.
              </span>
            </>
          }
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
        <div className="position-form--actions">
          {useSend ?
            <>
              <button onClick={onCancel}>Cancel</button>
              <button
                onClick={() => { if (memo) { setRecipientMode(true); } else { handleSend(); } }}
                disabled={!memo && disableSend}
              >
                {memo ? 'Select Memo Recipients' : 'Send Cable'}
              </button>
            </> :
            <button onClick={onCancel}>Back</button>
          }
        </div>
      </div>
    </Row>
  );
};

Preview.propTypes = {
  note: PropTypes.shape({
    NM_SEQ_NUM: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    NM_NOTIFICATION_IND: PropTypes.string,
    NM_CREATE_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  cable: PropTypes.shape({
    O_LAST_SENT_DATE: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  memo: PropTypes.bool,
  getCableValue: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

Preview.defaultProps = {
  note: undefined,
  cable: undefined,
  onCancel: EMPTY_FUNCTION,
  memo: false,
};

export default Preview;
