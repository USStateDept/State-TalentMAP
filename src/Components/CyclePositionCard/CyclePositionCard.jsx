import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getDifferentials, getPostName, getResult } from 'utilities';
import { cyclePositionEdit, cyclePositionRemove } from 'actions/cycleManagement';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_DATE, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_STATUS, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import LanguageList from 'Components/LanguageList';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import swal from '@sweetalert/with-react';
import { NO_TOUR_END_DATE } from '../../Constants/SystemMessages';


const CyclePositionCard = ({ data, cycle }) => {
  const dispatch = useDispatch();
  const pos = data?.position || data;

  const description$ = pos?.description?.content || 'No description.';
  const updateUser = getResult(pos, 'description.last_editing_user');
  const updateDate = getResult(pos, 'description.date_updated');

  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: {
      'Position Number': getResult(pos, 'position_number', NO_POSITION_NUMBER),
      'Skill': getResult(pos, 'skill_code') || NO_SKILL,
      'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE,
    },
    bodyPrimary: {
      'Location': getPostName(pos?.post) || NO_POST,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Status': getResult(pos, 'status') || NO_STATUS,
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
    },
    bodySecondary: {
      '': <CheckBox id="deto" label="DETO" value disabled />,
      'Bid Cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
      'Cycle Position': '---',
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Incumbent TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Incumbent Status': getResult(pos, 'current_assignment.user') || NO_USER_LISTED,
      'Pay Plan': '---',
      'TED': getResult(data, 'ted') || NO_TOUR_END_DATE,
      'Post Differential | Danger Pay': getDifferentials(pos),
      'Assignee TED': getResult(data, 'ted') || NO_DATE,
    },
    textarea: description$,
    metadata: {
      'Last Updated': (updateDate && updateUser) ? `${updateUser} ${updateDate}` : (updateDate || NO_UPDATE_DATE),
    },
    /* eslint-enable quote-props */
  };


  // =============== Edit Mode ===============

  const removePosition = () => {
    if (!getResult(data, 'ted')) { // adjust with real data
      swal({
        title: 'Confirm Removal',
        button: false,
        closeOnEsc: true,
        content: (
          <div className="simple-action-modal">
            <div className="help-text">
              <span>
                Are you sure you want to remove this position from this cycle?
                This action cannot be undone.
              </span>
            </div>
            <div className="modal-controls">
              <button onClick={() => {
                dispatch(cyclePositionRemove(data));
                swal.close();
              }}
              >Yes</button>
              <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
            </div>
          </div>
        ),
      });
    } else dispatch(cyclePositionRemove(data));
  };

  const statusOptions = [
    { code: 1, name: 'Vet' },
    { code: 2, name: 'Publishable' },
    { code: 3, name: 'Non-Publishable' },
  ];
  const [status, setStatus] = useState(statusOptions[0]);

  // Hardcoded - find where to get this data
  const fakeIncumbents = [
    { code: 'JB', name: 'Barber, John' },
    { code: 'MM', name: 'Mulberry, Morris' },
    { code: 'DR', name: 'Riggs, Diamond' },
  ];
  const [incumbent, setIncumbent] = useState(fakeIncumbents[0]);

  const form = {
    /* eslint-disable quote-props */
    staticBody: {
      'Location': getPostName(pos?.post) || NO_POST,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Status': getResult(pos, 'status') || NO_STATUS,
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
      '': <CheckBox id="deto" label="DETO" value disabled />,
      'Bid Cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
      'Cycle Position': '---',
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Pay Plan': '---',
      'Post Differential | Danger Pay': getDifferentials(pos),
      'Assignee TED': getResult(data, 'ted') || NO_DATE,
    },
    inputBody:
      <div className="position-form">
        <div className="left-row">
          <div className="position-form--input">
            <div className="cycle-card-dropdown">
              <label htmlFor="cycle-position-incumbent">Incumbent</label>
              <select
                id="cycle-position-incumbent"
                defaultValue={status}
                onChange={(e) => setIncumbent(e?.target.value)}
              >
                {fakeIncumbents.map(s => (
                  <option value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="position-form--input">
            <label htmlFor="cycle-position-statuses">Status</label>
            <select
              id="cycle-position-statuses"
              defaultValue={status}
              onChange={(e) => setStatus(e?.target.value)}
            >
              {statusOptions.map(s => (
                <option value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="cycle-card-remove">
          {cycle?.cycle_name}
          <div className="position-form--actions">
            <button onClick={removePosition}>Remove</button>
          </div>
        </div>
      </div>,
    handleSubmit: () => dispatch(cyclePositionEdit(data, incumbent, status)),
    /* eslint-enable quote-props */
  };


  return (
    <TabbedCard
      tabs={[{
        text: 'Position Information',
        value: 'INFORMATION',
        content: <PositionExpandableContent sections={sections} form={form} />,
      }]}
    />
  );
};

CyclePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  cycle: PropTypes.shape({
    cycle_name: PropTypes.string,
  }).isRequired,
};

export default CyclePositionCard;
