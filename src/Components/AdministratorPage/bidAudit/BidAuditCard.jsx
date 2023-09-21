import { useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import { getPostName, getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_UPDATE_DATE,
} from 'Constants/SystemMessages';
import TabbedCard from 'Components/TabbedCard';
import PropTypes from 'prop-types';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { entryLevelEdit } from '../../../actions/entryLevel';

const EntryLevelCard = ({ result, id, onEditModeSearch }) => {
  const dispatch = useDispatch();

  const pos = get(result, 'position') || result;

  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');

  const [description, setDescription] = useState(getResult(pos, 'description.description'));
  const [mcDate, setMcDate] = useState(getResult(pos, 'mc_date'));

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    // TODO: during integration, replace 7 with unique card identifier
    onEditModeSearch(editMode, id);
  }, [editMode]);

  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    setMcDate(getResult(pos, 'mc_date'));
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const sections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Cycle Name': getResult(pos, 'position_number') || NO_POSITION_NUMBER },
      { 'Status': getResult(pos, 'skill_code') || NO_SKILL },
      { 'Category': getResult(pos, 'title') || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Audit Number': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Description': getPostName(get(pos, 'post') || NO_POST) },
      { 'Posted': getResult(pos, 'bureau_code') || NO_ORG },
      { 'Audit Date': getResult(pos, 'grade') || NO_GRADE },
    ],
    metadata: [
      { 'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE) },
    ],
    /* eslint-enable quote-props */
    /* eslint-enable no-dupe-keys */
  };
  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Audit Number': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Audit Date': getResult(pos, 'grade') || NO_GRADE },
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
            defaultValue={description || 'This is a test'}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="status">Posted By Date</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${mcDate ? '' : 'hide'}`} onClick={() => setMcDate(null)} />
              <DatePicker
                id={`mc-date-${id}`}
                selected={mcDate}
                onChange={setMcDate}
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
    handleSubmit: () => dispatch(entryLevelEdit(5, {})),
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
        value: 'OVERVIEW',
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
        value: 'OVERVIEW',
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
        text: 'In Categories',
        value: 'OVERVIEW',
        content: (
          <div className="position-content--container">
            <PositionExpandableContent
              sections={sections}
              form={form}
            />
          </div>
        ),
      }]}
    />
  );
};

EntryLevelCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  id: PropTypes.number,
  onEditModeSearch: PropTypes.func,
};

EntryLevelCard.defaultProps = {
  id: null,
  onEditModeSearch: EMPTY_FUNCTION,
};

export default EntryLevelCard;
