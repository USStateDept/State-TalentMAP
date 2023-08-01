import { useState } from 'react';
import PropTypes from 'prop-types';
import { AB_EDIT_DETAILS_OBJECT, AB_EDIT_SECTIONS_OBJECT, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { forEach, get } from 'lodash';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import InteractiveElement from 'Components/InteractiveElement';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

// eslint-disable-next-line complexity
const EditBidSeasons = (props) => {
  const { sections, submitAction, details, seasonInfo, id } = props;
  const [status, setStatus] = useState(details.status);
  const [note, setNote] = useState(sections.notes);
  const [ocReason, setOCReason] = useState(details.ocReason);
  const stepLetterOneDate = !get(details, 'stepLetterOne') ? null : new Date(get(details, 'stepLetterOne'));
  const stepLetterTwoDate = !get(details, 'stepLetterTwo') ? null : new Date(get(details, 'stepLetterTwo'));
  const [stepLetterOne, setStepLetterOne] = useState(stepLetterOneDate);
  const [stepLetterTwo, setStepLetterTwo] = useState(stepLetterTwoDate);
  // To Do: Move these to the DB/Django backend after more user feedback

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      oc_reason: ocReason || '',
      status: status || '',
      // 'notes' on ui
      comments: note || '',
      step_letter_one: stepLetterOne,
      step_letter_two: stepLetterTwo,
    };
    setStatus('');
    // Remap unmodified local defaults from None Listed to empty string for patch
    forEach(userInputs, (v, k) => {
      if (v === 'None listed') userInputs[k] = '';
    });

    submitAction(userInputs);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const ocSelected = status === 'OC';
  const ocReasonError = ocSelected && !ocReason;
  const stepLetterOneFlag = stepLetterOne === null;
  const stepLetterTwoFlag = stepLetterTwo === null;
  const stepLetterOneError = stepLetterOneFlag && !stepLetterTwoFlag;
  const stepLetterTwoError = !stepLetterTwoFlag && stepLetterOne > stepLetterTwo;
  const stepLetterOneClearIconInactive = stepLetterOneFlag ||
    (!stepLetterOneFlag && !stepLetterTwoFlag);
  const submitDisabled = ocReasonError ||
    stepLetterOneError || stepLetterTwoError;


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

  const clearStepLetterOneDate = () => {
    setStepLetterOne(null);
  };

  const clearStepLetterTwoDate = () => {
    setStepLetterTwo(null);
  };

  return (
    <div>
      <form className="available-bidder-form">
        <div>
          <label htmlFor="status">Description</label>
          <TextareaAutosize
            /* make sure this matches height in _availableBidders.scss */
            maxRows={4}
            minRows={4}
            maxlength="255"
            name="note"
            placeholder="Type to filter seasons"
            defaultValue={id === '' ? '' : `${id} - ${seasonInfo.cycle_name} - ${seasonInfo.cycle_begin_date} - ${seasonInfo.cycle_end_date}`}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ocReason">Season</label>
          {
            // for accessibility only
            ocReasonError &&
            <span className="usa-sr-only" id="ocReason-error" role="alert">
              Required
            </span>
          }
          <span className="oc-validation-container">
            <select
              id="ocReason"
              className={ocReasonError ? 'select-error' : ''}
              defaultValue={seasonInfo.cycle_name}
              onChange={(e) => setOCReason(e.target.value)}
              aria-describedby={ocReasonError ? 'ocReason-error' : ''}
              value={ocReason}
            >
              <option value="">{seasonInfo.cycle_name}</option>
              <option value="">None listed</option>
            </select>
            {!!ocReasonError && <span className="usa-input-error-message" role="alert">OC Reason is required.</span>}
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
                  placeholderText={id === '' ? 'None listed' : seasonInfo.cycle_begin_date}
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
                  placeholderText={id === '' ? 'None listed' : seasonInfo.cycle_end_date}
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
                  selected={stepLetterOne}
                  onChange={updateStepLetterOne}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'None listed' : seasonInfo.cycle_end_date}
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

EditBidSeasons.propTypes = {
  sections: AB_EDIT_SECTIONS_OBJECT,
  submitAction: PropTypes.func,
  details: AB_EDIT_DETAILS_OBJECT,
};

EditBidSeasons.defaultProps = {
  sections: {},
  name: '',
  submitAction: EMPTY_FUNCTION,
  bureaus: [],
  details: {},
};

export default EditBidSeasons;
