import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Linkify from 'react-linkify';
import FA from 'react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { checkFlag } from 'flags';
import { ifEnter } from 'utilities';
import { emailMemo, getGal, sendNotification, sendToEopf } from 'actions/tmOne';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Row } from 'Components/Layout';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import NavTabs from 'Components/NavTabs';
import InteractiveElement from 'Components/InteractiveElement';
import { generateEopfAssignments, generatePDF, generateXML } from '../Common/Utilities';

const useSend = () => checkFlag('flags.assignment_memo_send');

const MemoPreview = (props) => {
  const {
    note,
    cable,
    onCancel,
    getCableValue,
    setEditMode,
    fetchData,
  } = props;

  const dispatch = useDispatch();

  // ====================== Data Retrieval ======================

  const assignmentsRef = useSelector(state => state.noteCableAssignmentsRef);

  const gal = useSelector(state => state.getGal);
  const galErrored = useSelector(state => state.getGalErrored);
  const galLoading = useSelector(state => state.getGalLoading);

  const [recipientMode, setRecipientMode] = useState(false);
  const [galQuery, setGalQuery] = useState('');
  const [recipients, setRecipients] = useState([]);

  const getPreviewText = (fullPreview) => {
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
    const type = 'M';
    let now = new Date();
    now = now.toISOString();
    const datetime = now.replace(/\D/g, '');
    const date = datetime.substring(0, 8);
    const time = datetime.substring(8, 14);
    const filename = `TMONE_MEMO_${nmSeqNum}_${date}_${time}.pdf`;

    // ------------ Handle Send ------------

    dispatch(sendNotification({
      I_NM_SEQ_NUM: nmSeqNum,
      I_NOTE_TYPE: type,
    }, fetchData, true));

    const xml = generateXML(cable, getPreviewText(), getCableValue('SUBJECT'));
    const encodedXml = Buffer.from(JSON.stringify(xml)).toString('base64');
    dispatch(emailMemo({
      to: getCableValue('TO_ADDRESS'),
      subject: getCableValue('SUBJECT'),
      body: '',
      attachments: [{
        filename: `${getCableValue('SUBJECT')}.xml`,
        content: encodedXml,
      }],
    }));

    // ------------ Handle PDF ------------

    if (cable?.O_LAST_SENT_DATE) {
      dispatch(sendToEopf({
        transactionid: uuidv4().substring(0, 19),
        perseqnum: nmSeqNum,
        documenttype: 'TMONEAM',
        pdffilename: filename,
        pdffile: generatePDF(getPreviewText, filename, true),
        createid: note?.NM_CREATE_ID,
        assignments: generateEopfAssignments(assignmentsRef, note, now),
      }, null, true));
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
            <button onClick={() => setRecipientMode(true)}>
              Select Memo Recipients
            </button>
          </div> :
          <div className="position-form--actions">
            <button onClick={onCancel}>Back</button>
          </div>
        }
      </div>
    </Row>
  );
};

MemoPreview.propTypes = {
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
};

MemoPreview.defaultProps = {
  note: undefined,
  cable: undefined,
  onCancel: EMPTY_FUNCTION,
};

export default MemoPreview;
