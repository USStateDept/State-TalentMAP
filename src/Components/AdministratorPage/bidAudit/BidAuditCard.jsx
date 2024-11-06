import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';
import { Tooltip } from 'react-tippy';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { formatDate } from 'utilities';
import { bidAuditRunAudit, bidAuditUpdateAudit } from 'actions/bidAudit';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import TabbedCard from 'Components/TabbedCard';
import { NO_VALUE } from 'Constants/SystemMessages';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { history } from '../../../store';

const BidAuditCard = ({ data, onEditModeSearch }) => {
  const {
    audit_id,
    audit_desc,
    cycle_id,
    cycle_category,
    cycle_name,
    cycle_status,
    posted_by_date,
    audit_date,
  } = data;

  const dispatch = useDispatch();

  const [description, setDescription] = useState(audit_desc || '');
  const [pbDate, setPbDate] = useState(posted_by_date ? new Date(posted_by_date) : '');

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setPbDate(posted_by_date ? new Date(posted_by_date) : '');
    setDescription(audit_desc || '');
    onEditModeSearch(editMode, audit_id);
  }, [editMode]);

  const onOptionClick = (type) => {
    history.push(`/profile/administrator/bidaudit/${type}/${cycle_id}/${audit_id}/`);
  };

  const onCancelForm = () => {
    setPbDate(posted_by_date ? new Date(posted_by_date) : '');
    setDescription(audit_desc || '');
    swal.close();
  };

  const onSubmitForm = () => {
    const formData = {
      id: cycle_id,
      auditNumber: audit_id,
      postByDate: formatDate(pbDate),
      auditDescription: description,
    };
    dispatch(bidAuditUpdateAudit(formData, setEditMode(false)));
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const submitRunAudit = () => {
    dispatch(bidAuditRunAudit({
      cycleId: cycle_id,
      auditNbr: audit_id,
    }));
    swal.close();
  };

  const onRunBidAudit = () => {
    swal({
      title: 'Run Bid Audit?',
      button: false,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{'Are you sure you want to run this Bid Audit?'}</span>
          </div>
          <div className="modal-controls">
            <button onClick={submitRunAudit} type="submit">Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  const onShowAuditData = () => {
    history.push(`/profile/administrator/bidaudit/data/${cycle_id}/${audit_id}/`);
  };

  const showRunBidAudit = () => (
    <div className="ba-run-audit">
      <Tooltip title="Run Bid Audit">
        <a role="button" tabIndex={0} onClick={onRunBidAudit}>
          Run Audit
        </a>
      </Tooltip>
    </div>
  );

  const showAuditData = () => (
    <div className="ba-run-audit">
      <Tooltip title="View Audit Data">
        <a role="button" tabIndex={0} onClick={onShowAuditData}>
          {audit_date}
        </a>
      </Tooltip>
    </div>
  );

  const bidAuditSections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': cycle_name || NO_VALUE },
      { 'Status': cycle_status || NO_VALUE },
      { 'Category': cycle_category || NO_VALUE },
    ],
    bodyPrimary: [
      { 'Audit Number': audit_id || NO_VALUE },
      { 'Description': audit_desc || NO_VALUE },
      { 'Positions Posted By': posted_by_date || NO_VALUE },
      { 'Audit Date': audit_date ? showAuditData() : showRunBidAudit() },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const bidAuditForm = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Audit Number': audit_id || NO_VALUE },
      { 'Audit Date': audit_date || NO_VALUE },
    ],
    inputBody: (
      <div className="position-form">
        <div className="position-form--label-input-container">
          <label htmlFor="description">Audit Description</label>
          <TextareaAutosize
            maxRows={2}
            minRows={1}
            maxLength="100"
            name="description"
            placeholder="Please provide a description of the bid season."
            defaultValue={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="word-count">
          {description?.length} / 100
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="status">Positions Posted By</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${pbDate ? '' : 'hide'}`} onClick={() => setPbDate(null)} />
              <DatePicker
                id={`mc-date-${audit_id}`}
                selected={pbDate}
                onChange={setPbDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                ref={datePickerRef}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="ba-flex-end">
            <button onClick={() => onOptionClick('grade')}>View At Grades</button>
            <button onClick={() => onOptionClick('category')}>View In Skill Categories</button>
          </div>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    disableSubmit: (!pbDate || !description),
    handleSubmit: onSubmitForm,
    handleCancel: onCancelForm,
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  return (
    <TabbedCard
      tabs={[{
        text: 'Bid Audit',
        value: 'Bid Audit',
        content: (
          <div className="position-content--container">
            <PositionExpandableContent
              sections={bidAuditSections}
              form={bidAuditForm}
              saveText="Save Audit Cycle"
            />
          </div>
        ),
      },
      ]}
    />
  );
};

BidAuditCard.propTypes = {
  data: PropTypes.shape({
    audit_id: PropTypes.number,
    audit_desc: PropTypes.string,
    cycle_id: PropTypes.number,
    cycle_category: PropTypes.string,
    cycle_category_code: PropTypes.string,
    cycle_name: PropTypes.string,
    cycle_status: PropTypes.string,
    cycle_status_code: PropTypes.string,
    posted_by_date: PropTypes.string,
    audit_date: PropTypes.string,
  }).isRequired,
  onEditModeSearch: PropTypes.func,
};

BidAuditCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
};

export default BidAuditCard;
