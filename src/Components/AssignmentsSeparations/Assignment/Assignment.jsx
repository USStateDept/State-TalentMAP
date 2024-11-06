import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { useDataLoader } from 'hooks';
import { getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  NO_BUREAU, NO_GRADE, NO_ORG, NO_POSITION_NUMBER, NO_POSITION_TITLE, NO_POST,
  NO_STATUS, NO_TOUR_END_DATE, NO_VALUE,
} from 'Constants/SystemMessages';
import { assignmentSeparationAction } from 'actions/assignment';
import { positionsFetchData, resetPositionsFetchData } from 'actions/positions';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import CheckBox from 'Components/CheckBox';
import MonthYearInput from 'Components/MonthYearInput';
import InteractiveElement from 'Components/InteractiveElement';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import api from '../../../api';
import { panelMeetingLink } from '../AssignmentsSeparations';

const Assignment = (props) => {
  const {
    perdet,
    data,
    isNew,
    toggleModal,
    setDisableOtherEdits,
    disableOtherEdits,
    employee,
  } = props;

  const dispatch = useDispatch();

  // ====================== Data Retrieval ======================

  const asgId = data?.ASG_SEQ_NUM;
  const revisionNum = data?.ASGD_REVISION_NUM;

  useEffect(() => {
    dispatch(resetPositionsFetchData());
  }, []);

  const [refetch, setRefetch] = useState(true);
  const ep = `/fsbid/assignment_history/${perdet}/assignments/${asgId}/?revision_num=${revisionNum}`;
  const { data: detailsData, loading: detailsLoading, error: detailsErrored } = useDataLoader(
    api().get,
    `${ep}${(asgId && revisionNum) ? '' : '&ignore_params=true'}`,
    true,
    undefined,
    refetch,
  );

  const details = detailsData?.data?.QRY_GETASGDTL_REF?.[0];
  const statusOptions = detailsData?.data?.QRY_LSTASGS_REF;
  const actionOptions = detailsData?.data?.QRY_LSTLAT_REF;
  const todOptions = detailsData?.data?.QRY_LSTTOD_REF;
  const travelOptions = detailsData?.data?.QRY_LSTTF_REF;
  const fundingOptions = detailsData?.data?.QRY_LSTBUREAUS_REF;
  const waiverOptions = detailsData?.data?.QRY_LSTWRT_REF;


  // ====================== View Mode ======================

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
      { 'ETA': get(data, 'ASGD_ETA_DATE') || NO_VALUE },
      { 'DIP': getResult(data, 'DIP_CODE') || NO_VALUE },
      { 'Memo Sent': getResult(data, 'MEMO_LAST_SENT_DATE') || NO_VALUE },
      { 'Note Sent': getResult(data, 'NOTE_LAST_SENT_DATE') || NO_VALUE },
      { 'TED': get(data, 'ASGD_ETD_TED_DATE') || NO_TOUR_END_DATE },
      { 'Grade': getResult(data, 'GRD_CD') || NO_GRADE },
      { 'Pay Plan': getResult(data, 'PPL_CODE') || NO_VALUE },
    ],
    /* eslint-enable quote-props */
  };

  // ====================== Edit Mode ======================

  const [editMode, setEditMode] = useState(isNew);
  const [inputClass, setInputClass] = useState('input-default');

  // ----- Position Number State Management -----

  // Position Number Search
  // For search pos results when creating new card
  const [selectedPositionNumber, setPositionNumber] = useState('');
  const pos_results = useSelector(state => state.positions);
  const pos_results_loading = useSelector(state => state.positionsIsLoading);
  const pos_results_errored = useSelector(state => state.positionsHasErrored);

  const getTOD = () => (
    pos_results?.todo_tod_code || pos_results?.bt_tod_code || ''
  );

  const addPositionNum = () => {
    if (selectedPositionNumber) {
      dispatch(positionsFetchData(`limit=50&page=1&position_num=${selectedPositionNumber}`));
    }
  };

  useEffect(() => {
    if (pos_results_loading) {
      setInputClass('loading-animation--3');
    } else if (pos_results_errored) {
      setInputClass('input-error');
    } else if (isEmpty(pos_results) && selectedPositionNumber.length) {
      setInputClass('input-error');
    } else {
      setInputClass('input-default');
    }
  }, [pos_results, pos_results_loading, pos_results_errored]);

  if (isNew) {
    /* eslint-disable quote-props */
    sections.subheading = [
      { 'Position Number': pos_results?.pos_num_text || NO_POSITION_NUMBER },
      { 'Position Title': pos_results?.pos_title_desc || NO_POSITION_TITLE },
      { 'Bureau': pos_results?.pos_bureau_short_desc || NO_BUREAU },
      { 'Location': pos_results?.pos_location_code || NO_POST },
      { 'Org': pos_results?.pos_org_short_desc || NO_ORG },
      { 'Grade': pos_results?.pos_grade_code || NO_GRADE },
      { 'Pay Plan': pos_results?.pos_pay_plan_code || NO_GRADE },
    ];
    /* eslint-enable quote-props */
  }

  const [status, setStatus] = useState('');
  const [action, setAction] = useState('');
  const [ted, setTED] = useState('');
  const [eta, setETA] = useState('');
  const [tod, setTOD] = useState('');
  const [travel, setTravel] = useState('');
  const [funding, setFunding] = useState('');
  const [adj, setAdj] = useState('');
  const [todOther, setTodOther] = useState('');
  const [todMonths, setTodMonths] = useState('');
  const [salaryReimbursement, setSalaryReimbursement] = useState(false);
  const [travelReimbursement, setTravelReimbursement] = useState(false);
  const [training, setTraining] = useState(false);
  const [criticalNeed, setCriticalNeed] = useState(false);
  const [waiver, setWaiver] = useState('');
  const [sent, setSent] = useState('');
  const [panelMeetingDate, setPanelMeetingDate] = useState(null);

  useEffect(() => {
    if (editMode) {
      setDisableOtherEdits(editMode);
      setStatus(details?.ASGS_CODE || 'EF'); // Default to "Effective"
      setAction(details?.LAT_CODE || '');
      setTED(details?.ASGD_ETD_TED_DATE || '');
      setETA(details?.ASGD_ETA_DATE || '');
      setTOD(isNew ? getTOD() : (details?.TOD_CODE || ''));
      setTravel(details?.TF_CD || '');
      setFunding(details?.ASGD_ORG_CODE || '');
      setAdj(details?.ASGD_ADJUST_MONTHS_NUM || '');
      setTodOther(details?.ASGD_TOD_OTHER_TEXT || '');
      setTodMonths(details?.ASGD_TOD_MONTHS_NUM || '');
      setSalaryReimbursement(details?.ASGD_SALARY_REIMBURSE_IND === 'Y');
      setTravelReimbursement(details?.ASGD_TRAVEL_REIMBURSE_IND === 'Y');
      setTraining(details?.ASGD_TRAINING_IND === 'Y');
      setCriticalNeed(details?.ASGD_CRITICAL_NEED_IND === 'Y');
      setWaiver(details?.WRT_CODE_RR_REPAY || 'N'); // Default to "Not Used"
      setSent(details?.NOTE_LAST_SENT_DATE || '');
      setPanelMeetingDate(details?.PMD_DTTM ?
        new Date(details?.PMD_DTTM) : null);
    }
  }, [editMode]);

  const onSubmitForm = () => {
    const commonFields = {
      tod_months_num: todMonths || null,
      tod_other_text: todOther || null,
      tod_adjust_months_num: adj || null,
      eta,
      etd: ted,
      tod,
      salary_reimburse_ind: salaryReimbursement ? 'Y' : 'N',
      travel_reimburse_ind: travelReimbursement ? 'Y' : 'N',
      training_ind: training ? 'Y' : 'N',
      org_code: funding,
      status_code: status,
      lat_code: action,
      travel_code: travel,
      rr_repay_ind: waiver,
    };
    if (isNew) {
      const onCreateSuccess = () => {
        toggleModal(false);
      };
      dispatch(assignmentSeparationAction(
        {
          ...commonFields,
          employee: perdet,
          position: pos_results.pos_seq_num,
        },
        perdet,
        null, // Use Create Endpoint (No Seq Num)
        false, // Use Assignment Endpoint
        onCreateSuccess,
      ));
    } else {
      const onUpdateSuccess = () => {
        setDisableOtherEdits(false);
        setRefetch(!refetch); // Refetch Details on Success
      };
      dispatch(assignmentSeparationAction(
        {
          ...commonFields,
          asg_id: asgId,
          revision_num: revisionNum,
          critical_need_ind: criticalNeed ? 'Y' : 'N',
          updated_date: details?.ASGD_UPDATE_DATE,
        },
        perdet,
        asgId, // Use Update Endpoint (Has Seq Num)
        false, // Use Assignment Endpoint
        onUpdateSuccess,
      ));
    }
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
          {isNew &&
            <div className="position-form--label-input-container position-number-container">
              <label htmlFor="pos-num">Position Number</label>
              <input
                id="pos-num"
                name="add"
                className={inputClass}
                onChange={value => setPositionNumber(value.target.value)}
                onKeyPress={e => (e.key === 'Enter' ? addPositionNum() : null)}
                type="add"
                value={selectedPositionNumber}
                placeholder="Add by Position Number"
              />
              <InteractiveElement
                className="add-pos-num-icon"
                onClick={addPositionNum}
                role="button"
                title="Add position"
                type="span"
              >
                <FA name="plus" />
              </InteractiveElement>
            </div>
          }
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-statuses">Status</label>
            <select
              id="assignment-statuses"
              value={status}
              onChange={(e) => setStatus(e?.target.value)}
            >
              <option value="" disabled>
                Select Status
              </option>
              {statusOptions?.map(s => (
                <option key={s.ASGS_CODE} value={s.ASGS_CODE}>
                  {s.ASGS_DESC_TEXT}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-actions">Action</label>
            <select
              id="assignment-actions"
              value={action}
              onChange={(e) => setAction(e?.target.value)}
            >
              <option value="" disabled>
                Select Action
              </option>
              {actionOptions?.map(a => (
                <option key={a.LAT_CODE} value={a.LAT_CODE}>
                  {a.LAT_ABBR_DESC_TEXT}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="ETA">ETA</label>
            <MonthYearInput value={eta} onChange={setETA} />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="TED">TED</label>
            <MonthYearInput value={ted} onChange={setTED} />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-tod">Tour of Duty</label>
            <select
              id="assignment-tod"
              value={tod}
              onChange={(e) => setTOD(e?.target.value)}
            >
              <option value="" disabled>
                Select TOD
              </option>
              {todOptions?.map(t => (
                <option key={t.TOD_CODE} value={t.TOD_CODE}>
                  {t.TOD_DESC_TEXT}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-adj">ADJ</label>
            <input
              id="assignment-adj"
              value={adj}
              onChange={(e) => setAdj(e?.target.value)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-travel">Travel</label>
            <select
              id="assignment-travel"
              value={travel}
              onChange={(e) => setTravel(e?.target.value)}
            >
              <option value="" disabled>
                Select Travel
              </option>
              {travelOptions?.map(t => (
                <option key={t.TF_CODE} value={t.TF_CODE}>
                  {t.TF_SHORT_DESC_TEXT}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-funding">Alt Funding</label>
            <select
              id="assignment-funding"
              value={funding}
              onChange={(e) => setFunding(e?.target.value)}
            >
              <option value="" disabled>
                Select Funding Org
              </option>
              {fundingOptions?.map(f => (
                <option key={f.ORG_CODE} value={f.ORG_CODE}>
                  {f.ORGS_SHORT_DESC}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="tod-other">TOD Other</label>
            <input
              id="tod-other"
              value={todOther}
              onChange={(e) => setTodOther(e?.target.value)}
              disabled
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="tod-months">TOD Months</label>
            <input
              id="tod-months"
              value={todMonths}
              onChange={(e) => setTodMonths(e?.target.value)}
              disabled
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="panel-meeting-date">Panel Meeting Date</label>
            {panelMeetingLink(details?.PMI_SEQ_NUM, panelMeetingDate, true)}
          </div>
          <div className="position-form--label-input-container height-80">
            <CheckBox
              id={`salary-reimbursement-${data.id ?? 'create'}`}
              label="Salary Reimbursement"
              value={salaryReimbursement}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setSalaryReimbursement(!salaryReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container height-80">
            <CheckBox
              id={`travel-reimbursement-${data.id ?? 'create'}`}
              label="Travel Reimbursement"
              value={travelReimbursement}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setTravelReimbursement(!travelReimbursement)}
            />
          </div>
          <div className="position-form--label-input-container height-80">
            <CheckBox
              id={`training-${data.id ?? 'create'}`}
              label="Training"
              value={training}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setTraining(!training)}
            />
          </div>
          <div className="position-form--label-input-container height-80">
            <CheckBox
              id={`critical-need-${data.id ?? 'create'}`}
              label="Critical Need"
              value={details?.ASGD_CRITICAL_NEED_IND === 'Y' || false}
              className="mt-40"
              excludeTmCheckboxClass
              disabled={isNew}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-waiver">Waiver</label>
            <select
              id="assignment-waiver"
              value={waiver}
              onChange={(e) => setWaiver(e?.target.value)}
            >
              <option value="" disabled>
                Select Waiver
              </option>
              {waiverOptions?.map(w => (
                <option key={w.WRT_CODE} value={w.WRT_CODE}>
                  {w.WRT_DESC}
                </option>
              ))}
            </select>
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="assignment-sent">Sent</label>
            <input
              id="assignment-sent"
              value={sent}
              onChange={(e) => setSent(e?.target.value)}
              disabled
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="diplomatic-title">Diplomatic Title</label>
            <input
              id="diplomatic-title"
              value={data?.DIPLOMATIC_TITLE || NO_VALUE}
              disabled
            />
          </div>
        </div>
      </div>,
    cancelText: 'Are you sure you want to discard all changes made to this Assignment?',
    handleSubmit: onSubmitForm,
    handleCancel: () => { toggleModal(false); setDisableOtherEdits(false); },
    handleEdit: {
      editMode,
      setEditMode: isNew ? null : setEditMode,
      disableEdit: disableOtherEdits,
    },
    // TO-DO: DIP, MEMO, NOTE
    /* eslint-enable quote-props */
  };

  const getOverlay = () => {
    if (detailsLoading) {
      if (isNew) {
        return <Spinner type="standard-center" size="small" />;
      }
    } else if (detailsLoading) {
      return (
        <div className="loading-animation--5">
          <div className="loading-message pbl-20">
            Loading additional data
          </div>
        </div>
      );
    } else if (detailsErrored) {
      return <Alert type="error" title="Error loading data" messages={[{ body: 'Please try again.' }]} />;
    }
    return false;
  };

  return (
    <div className={`position-content--container min-height-${isNew ? '150' : '50'}`}>
      {employee}
      {getOverlay() ||
        <PositionExpandableContent
          sections={sections}
          form={form}
          saveText={isNew ? 'Create Assignment' : 'Save Assignment'}
        />
      }
    </div>
  );
};

Assignment.propTypes = {
  data: POSITION_DETAILS.isRequired,
  isNew: PropTypes.bool,
  // cycle: PropTypes.shape({
  //   cycle_name: PropTypes.string,
  // }).isRequired,
  toggleModal: PropTypes.func,
  perdet: PropTypes.string,
  setDisableOtherEdits: PropTypes.func,
  disableOtherEdits: PropTypes.bool,
  employee: PropTypes.shape(),
};

Assignment.defaultProps = {
  data: {},
  isNew: false,
  toggleModal: EMPTY_FUNCTION,
  perdet: '',
  setDisableOtherEdits: EMPTY_FUNCTION,
  disableOtherEdits: false,
  employee: undefined,
};

export default Assignment;
