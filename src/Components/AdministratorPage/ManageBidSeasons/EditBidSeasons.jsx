import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import InteractiveElement from 'Components/InteractiveElement';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

// eslint-disable-next-line complexity
const EditBidSeasons = (props) => {
  const { details, seasonInfo, id } = props;
  const [status, setStatus] = useState(details.status);
  const [description, setDescription] = useState('');
  const [season, setSeason] = useState(details.ocReason);
  const stepLetterOneDate = !get(details, 'stepLetterOne') ? null : new Date(get(details, 'stepLetterOne'));
  const stepLetterTwoDate = !get(details, 'stepLetterTwo') ? null : new Date(get(details, 'stepLetterTwo'));
  const stepLetterThreeDate = !get(details, 'stepLetterTwo') ? null : new Date(get(details, 'stepLetterTwo'));
  const [stepLetterOne, setStepLetterOne] = useState(stepLetterOneDate);
  const [stepLetterTwo, setStepLetterTwo] = useState(stepLetterTwoDate);
  const [stepLetterThree, setStepLetterThree] = useState(stepLetterThreeDate);
  // To Do: Move these to the DB/Django backend after more user feedback

  const submit = (e) => {
    e.preventDefault();
    swal.close();
    // Doing nothing for now but closing.
    const userInputs = {
      // 'notes' on ui
      comments: description || '',
      step_letter_one: stepLetterOne,
      step_letter_two: stepLetterTwo,
    };
    setStatus(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const ocSelected = status === 'OC';
  const seasonError = ocSelected && !season;
  const stepLetterOneFlag = stepLetterOne === null;
  const stepLetterTwoFlag = stepLetterTwo === null;
  const stepLetterThreeFlag = stepLetterThree === null;
  const stepLetterOneError = stepLetterOneFlag && !stepLetterTwoFlag;
  const stepLetterTwoError = !stepLetterTwoFlag && stepLetterOne > stepLetterTwo;
  const stepLetterThreeError = stepLetterOneError || stepLetterTwoError;
  const stepLetterOneClearIconInactive = stepLetterOneFlag ||
    (!stepLetterOneFlag && !stepLetterTwoFlag);
  const submitDisabled = seasonError ||
    stepLetterOneError || stepLetterTwoError || stepLetterThreeError;


  const getStepLetterOneErrorText = () => {
    if (stepLetterOneError) {
      return 'You must delete Step Letter 2 or add back a Step Letter 1 date before saving.';
    }
    return null;
  };

  const stepLetterOneErrorText = getStepLetterOneErrorText();

  const updateStepLetterOne = (date) => {
    setStepLetterOne(date);
  };

  const updateStepLetterTwo = (date) => {
    setStepLetterTwo(date);
  };

  const updateStepLetterThree = (date) => {
    setStepLetterThree(date);
  };

  const clearStepLetterOneDate = () => {
    setStepLetterOne(null);
  };

  const clearStepLetterTwoDate = () => {
    setStepLetterTwo(null);
  };

  const clearStepLetterThreeDate = () => {
    setStepLetterThree(null);
  };

  const seasonOptions = [
    { value: 'Fall Cycle 2023', label: 'Fall Cycle 2023' },
    { value: 'Winter Cycle 2022', label: 'Winter Cycle 2022' },
    { value: 'Spring Cycle 2021', label: 'Spring Cycle 2021' },
    { value: 'Summer Cycle 2020', label: 'Summer Cycle 2020' },
    { value: 'None listed', label: 'None listed' },
  ];

  return (
    <div>
      <form className="available-bidder-form">
        <div>
          <label htmlFor="status">Description</label>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="255"
            name="description"
            placeholder="Type to filter seasons"
            defaultValue={id === '' ? '' : `${id} - ${seasonInfo.bid_seasons_name} - ${seasonInfo.bid_seasons_begin_date} - ${seasonInfo.bid_seasons_end_date}`}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="season">Season</label>
          {
            // for accessibility only
            seasonError &&
            <span className="usa-sr-only" id="season-error" role="alert">
              Required
            </span>
          }
          <span className="oc-validation-container">
            <select
              id="season"
              className={seasonError ? 'select-error' : ''}
              defaultValue={seasonInfo.bid_seasons_name}
              onChange={(e) => setSeason(e.target.value)}
              aria-describedby={seasonError ? 'season-error' : ''}
              value={season}
            >
              <option value="">{seasonInfo.bid_seasons_name}</option>
              {seasonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {!!seasonError && <span className="usa-input-error-message" role="alert">Season is required.</span>}
          </span>
        </div>
        {
          <>
            <div>
              <dt>Start Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <DatePicker
                  selected={stepLetterOne}
                  onChange={updateStepLetterOne}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo.bid_seasons_begin_date)}
                  className={stepLetterOneError ? 'select-error' : ''}
                />
                {!!stepLetterOneErrorText && <span className="usa-input-error-message" role="alert">{stepLetterOneErrorText}</span>}
              </span>
              {stepLetterOneClearIconInactive &&
              <div className="step-letter-clear-icon">
                <FA name="times-circle fa-lg inactive" />
              </div>
              }
              {!stepLetterOneFlag && stepLetterTwoFlag &&
              <div className="step-letter-clear-icon">
                <InteractiveElement
                  onClick={clearStepLetterOneDate}
                >
                  <FA name="times-circle fa-lg active" />
                </InteractiveElement>
              </div>
              }
            </div>
            <div>
              <dt>End Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <DatePicker
                  selected={stepLetterTwo}
                  onChange={updateStepLetterTwo}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo.bid_seasons_end_date)}
                  className={stepLetterTwoError ? 'select-error' : ''}
                  minDate={stepLetterOne}
                />
              </span>
              {stepLetterTwoFlag ?
                <div className="step-letter-clear-icon">
                  <FA name="times-circle fa-lg inactive" />
                </div>
                :
                <div className="step-letter-clear-icon">
                  <InteractiveElement
                    onClick={clearStepLetterTwoDate}
                  >
                    <FA name="times-circle fa-lg active" />
                  </InteractiveElement>
                </div>
              }
            </div>
            <div>
              <dt>Panel Cutoff Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <DatePicker
                  selected={stepLetterThree}
                  onChange={updateStepLetterThree}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo.bid_seasons_panel_cutoff)}
                  className={stepLetterThreeError ? 'select-error' : ''}
                  minDate={stepLetterThree}
                />
              </span>
              {stepLetterThreeFlag ?
                <div className="step-letter-clear-icon">
                  <FA name="times-circle fa-lg inactive" />
                </div>
                :
                <div className="step-letter-clear-icon">
                  <InteractiveElement
                    onClick={clearStepLetterThreeDate}
                  >
                    <FA name="times-circle fa-lg active" />
                  </InteractiveElement>
                </div>
              }
            </div>
            <div>
              <span className="date-picker-validation-container larger-date-picker">
                <CheckBox id="deto" label="Future Vacancy" value />
              </span>
            </div>
          </>
        }
        <button onClick={cancel}>Cancel</button>
        <button onClick={submit} type="submit" disabled={submitDisabled}>Save Bid Season</button>
      </form>
    </div>
  );
};

EditBidSeasons.PropTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  submitAction: PropTypes.func,
  details: PropTypes.shape({
    formattedCreated: PropTypes.string,
    stepLetterOne: PropTypes.string,
    stepLetterTwo: PropTypes.string,
  }),
  seasonInfo: PropTypes.shape({
    bid_seasons_name: PropTypes.string,
    bid_seasons_category: PropTypes.string,
    bid_seasons_begin_date: PropTypes.string,
    bid_seasons_panel_cutoff: PropTypes.string,
    bid_seasons_end_date: PropTypes.string,
    bid_seasons_future_vacancy: PropTypes.string,
    id: PropTypes.number,
  }),
};


EditBidSeasons.defaultProps = {
  id: '',
  name: '',
  submitAction: EMPTY_FUNCTION,
  details: {},
  seasonInfo: {},
};

export default EditBidSeasons;
