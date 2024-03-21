import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getResult } from 'utilities';
import { cyclePositionEdit, cyclePositionRemove } from 'actions/cycleManagement';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE,
  NO_SKILL, NO_STATUS,
} from 'Constants/SystemMessages';
import TabbedCard from 'Components/TabbedCard';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import swal from '@sweetalert/with-react';
import { NO_TOUR_END_DATE } from '../../Constants/SystemMessages';


const CyclePositionCard = ({ data, cycle, onEditModeSearch }) => {
  const dispatch = useDispatch();
  const description$ = data?.description?.content || 'No description.';
  const postedDate = data?.posted_date_formatted || '--/--/----';
  const skillWithDesc = (data?.skill_code && data?.skill_desc) ? `${data?.skill_desc} (${data?.skill_code})` : false;
  const orgWithCode = (data?.org_code && data?.org_desc) ? `${data?.org_desc} (${data?.org_code})` : false;


  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': data?.position_number || NO_POSITION_NUMBER },
      { 'Skill': skillWithDesc || data?.skill_code || data?.skill_desc || NO_SKILL },
      { 'Position Title': data?.title || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Org/Code': orgWithCode || data?.org_code || data?.org_desc || NO_ORG },
      { 'Grade': data?.grade || NO_GRADE },
      { 'Status': data?.status || NO_STATUS },
      { 'Language': data?.languages || 'None Listed' },
    ],
    bodySecondary: [
      { 'Bid Cycle': data?.bid_cycle || 'None Listed' },
      { 'Job Category': data?.job_category || 'None Listed' },
      { 'Pay Plan': data?.pay_plan || 'None Listed' },
      { 'Incumbent': data?.incumbent_name || 'None Listed' },
      { 'TED': getResult(data, 'ted', NO_TOUR_END_DATE) },
    ],
    textarea: description$,
    metadata: [
      { 'Date Posted': postedDate },
    ],
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
    { code: 'CURR', name: 'Holden, James' },
    { code: 'TBD', name: 'TBD' },
    { code: 'VAC', name: 'Vacant' },
    { code: 'NEW', name: 'New' },
  ];
  const [incumbent, setIncumbent] = useState(fakeIncumbents[0]);

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    onEditModeSearch(editMode, data?.id);
  }, [editMode]);

  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Org/Code': orgWithCode || data?.org_code || data?.org_desc || NO_ORG },
      { 'Grade': data?.grade || NO_GRADE },
      { 'Status': data?.status || NO_STATUS },
      { 'Language': data?.languages || 'None Listed' },
      { 'Bid Cycle': data?.bid_cycle || 'None Listed' },
      { 'Pay Plan': data?.pay_plan || 'None Listed' },
    ],
    inputBody:
      <div className="position-form">
        <div className="left-row">
          <div className="position-form--input">
            <label htmlFor="cycle-position-incumbent">Incumbent</label>
            <select
              id="cycle-position-incumbent"
              defaultValue={incumbent}
              onChange={(e) => setIncumbent(e?.target.value)}
            >
              {fakeIncumbents.map(s => (
                <option value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
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
    handleCancel: () => { },
    handleEdit: {
      editMode,
      setEditMode,
    },
    /* eslint-enable quote-props */
  };

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Information',
        value: 'INFORMATION',
        content: <PositionExpandableContent
          sections={sections}
          form={form}
        />,
      }]}
    />
  );
};

CyclePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  cycle: PropTypes.shape({
    cycle_name: PropTypes.string,
  }).isRequired,
  onEditModeSearch: PropTypes.func,
};

CyclePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
};

export default CyclePositionCard;
