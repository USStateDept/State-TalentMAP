import { useEffect, useRef, useState } from 'react';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import { getPostName, getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import PropTypes from 'prop-types';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import LanguageList from '../../LanguageList/LanguageList';
import { entryLevelEdit } from '../../../actions/entryLevel';

const EntryLevelCard = ({ result, id, onEditModeSearch }) => {
  const dispatch = useDispatch();

  const pos = get(result, 'position') || result;

  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');

  const [el, setEl] = useState(getResult(pos, 'el') === 'true');
  const [lna, setLna] = useState(getResult(pos, 'lna') === 'true');
  const [fica, setFica] = useState(getResult(pos, 'fica') === 'true');
  const [mc, setMc] = useState(getResult(pos, 'mc') === 'true');
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
    setMcDate(null);
  };

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const sections = {
    /* eslint-disable no-dupe-keys */
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': getResult(pos, 'position_number') || NO_POSITION_NUMBER },
      { 'Skill': getResult(pos, 'skill_code') || NO_SKILL },
      { 'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Location': getPostName(get(pos, 'post') || NO_POST) },
      { 'Org/Code': getResult(pos, 'bureau_code') || NO_ORG },
      { 'Grade': getResult(pos, 'grade') || NO_GRADE },
      { 'Job Category': 'None Listed' },
      { '': <CheckBox id="el" label="EL" value={el} disabled /> },
      { '': <CheckBox id="lna" label="LNA" value={lna} disabled /> },
      { '': <CheckBox id="fica" label="FICA" value={fica} disabled /> },
      { '': <CheckBox id="mc" label="MC" value={mc} disabled /> },
      { 'MC Date': getResult(pos, 'mc_date') || '---' },
    ],
    bodySecondary: [
      { 'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" /> },
      { 'O/D': getResult(pos, 'grade') || NO_GRADE },
      { 'Incumbent': getResult(pos, 'current_assignment.user') || NO_USER_LISTED },
      { 'Incumbent TED': getResult(pos, 'current_assignment.user') || NO_USER_LISTED },
      { 'Assignee': getResult(pos, 'assignee') || NO_USER_LISTED },
      { 'Assignee TED': getResult(pos, 'assignee') || NO_USER_LISTED },
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
      { 'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU },
      { 'Location': getPostName(get(pos, 'post') || NO_POST) },
      { 'Org/Code': getResult(pos, 'bureau_code') || NO_ORG },
      { 'Grade': getResult(pos, 'grade') || NO_GRADE },
      { 'Job Category': 'None Listed' },
      { 'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" /> },
      { 'O/D': getResult(pos, 'grade') || NO_GRADE },
      { 'Incumbent': getResult(pos, 'current_assignment.user') || NO_USER_LISTED },
      { 'Incumbent TED': getResult(pos, 'current_assignment.user') || NO_USER_LISTED },
      { 'Assignee': getResult(pos, 'assignee') || NO_USER_LISTED },
      { 'Assignee TED': getResult(pos, 'assignee') || NO_USER_LISTED },
    ],
    inputBody: (
      <div className="position-form">
        <div className="checkbox-group">
          <CheckBox id={`el-${id}`} label="EL" value={el} onChange={setEl} />
          <CheckBox id={`lna-${id}`} label="LNA" value={lna} onChange={setLna} />
          <CheckBox id={`fica-${id}`} label="FICA" value={fica} onChange={setFica} />
          <CheckBox id={`mc-${id}`} label="MC" value={mc} onChange={setMc} />
        </div>
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="status">MC End Date</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${mcDate ? '' : 'hide'}`} onClick={() => setMcDate(null)} />
              <DatePicker
                id={`mc-date-${id}`}
                selected={mcDate}
                onChange={setMcDate}
                dateFormat="MM/dd/yyyy"
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
        text: 'Position Overview',
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
