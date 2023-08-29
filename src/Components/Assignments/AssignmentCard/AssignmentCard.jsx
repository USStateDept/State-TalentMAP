import { useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getDifferentials, getPostName, getResult } from 'utilities';
// import { createAssignmentSeparation, editAssignment } from 'actions/assignmentMaintenance';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_SKILL, NO_STATUS, NO_TOUR_END_DATE, NO_TOUR_OF_DUTY,
} from 'Constants/SystemMessages';
import CheckBox from 'Components/CheckBox';
import { checkFlag } from 'flags';
import TabbedCard from 'Components/TabbedCard';
import LanguageList from 'Components/LanguageList';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';

const useDeto = () => checkFlag('flags.deto');

const AssignmentCard = (props) => {
  const { data, refFilters, isNew, setNewAsgSep } = props;
  const [editMode, setEditMode] = useState(isNew);

  // const dispatch = useDispatch();
  const pos = data?.position || data;
  const altPos = data?.pos;

  const showDeto = useDeto();

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };


  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: {
      'Position Number': getResult(pos, 'position_number', NO_POSITION_NUMBER),
      'Position Title': getResult(pos, 'title') || NO_POSITION_TITLE,
    },
    bodyPrimary: {
      'Status': getResult(data, 'status') || NO_STATUS,
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Org/Code': getResult(altPos, 'posorgshortdesc') || NO_ORG,
      'Location': getPostName(pos?.post) || NO_POST,
      'ETA': getResult(data, 'start_date') || NO_TOUR_END_DATE,
      'TED': getResult(data, 'end_date') || NO_TOUR_END_DATE,
    },
    bodySecondary: {
      'Tour of Duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
      'Skill': getResult(pos, 'skill') || NO_SKILL,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Pay Plan': '---',
      'Post Differential | Danger Pay': getDifferentials(pos),
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
      '': <CheckBox id="deto" label="DETO" value disabled />,
    },
    metadata: {},
    /* eslint-enable quote-props */
  };

  if (!showDeto) {
    delete sections.bodySecondary[''];
  }

  // =============== Edit Mode ===============
  const { statusOptions, actionOptions, todOptions, travelOptions,
    fundingOptions, waiverOptions } = refFilters;
  const [status, setStatus] = useState(statusOptions[0]);
  const [action, setAction] = useState(actionOptions[0]);
  const [ted, setTED] = useState();
  const [eta, setETA] = useState();
  const [tod, setTOD] = useState(todOptions[0]);
  const [travel, setTravel] = useState(travelOptions[0]);
  const [funding, setFunding] = useState(fundingOptions[0]);
  const [adj, setAdj] = useState('');
  const [salaryReimbursement, setSalaryReimbursement] = useState(false);
  const [travelReimbursement, setTravelReimbursement] = useState(false);
  const [training, setTraining] = useState(false);
  const [criticalNeed, setCriticalNeed] = useState(false);
  const [waiver, setWaiver] = useState(waiverOptions[0]);
  const [sent, setSent] = useState('');

  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    setStatus(null);
    setAction(null);
    setTED(null);
    setETA(null);
    setTOD(null);
    setTravel(null);
    setFunding(null);
    setAdj('');
    setSalaryReimbursement(false);
    setTravelReimbursement(false);
    setTraining(false);
    setCriticalNeed(false);
    setWaiver(waiverOptions[0]);
    setSent('');
    setNewAsgSep(false);
  };
  const onSubmitForm = () => {
    // createAssignmentSeparation(data)
    // editAssignment(data)
    // TO-DO: refresh assignments and separations after?
    setNewAsgSep(false);
  };

  const form = {
    /* eslint-disable quote-props */
    staticBody: {
      'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
      'Org/Code': getResult(pos, 'bureau_code') || NO_ORG,
      'Location': getPostName(pos?.post) || NO_POST,
      // '': <CheckBox id="deto" label="DETO" value disabled />,
      'Skill': getResult(pos, 'skill') || NO_SKILL,
      'Grade': getResult(pos, 'grade') || NO_GRADE,
      'Pay Plan': '---',
      'Post Differential | Danger Pay': getDifferentials(pos),
      'Language': <LanguageList languages={getResult(pos, 'languages', [])} propToUse="representation" />,
    },
    inputBody:
      <div className="position-form">
        <div className="position-form--inputs">
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-statuses">Status</label>
            <select
              id="assignment-statuses"
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
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-actions">Action</label>
            <select
              id="assignment-actions"
              defaultValue={action}
              onChange={(e) => setAction(e?.target.value)}
            >
              {actionOptions.map(a => (
                <option value={a.code}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="ETA">ETA</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${eta ? '' : 'hide'}`} onClick={() => setETA(null)} />
              <DatePicker
                selected={eta}
                onChange={setETA}
                dateFormat="MM/dd/yyyy"
                placeholderText={'MM/DD/YYY'}
                ref={datePickerRef}
              />
            </div>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="TED">TED</label>
            <div className="date-wrapper-react larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <FA name="times" className={`${ted ? '' : 'hide'}`} onClick={() => setTED(null)} />
              <DatePicker
                selected={ted}
                onChange={setTED}
                dateFormat="MM/dd/yyyy"
                placeholderText={'MM/DD/YYY'}
                ref={datePickerRef}
              />
            </div>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-tod">TOD</label>
            <select
              id="assignment-tod"
              defaultValue={tod}
              onChange={(e) => setTOD(e?.target.value)}
            >
              {todOptions.map(t => (
                <option value={t.code}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-travel">Travel</label>
            <select
              id="assignment-travel"
              defaultValue={travel}
              onChange={(e) => setTravel(e?.target.value)}
            >
              {travelOptions.map(t => (
                <option value={t.code}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-funding">Alt Funding</label>
            <select
              id="assignment-funding"
              defaultValue={funding}
              onChange={(e) => setFunding(e?.target.value)}
            >
              {fundingOptions.map(f => (
                <option value={f.code}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="position-form--label-input-container">
            <label htmlFor="assignment-adj">Adj</label>
            <input
              id="assignment-adj"
              defaultValue={adj}
              onChange={(e) => setAdj(e?.target.value)}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              id={`salary-reimbursement-${data.id ?? 'create'}`}
              label="Salary Reimbursement"
              value={salaryReimbursement}
              onChange={() => setSalaryReimbursement(!salaryReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              id={`travel-reimbursement-${data.id ?? 'create'}`}
              label="Travel Reimbursement"
              value={travelReimbursement}
              onChange={() => setTravelReimbursement(!travelReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              id={`training-${data.id ?? 'create'}`}
              label="Training"
              value={training}
              onChange={() => setTraining(!training)}
            />
          </div>
          <div className="position-form--label-input-container">
            <CheckBox
              id={`critical-need-${data.id ?? 'create'}`}
              label="Critical Need"
              value={criticalNeed}
              onChange={() => setCriticalNeed(!criticalNeed)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-waiver">Waiver</label>
            <select
              id="assignment-waiver"
              defaultValue={waiver}
              onChange={(e) => setWaiver(e?.target.value)}
            >
              {waiverOptions.map(w => (
                <option value={w.code}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-sent">Sent</label>
            <input
              id="assignment-sent"
              defaultValue={sent}
              onChange={(e) => setSent(e?.target.value)}
            />
          </div>
        </div>
      </div>,
    cancelText: 'Are you sure you want to discard all changes made to this Assignment?',
    handleSubmit: () => onSubmitForm(),
    handleCancel: () => onCancelForm(),
    handleEdit: {
      editMode,
      setEditMode: isNew ? null : setEditMode,
    },
    // TO-DO: DIP, MEMO, NOTE
    /* eslint-enable quote-props */
  };

  if (isNew) {
    delete form.staticBody;
    delete sections.subheading;
  }

  return (
    <TabbedCard
      tabs={[{
        text: isNew ? 'New Assignment/Separation' : 'Assignment Overview',
        value: 'INFORMATION',
        content: <PositionExpandableContent sections={sections} form={form} />,
      }]}
    />
  );
};

AssignmentCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  isNew: PropTypes.bool,
  cycle: PropTypes.shape({
    cycle_name: PropTypes.string,
  }).isRequired,
  refFilters: PropTypes.shape({
    statusOptions: PropTypes.shape([]),
    actionOptions: PropTypes.shape([]),
    todOptions: PropTypes.shape([]),
    travelOptions: PropTypes.shape([]),
    fundingOptions: PropTypes.shape([]),
    waiverOptions: PropTypes.shape([]),
  }).isRequired,
  setNewAsgSep: PropTypes.func,
};

AssignmentCard.defaultProps = {
  data: {},
  isNew: false,
  setNewAsgSep: EMPTY_FUNCTION,
};

export default AssignmentCard;
