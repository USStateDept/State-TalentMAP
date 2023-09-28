import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import { getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL,
} from 'Constants/SystemMessages';
import TabbedCard from 'Components/TabbedCard';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import { deleteBidAudit, savebidAuditSelections } from 'actions/bidAudit';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import BidAuditSections from './BidAuditSections/BidAuditSections';

const BidAuditCard = ({ result, id, onEditModeSearch, atGrades, inCategories }) => {
  const dispatch = useDispatch();
  const pos = get(result, 'position') || result;
  const [description, setDescription] = useState(result.description || '');
  const [pbDate, setPbDate] = useState(getResult(pos, 'mc_date'));
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    onEditModeSearch(editMode, id);
  }, [editMode]);

  const onSubmitBidData = () => {
    const data = {
      id,
      description,
      pbDate,
    };
    dispatch(savebidAuditSelections(data));
  };

  const onDelete = () => {
    swal({
      title: 'Confirm Removal',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>
              Are you sure you want to remove this audit cycle?
            </span>
          </div>
          <div className="modal-controls">
            <button onClick={() => {
              dispatch(deleteBidAudit(id));
              swal.close();
            }}
            >Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div>
      ),
    });
  };

  const onCancelForm = () => {
    setPbDate(getResult(pos, 'mc_date'));
  };

  const gradeOptions = [
    { code: 1, name: '01' },
    { code: 2, name: '02' },
    { code: 3, name: '03' },
    { code: 4, name: '04' },
    { code: 5, name: '05' },
    { code: 6, name: '06' },
  ];

  const skillCode = [
    { code: 1, name: '2044' },
    { code: 2, name: '2045' },
    { code: 3, name: '2046' },
    { code: 4, name: '2047' },
    { code: 5, name: '2048' },
    { code: 6, name: '2049' },
  ];

  const tenureCode = [
    { code: 1, name: 'INFORMATION MANAGEMENT' },
    { code: 2, name: 'SYSTEM MANAGEMENT' },
    { code: 3, name: 'DATABASE MANAGEMENT' },
    { code: 4, name: 'PIT' },
    { code: 5, name: 'INFORMATION ADMIN' },
    { code: 6, name: 'BUREAU MANAGEMENT' },
  ];

  const onEditChange = () => {
    setEditMode(e => !e);
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const bidAuditSections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': result.cycle_name || NO_POSITION_NUMBER },
      { 'Status': result.cycle_status || NO_SKILL },
      { 'Category': result.cycle_category || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Description': result.description || NO_POST },
      { 'Posted': result.bid_audit_date_posted || NO_ORG },
      { 'Audit Date': result.bid_audit_date || NO_GRADE },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const bidAuditForm = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Audit Date': result.bid_audit_date || NO_GRADE },
    ],
    inputBody: (
      <div className="position-form">
        <div className="position-form--label-input-container">
          <label htmlFor="description">Audit Description</label>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxLength="4000"
            name="description"
            placeholder="Please provide a description of the bid season."
            defaultValue={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="status">Posted By Date</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${pbDate ? '' : 'hide'}`} onClick={() => setPbDate(null)} />
              <DatePicker
                id={`mc-date-${id}`}
                selected={pbDate}
                onChange={setPbDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="MM/DD/YYYY"
                ref={datePickerRef}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    handleSubmit: () => onSubmitBidData(),
    handleCancel: () => onCancelForm(),
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  const atGradesSections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': result.cycle_name || NO_POSITION_NUMBER },
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Description': result.description || NO_SKILL },
      { 'Posted': result.bid_audit_date || NO_POSITION_TITLE },
      { '': <Link to="#">Add New At Grade</Link> },
    ],
    bodyPrimary: [
      { '': <BidAuditSections rows={atGrades} onEditChange={onEditChange} /> },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };

  const atGradesForm = {
    /* eslint-disable quote-props */
    staticBody: [],
    inputBody: (
      <div className="position-form bid-audit-form">
        <div className="filter-div">
          <div className="label">Position Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade?.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Position Skill Code - Description:</div>
          <select>
            {skillCode.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Skill Code - Description:</div>
          <select>
            {skillCode.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Tenure Code - Description:</div>
          <select>
            {tenureCode.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    handleSubmit: () => onSubmitBidData(),
    handleCancel: () => onCancelForm(),
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  const inCategoriesSections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': result.cycle_name || NO_POSITION_NUMBER },
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Description': result.description || NO_SKILL },
      { 'Posted': result.bid_audit_date || NO_POSITION_TITLE },
      { '': <Link to="#">Add New In Category</Link> },
    ],
    bodyPrimary: [
      { '': <BidAuditSections rows={inCategories} onEditChange={onEditChange} /> },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const inCategoriesForm = {
    /* eslint-disable quote-props */
    staticBody: [],
    inputBody: (
      <div className="position-form bid-audit-form">
        <div className="filter-div">
          <div className="label">Position Skill Code - Description:</div>
          <select>
            {tenureCode.map(grade => (
              <option value={grade?.name} key={grade?.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Skill Code - Description:</div>
          <select>
            {tenureCode.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    handleSubmit: () => onSubmitBidData(),
    handleCancel: () => onCancelForm(),
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
            />
          </div>
        ),
      },
      {
        text: 'At Grades',
        value: 'At Grades',
        content: (
          <div className="position-content--container">
            <PositionExpandableContent
              sections={atGradesSections}
              form={atGradesForm}
              tempHideEdit
            />
          </div>
        ),
      },
      {
        text: 'In Categories',
        value: 'In Categories',
        content: (
          <div className="position-content--container">
            <PositionExpandableContent
              sections={inCategoriesSections}
              form={inCategoriesForm}
              tempHideEdit
            />
          </div>
        ),
      }]}
    />
  );
};

BidAuditCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  id: PropTypes.number,
  onEditModeSearch: PropTypes.func,
  atGrades: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string,
    subHeader1: PropTypes.string,
    subHeader2: PropTypes.string,
    subHeader3: PropTypes.string,
    row1data: PropTypes.string,
    row2data: PropTypes.string,
    row3data: PropTypes.string,
  })),
  inCategories: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string,
    subHeader1: PropTypes.string,
    subHeader2: PropTypes.string,
    subHeader3: PropTypes.string,
    row1data: PropTypes.string,
    row2data: PropTypes.string,
    row3data: PropTypes.string,
  })),
};

BidAuditCard.defaultProps = {
  result: {},
  id: null,
  onEditModeSearch: EMPTY_FUNCTION,
  atGrades: [],
  inCategories: [],
};

export default BidAuditCard;
