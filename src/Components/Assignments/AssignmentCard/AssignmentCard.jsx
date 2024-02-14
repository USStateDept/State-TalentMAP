import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import datefns from 'date-fns';
import { getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_STATUS, NO_TOUR_END_DATE, NO_VALUE,
} from 'Constants/SystemMessages';
import CheckBox from 'Components/CheckBox';
import TabbedCard from 'Components/TabbedCard';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import { altAssignmentDetailFetchData, updateAssignment } from 'actions/assignment';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';

const AssignmentCard = (props) => {
  const { perdet, data, isNew, setNewAsgSep } = props;
  const [editMode, setEditMode] = useState(isNew);

  const dispatch = useDispatch();

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const assignmentDetails = useSelector(state => state.altAssignmentDetail);
  const assignmentsDetailsErrored = useSelector(state => state.altAssignmentDetailHasErrored);
  const assignmentsDetailsLoading = useSelector(state => state.altAssignmentDetailIsLoading);

  useEffect(() => {
    const asgId = data?.ASG_SEQ_NUM;
    const revision_num = data?.ASGD_REVISION_NUM;
    dispatch(altAssignmentDetailFetchData(perdet, asgId, revision_num));
  }, []);

  // Break out ref data
  const statusOptions = assignmentDetails?.QRY_LSTASGS_REF;
  const actionOptions = assignmentDetails?.QRY_LSTLAT_REF;
  const todOptions = assignmentDetails?.QRY_LSTTOD_REF;
  const travelOptions = assignmentDetails?.QRY_LSTTF_REF;
  const fundingOptions = assignmentDetails?.QRY_LSTBUREAUS_REF;
  const waiverOptions = assignmentDetails?.QRY_LSTWRT_REF;

  // Asg Detail Data (Not to be confused with the Asg List)
  const asgDetail = assignmentDetails?.QRY_GETASGDTL_REF?.[0];

  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': getResult(data, 'POS_NUM_TXT') || NO_POSITION_NUMBER },
      { 'Position Title': getResult(data, 'POS_TITLE_TXT') || NO_POSITION_TITLE },
    ],
    bodyPrimary: [
      { 'Status': getResult(data, 'ASGS_CODE') || NO_STATUS },
      { 'Bureau': getResult(data, 'ORGS_SHORT_DESC') || NO_BUREAU },
      { 'Location': getResult(data, 'POS_LOCATION_CODE') || NO_POST },
      { 'ETA': getResult(data, 'ASGD_ETA_DATE') || NO_VALUE },
      { 'DIP': getResult(data, 'DIPLOMATIC_TITLE') || NO_POSITION_TITLE },
      { 'Memo Sent': getResult(data, 'MEMO_LAST_SENT_DATE') || NO_VALUE },
      { 'Note Sent': getResult(data, 'NOTE_LAST_SENT_DATE') || NO_VALUE },
      { 'TED': getResult(data, 'ASGD_ETD_TED_DATE') || NO_TOUR_END_DATE },
    ],
    bodySecondary: [
      { 'Grade': getResult(data, 'GRD_CD') || NO_GRADE },
      { 'Pay Plan': getResult(data, 'PPL_CODE') || NO_VALUE },
    ],
    /* eslint-enable quote-props */
  };


  // =============== Edit Mode ===============

  const formatMonthYear = (date) => {
    const splitDate = date?.split('/');
    if (splitDate?.length) {
      return new Date(splitDate[1], Number(splitDate[0]) - 1);
    }
    return new Date();
  };

  const [status, setStatus] = useState(asgDetail?.ASGS_CODE);
  const [action, setAction] = useState(asgDetail?.LAT_CODE);
  const [ted, setTED] = useState(formatMonthYear(asgDetail?.ASGD_ETD_TED_DATE));
  const [eta, setETA] = useState(formatMonthYear(asgDetail?.ASGD_ETA_DATE));
  const [tod, setTOD] = useState(asgDetail?.TOD_CODE);
  const [travel, setTravel] = useState(asgDetail?.TF_CD);
  const [funding, setFunding] = useState(asgDetail?.ASGD_ORG_CODE);
  const [adj, setAdj] = useState('');
  const [salaryReimbursement, setSalaryReimbursement] = useState(asgDetail?.ASGD_SALARY_REIMBURSE_IND === 'Y');
  const [travelReimbursement, setTravelReimbursement] = useState(asgDetail?.ASGD_TRAVEL_REIMBURSE_IND === 'Y');
  const [training, setTraining] = useState(asgDetail?.ASGD_TRIANING_IND === 'Y');
  const [criticalNeed, setCriticalNeed] = useState(asgDetail?.ASGD_CRITICAL_NEED_IND === 'Y');
  const [waiver, setWaiver] = useState(asgDetail?.WRT_CODE_RR_REPAY);
  const [sent, setSent] = useState(asgDetail?.NOTE_LAST_SENT_DATE);

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
    setNewAsgSep('default');
  };
  const onSubmitForm = () => {
    // createAssignment(data)
    dispatch(updateAssignment({
      asg_seq_num: asgDetail?.ASG_SEQ_NUM,
      asgd_revision_num: asgDetail?.ASGD_REVISION_NUM,
      eta: `${eta.getMonth() + 1}/${eta.getFullYear()}`,
      etd: `${ted.getMonth() + 1}/${ted.getFullYear()}`,
      tod,
      salary_reimburse_ind: salaryReimbursement,
      travel_reimburse_ind: travelReimbursement,
      training_ind: training,
      critical_need_ind: criticalNeed,
      org_code: funding,
      status_code: status,
      lat_code: action,
      travel_code: travel,
      rr_repay_ind: waiver,
      update_date: asgDetail?.ASGD_UPDATE_DATE,
    }, perdet));

    // TO-DO: refresh assignments and separations after?
    // setNewAsgSep('default');
  };

  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Position Number': getResult(data, 'POS_NUM_TXT') || NO_POSITION_NUMBER },
      { 'Position Title': getResult(data, 'POS_TITLE_TXT') || NO_POSITION_TITLE },
      { 'Bureau': getResult(data, 'ORGS_SHORT_DESC') || NO_BUREAU },
      { 'Location': getResult(data, 'POS_LOCATION_CODE') || NO_POST },
      { 'Grade': getResult(data, 'GRD_CD') || NO_GRADE },
      { 'Pay Plan': getResult(data, 'PPL_CODE') || NO_GRADE },
    ],
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
              {statusOptions?.map(s => (
                <option value={s.ASGS_CODE}>
                  {s.ASGS_DESC_TEXT}
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
              {actionOptions?.map(a => (
                <option value={a.LAT_CODE}>
                  {a.LAT_ABBR_DESC_TEXT}
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
                placeholderText={'MM/YYYY'}
                showMonthYearPicker
                dateFormat="MM/yyyy"
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
                showMonthYearPicker
                dateFormat="MM/yyyy"
                placeholderText={'MM/YYYY'}
                ref={datePickerRef}
              />
            </div>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-tod">Tour of Duty</label>
            <select
              id="assignment-tod"
              defaultValue={tod}
              onChange={(e) => setTOD(e?.target.value)}
            >
              {todOptions?.map(t => (
                <option value={t.TOD_CODE}>
                  {t.TOD_DESC_TEXT}
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
              {travelOptions?.map(t => (
                <option value={t.TF_CODE}>
                  {t.TF_SHORT_DESC_TEXT}
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
              {fundingOptions?.map(f => (
                <option value={f.ORG_CODE}>
                  {f.ORGS_SHORT_DESC}
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
          <div className="position-form--label-input-container height-100">
            <CheckBox
              id={`salary-reimbursement-${data.id ?? 'create'}`}
              label="Salary Reimbursement"
              value={salaryReimbursement}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setSalaryReimbursement(!salaryReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container height-100">
            <CheckBox
              id={`travel-reimbursement-${data.id ?? 'create'}`}
              label="Travel Reimbursement"
              value={travelReimbursement}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setTravelReimbursement(!travelReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container height-100">
            <CheckBox
              id={`training-${data.id ?? 'create'}`}
              label="Training"
              value={training}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setTraining(!training)}
            />
          </div>
          <div className="position-form--label-input-container height-100">
            <CheckBox
              id={`critical-need-${data.id ?? 'create'}`}
              label="Critical Need"
              value={criticalNeed}
              className="mt-40"
              excludeTmCheckboxClass
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
              {waiverOptions?.map(w => (
                <option value={w.WRT_CODE}>
                  {w.WRT_DESC}
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
    !assignmentsDetailsErrored && !assignmentsDetailsLoading &&
    <TabbedCard
      tabs={[{
        text: isNew ? 'New Assignment' : 'Assignment Overview',
        value: 'INFORMATION',
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

AssignmentCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  isNew: PropTypes.bool,
  cycle: PropTypes.shape({
    cycle_name: PropTypes.string,
  }).isRequired,
  setNewAsgSep: PropTypes.func,
  perdet: PropTypes.string,
};

AssignmentCard.defaultProps = {
  data: {},
  isNew: false,
  setNewAsgSep: EMPTY_FUNCTION,
  perdet: '',
};

export default AssignmentCard;
