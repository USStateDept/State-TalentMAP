import { useState } from 'react';
import PropTypes from 'prop-types';
import { AB_EDIT_DETAILS_OBJECT, AB_EDIT_SECTIONS_OBJECT, EMPTY_FUNCTION, FILTER } from 'Constants/PropTypes';
import { find, forEach, get, uniqBy } from 'lodash';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import InteractiveElement from 'Components/InteractiveElement';
import DatePicker from 'react-datepicker';

// eslint-disable-next-line complexity
const EditBidder = (props) => {
  const { name, sections, submitAction, bureaus, details } = props;
  const [status, setStatus] = useState(details.status);
  const [comment, setComment] = useState(sections.comments);
  const [ocReason, setOCReason] = useState(details.ocReason);
  const [ocBureau, setOCBureau] = useState(details.ocBureau);
  const [shared, setShared] = useState(details.shared);
  const { bidderBureau } = details;
  const languages = get(details, 'languages') || [];
  const stepLetterOneDate = get(details, 'stepLetterOne') === null ? null : new Date(get(details, 'stepLetterOne'));
  const stepLetterTwoDate = get(details, 'stepLetterTwo') === null ? null : new Date(get(details, 'stepLetterTwo'));
  const [stepLetterOne, setStepLetterOne] = useState(stepLetterOneDate);
  const [stepLetterTwo, setStepLetterTwo] = useState(stepLetterTwoDate);

  const bureauOptions = uniqBy(bureaus.data, 'code');

  // To Do: Move these to the DB/Django backend after more user feedback
  const reasons = [
    'Appealing/Grieving Selection Out',
    'CAT-4 (MED)',
    'CAT-4 (SEC)',
    'Compassionate Curtailment',
    'DS Investigation',
    'Involuntary Curtailment',
    'No-Fault Curtailment AIP',
    'Other - see additional comments',
    'Previous Assignment Ended',
    'Unresolved Medical',
  ];

  const submit = (e) => {
    e.preventDefault();
    const userInputs = {
      oc_bureau: ocBureau || '',
      oc_reason: ocReason || '',
      status,
      comments: comment || '',
      is_shared: shared,
      step_letter_one: stepLetterOne,
      step_letter_two: stepLetterTwo,
    };

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

  const setBureauFromUser = () => {
    if (find(bureauOptions, a => a.short_description === bidderBureau)) {
      setOCBureau(bidderBureau);
    }
  };

  const commonTooltipProps = {
    arrow: true,
    popperOptions: {
      modifiers: {
        addZIndex: {
          enabled: true,
          order: 810,
          fn: data => ({
            ...data,
            styles: {
              ...data.styles,
              zIndex: 10000,
            },
          }),
        },
      },
    },
  };

  const ocSelected = status === 'OC';
  const ocReasonError = ocSelected && !ocReason;
  const ocBureauError = ocSelected && !ocBureau;
  const stepLetterOneFlag = stepLetterOne === null;
  const stepLetterTwoFlag = stepLetterTwo === null;
  const stepLetterOneError = stepLetterOneFlag && !stepLetterTwoFlag;
  const stepLetterTwoError = ((!stepLetterTwoFlag) && ((stepLetterOne) > (stepLetterTwo)));
  const stepLetterOneClearIconInactive = ((stepLetterOneFlag) ||
    ((!stepLetterOneFlag) && (!stepLetterTwoFlag)));
  const submitDisabled = ocReasonError || ocBureauError ||
    stepLetterOneError || stepLetterTwoError;

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
        <div className="detail">
          <span>* Internal CDO field only, not shared with Bureaus</span>
        </div>
        <div>
          <dt>Client Name:</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <label htmlFor="status">*Status:</label>
          <select
            id="status"
            defaultValue={status}
            onChange={(e) => {
              setStatus(e.target.value);
              if (e.target.value !== 'OC') {
                setOCReason('');
                setOCBureau('');
                if (e.target.value !== 'UA') {
                  setShared(false);
                }
              } else {
                setBureauFromUser();
              }
            }}
          >
            <option value="">None listed</option>
            <option value="OC">OC: Overcomplement</option>
            <option value="UA">UA: Unassigned</option>
            <option value="IT">IT: In Transit</option>
            <option value="AWOL">AWOL: Absent without leave</option>
          </select>
        </div>
        <div>
          <label htmlFor="ocReason">*OC Reason:</label>
          {
            // for accessibility only
            ocReasonError &&
            <span className="usa-sr-only" id="ocReason-error" role="alert">
              Required
            </span>
          }
          <select
            id="ocReason"
            className={ocReasonError ? 'select-error' : ''}
            defaultValue={ocReason}
            onChange={(e) => setOCReason(e.target.value)}
            disabled={status !== 'OC'}
            aria-describedby={ocReasonError ? 'ocReason-error' : ''}
            value={ocReason}
          >
            <option value="">None listed</option>
            {
              (status === 'OC') &&
              reasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="ocBureau">*OC Bureau:</label>
          {
            // for accessibility only
            ocBureauError &&
            <span className="usa-sr-only" id="ocBureau-error" role="alert">
              Required
            </span>
          }
          <select
            id="ocBureau"
            className={ocBureauError ? 'select-error' : ''}
            defaultValue={ocBureau}
            onChange={(e) => setOCBureau(e.target.value)}
            disabled={status !== 'OC'}
            aria-describedby={ocReasonError ? 'ocBureau-error' : ''}
            value={ocBureau}
          >
            <option value="">None listed</option>
            {
              (status === 'OC') &&
                bureauOptions.map(o => (
                  <option key={o.id} value={o.short_description}>{o.custom_description}</option>
                ))
            }
          </select>
        </div>
        <div>
          <dt>*Step Letter 1:</dt>
          <DatePicker
            selected={stepLetterOne}
            onChange={updateStepLetterOne}
            dateFormat="MMMM d, yyyy"
            className={stepLetterOneError ? 'select-error' : ''}
          />
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
          <dt>*Step Letter 2:</dt>
          {stepLetterOneFlag ?
            <select
              id="stepLetterTwo"
              disabled={stepLetterOneFlag}
            >
              <option value="">None listed</option>
            </select>
            :
            <DatePicker
              selected={stepLetterTwo}
              onChange={updateStepLetterTwo}
              dateFormat="MMMM d, yyyy"
              className={stepLetterTwoError ? 'select-error' : ''}
              minDate={stepLetterOne}
            />
          }
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
          <dt>Skill:</dt>
          <dd>{sections.skill}</dd>
        </div>
        <div>
          <dt>Grade:</dt>
          <dd>{sections.grade}</dd>
        </div>
        <div>
          <dt>Languages:</dt>
          <dd>{languages.map((l, i) => (
            ` ${l.custom_description}${i + 1 === languages.length ? '' : ','}`
          ))}</dd>
        </div>
        <div>
          <dt>TED:</dt>
          <dd>{sections.ted}</dd>
        </div>
        <div>
          <dt>Current Post:</dt>
          <dd>{sections.current_post}</dd>
        </div>
        <div>
          <dt>CDO:</dt>
          <dd>{sections.cdo}</dd>
        </div>
        <div>
          <label htmlFor="comment">*Comment:</label>
          <input
            type="text"
            name="comment"
            placeholder="None listed"
            defaultValue={comment === 'None listed' ? '' : comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <dt>Created:</dt>
          <dd>{details.formattedCreated}</dd>
        </div>
        <div>
          <dt>Bureau Share:</dt>
          {
            status === 'OC' || status === 'UA' ?
              <Tooltip
                title={shared ? 'Unshare with Bureaus' : 'Share with Bureaus'}
                {...commonTooltipProps}
              >
                <InteractiveElement
                  onClick={() => setShared(!shared)}
                >
                  <dd className="ab-action-buttons"><FA name={shared ? 'building' : 'building-o'} className="fa-lg" /></dd>
                </InteractiveElement>
              </Tooltip>
              :
              <Tooltip
                title={'Status must be UA or OC to share with bureau'}
                {...commonTooltipProps}
              >
                <dd className="ab-action-buttons"><FA name="lock" className="fa-lg" /></dd>
              </Tooltip>
          }
        </div>
        <button onClick={submit} type="submit" disabled={submitDisabled}>Submit</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditBidder.propTypes = {
  sections: AB_EDIT_SECTIONS_OBJECT,
  name: PropTypes.string,
  submitAction: PropTypes.func,
  bureaus: FILTER,
  details: AB_EDIT_DETAILS_OBJECT,
};

EditBidder.defaultProps = {
  sections: {},
  name: '',
  submitAction: EMPTY_FUNCTION,
  bureaus: [],
  details: {},
};

export default EditBidder;
