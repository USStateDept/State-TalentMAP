import { useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
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
import PositionExpandableContent from 'Components/PositionExpandableContent';
import BidAuditSections from './BidAuditSections/BidAuditSections';

const BidAuditCard = ({ result, id, onEditModeSearch }) => {
  const pos = get(result, 'position') || result;
  const [description, setDescription] = useState(result.description || '');
  const [pbDate, setPbDate] = useState(getResult(pos, 'mc_date'));
  // const [selectedGrade, setSelectedGrade] = useState();
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    // TODO: during integration, replace 7 with unique card identifier
    onEditModeSearch(editMode, id);
  }, [editMode]);

  const onSubmitData = () => {
    const data = {
      id,
      description,
      pbDate,
    };
    console.log('data', data);
    console.log('results', result);
  };

  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    setPbDate(getResult(pos, 'mc_date'));
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const sections = {
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
  const form = {
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
            maxlength="4000"
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
    handleSubmit: () => onSubmitData(),
    handleCancel: () => onCancelForm(),
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };
  const rows = [
    { header: 'Position', subHeader1: 'Grade', subHeader2: 'Skill Code', subHeader3: 'Descrition', row1data: result.id || 'None Listed', row2data: result.code || 'None Listed', row3data: result.descriptionTitle || 'None Listed' },
    { header: 'Employee', subHeader1: 'Grade', subHeader2: 'Skill Code', subHeader3: 'Descrition', row1data: result.id || 'None Listed', row2data: result.code || 'None Listed', row3data: result.descriptionTitle || 'None Listed' },
    { header: 'Tenure', subHeader1: 'Code', subHeader2: 'Description', row1data: result.code || 'None Listed', row2data: result.descriptionTitle || 'None Listed' },
  ];

  const inCategories = [
    { header: 'Position', subHeader1: 'Grade', subHeader2: 'Skill Code', subHeader3: 'Descrition', row1data: result.id || 'None Listed', row2data: result.code || 'None Listed', row3data: result.descriptionTitle || 'None Listed' },
    { header: 'Employee', subHeader1: 'Grade', subHeader2: 'Skill Code', subHeader3: 'Descrition', row1data: result.id || 'None Listed', row2data: result.code || 'None Listed', row3data: result.descriptionTitle || 'None Listed' },
  ];

  const gradeOptions = [
    { code: 1, name: '1' },
    { code: 2, name: '2' },
    { code: 3, name: '3' },
    { code: 4, name: '4' },
    { code: 5, name: '5' },
    { code: 6, name: '6' },
  ];
  const onEditChange = () => {
    setEditMode(e => !e);
  };

  const sections2 = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': result.cycle_name || NO_POSITION_NUMBER },
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Description': result.cycle_status || NO_SKILL },
      { 'Posted': result.bid_audit_date || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { '': <BidAuditSections rows={rows} onEditChange={onEditChange} /> },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const form2 = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Audit Number': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Audit Date': getResult(pos, 'grade') || NO_GRADE },
    ],
    inputBody: (
      <div className="position-form bid-audit-form">
        <div className="filter-div">
          <div className="label">Position Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Position Skill Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Skill Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Tenure Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    handleSubmit: () => onSubmitData(),
    handleCancel: () => onCancelForm(),
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  const sections3 = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': result.cycle_name || NO_POSITION_NUMBER },
      { 'Audit Number': result.id || NO_BUREAU },
      { 'Description': result.cycle_status || NO_SKILL },
      { 'Posted': result.bid_audit_date || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { '': <BidAuditSections rows={inCategories} onEditChange={onEditChange} /> },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const form3 = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Audit Number': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Audit Date': getResult(pos, 'grade') || NO_GRADE },
    ],
    inputBody: (
      <div className="position-form bid-audit-form">
        <div className="filter-div">
          <div className="label">Position Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Position Skill Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Grade:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Employee Skill Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-div">
          <div className="label">Tenure Code - Description:</div>
          <select>
            {gradeOptions.map(grade => (
              <option value={grade.code}>{grade.name}</option>
            ))}
          </select>
        </div>
      </div>
    ),
    cancelText: 'Are you sure you want to discard all changes made to this position?',
    handleSubmit: () => onSubmitData(),
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
              sections={sections}
              form={form}
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
              sections={sections2}
              form={form2}
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
              sections={sections3}
              form={form3}
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
};

BidAuditCard.defaultProps = {
  id: null,
  onEditModeSearch: EMPTY_FUNCTION,
};

export default BidAuditCard;
