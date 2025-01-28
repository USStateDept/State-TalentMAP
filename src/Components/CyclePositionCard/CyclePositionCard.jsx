import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import { formatDate, getResult } from 'utilities';
import Spinner from 'Components/Spinner';
import Alert from 'Components/Alert';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import {
  DEFAULT_TEXT, NO_POSITION_NUMBER } from 'Constants/SystemMessages';
import TabbedCard from 'Components/TabbedCard';
import CycleBiddersContent from 'Components/CycleBiddersContent';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import swal from '@sweetalert/with-react';
import { cyclePositionEdit } from 'actions/cycleManagement';

const CyclePositionCard = ({ data, onEditModeSearch, isOpen, editableInfo, editableInfoLoading, editableInfoError }) => {
  const dispatch = useDispatch();
  const datePickerRef = useRef(null);

  const postedDate = data?.posted_date_formatted || '--/--/----';
  const skillWithDesc = (data?.skill_code && data?.skill_desc) ? `${data?.skill_desc} (${data?.skill_code})` : false;
  const orgWithCode = (data?.org_code && data?.org_desc) ? `${data?.org_desc} (${data?.org_code})` : false;

  // =============== View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': data?.position_number || NO_POSITION_NUMBER },
      { 'Skill': skillWithDesc || data?.skill_code || data?.skill_desc || DEFAULT_TEXT },
      { 'Position Title': data?.title || DEFAULT_TEXT },
    ],
    bodyPrimary: [
      { 'Org/Code': orgWithCode || data?.org_code || data?.org_desc || DEFAULT_TEXT },
      { 'PP/Grade': `${data?.pay_plan || DEFAULT_TEXT}/${data?.grade || DEFAULT_TEXT}` },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Language': data?.languages || DEFAULT_TEXT },
      { 'Bid Cycle': data?.bid_cycle || DEFAULT_TEXT },
      { 'Job Category': data?.job_category || DEFAULT_TEXT },
      { 'Incumbent': data?.incumbent_name || DEFAULT_TEXT },
      { 'TED': getResult(data, 'ted', DEFAULT_TEXT) },
    ],
    metadata: [
      { 'Date Posted': postedDate },
    ],
    /* eslint-enable quote-props */
  };


  // =============== Edit Mode ===============

  const {
    cycle_position_status,
    position_remark_text,
    now_ted_flag,
    incumbent_code,
    ted_override_date,
    critical_need_indicator,
    cycle_status_reference,
    incumbent_code_reference,
    cycle_position_id,
    last_updated,
    last_updated_id,
  } = editableInfo;

  const statusOptions = cycle_status_reference || [{ code: '', name: '' }];
  const incumbentOptions = incumbent_code_reference || [{ code: '', name: '' }];

  const [cycleStatus, setCycleStatus] = useState(cycle_position_status);
  const [remarkText, setRemarkText] = useState(position_remark_text);
  const [nowTedFlag, setNowTedFlag] = useState(now_ted_flag);
  const [incumbentVacancyCode, setIncumbentVacancyCode] = useState(incumbent_code);
  const [tedOverrideDate, setTedOverrideDate] = useState(ted_override_date);
  const [critNeedFlag, setCritNeedFlag] = useState(critical_need_indicator);


  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    onEditModeSearch(editMode, data?.id);
  }, [editMode]);

  useEffect(() => {
    setEditMode(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setCycleStatus(cycle_position_status);
    setRemarkText(position_remark_text);
    setNowTedFlag(now_ted_flag);
    setIncumbentVacancyCode(incumbent_code);
    setTedOverrideDate(ted_override_date);
    setCritNeedFlag(critical_need_indicator);
  }, [editableInfoLoading]);

  const submitPositionUpdate = () => {
    dispatch(cyclePositionEdit({
      cycleStatus,
      remarkText,
      nowTedFlag,
      incumbentVacancyCode,
      tedOverrideDate: tedOverrideDate ? formatDate(tedOverrideDate, 'MM/YYYY') : tedOverrideDate,
      critNeedFlag,
      cycle_position_id,
      last_updated,
      last_updated_id,
    }));
  };


  const getOverlay = () => {
    let overlay;
    if (editableInfoLoading) {
      overlay = <Spinner type="small" size="small" />;
    } else if (editableInfoError) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  const checkIncumbent = () => {
    const incumbentNameIsOption = incumbentOptions.find(x => {
      if (x.name === data?.incumbent_name) return x.code;
      return null;
    });
    if (!incumbentNameIsOption) return '';
    return incumbentNameIsOption.code;
  };


  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Org/Code': orgWithCode || data?.org_code || data?.org_desc || DEFAULT_TEXT },
      { 'PP/Grade': `${data?.pay_plan || DEFAULT_TEXT}/${data?.grade || DEFAULT_TEXT}` },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Language': data?.languages || DEFAULT_TEXT },
      { 'Bid Cycle': data?.bid_cycle || DEFAULT_TEXT },
      { 'Job Category': data?.job_category || DEFAULT_TEXT },
      { 'Incumbent': data?.incumbent_name || DEFAULT_TEXT },
      { 'TED': getResult(data, 'ted', DEFAULT_TEXT) },
    ],
    inputBody:
    getOverlay() ||
      <div className="position-form">
        <div className="pos-form-edit-row">

          <div className="position-form--input">
            <label htmlFor="cycle-position-statuses">Position Status</label>
            <select
              id="cycle-position-statuses"
              value={cycleStatus}
              onChange={(e) => setCycleStatus(e?.target.value)}
            >
              {statusOptions.map(s => (
                <option value={s.code} key={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="position-form--input">
            <label htmlFor="cycle-position-statuses">Remarks</label>
            <input
              type="text"
              maxLength="100"
              value={remarkText}
              name="remarks"
              autoComplete="off"
              className="bid-audit-modal-input"
              onChange={(e) => setRemarkText(e.target.value)}
            />
          </div>

          <div className="position-form--input">
            <label htmlFor="ted-now">Now</label>
            <select
              id="ted-now"
              value={nowTedFlag}
              onChange={(e) => setNowTedFlag(e?.target.value)}
            >
              <option value={'Y'}>Y</option>
              <option value={'N'}>N</option>
            </select>
          </div>

          <div className="position-form--input">
            <label htmlFor="cycle-position-incumbent">Incumbent</label>
            <select
              id="cycle-position-incumbent"
              value={checkIncumbent()}
              onChange={(e) => setIncumbentVacancyCode(e?.target.value)}
            >
              <option value="">No Change</option>
              {incumbentOptions.map(s => (
                <option value={s.code} key={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="position-form--inputs">
            <div className="position-form--label-input-container">
              <label htmlFor="status">TED</label>
              <div className="date-wrapper-react larger-date-picker">
                <FA name="fa fa-calendar" onClick={() => datePickerRef.current.setOpen(true)} />
                <FA name="times" className={`${tedOverrideDate ? '' : 'hide'}`} onClick={() => setTedOverrideDate(null)} />
                <DatePicker
                  selected={tedOverrideDate && new Date(tedOverrideDate)}
                  onChange={(e) => setTedOverrideDate(formatDate(e))}
                  dateFormat="MM/yyyy"
                  placeholderText="MM/YYYY"
                  ref={datePickerRef}
                  showMonthYearPicker
                />
              </div>
            </div>
          </div>

          <div className="position-form--input">
            <label htmlFor="critical-need">Critical Need</label>
            <select
              id="critical-need"
              value={critNeedFlag}
              onChange={(e) => setCritNeedFlag(e?.target.value)}
            >
              <option value={'Y'}>Y</option>
              <option value={'N'}>N</option>
            </select>
          </div>

        </div>
      </div>,
    handleSubmit: () => submitPositionUpdate(),
    handleCancel: () => swal.close(),
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
      }, {
        text: 'Cycle Bidders',
        value: 'BIDDERS',
        content: <CycleBiddersContent position={data} />,
      }]}
    />
  );
};

CyclePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onEditModeSearch: PropTypes.func,
  editableInfoLoading: PropTypes.bool,
  editableInfoError: PropTypes.bool,
  editableInfo: PropTypes.shape({
    cycle_position_status: PropTypes.string.isRequired,
    position_remark_text: PropTypes.string,
    now_ted_flag: PropTypes.string.isRequired,
    incumbent_code: PropTypes.string,
    ted_override_date: PropTypes.string,
    critical_need_indicator: PropTypes.string,
    cycle_status_reference: PropTypes.arrayOf(PropTypes.shape({})),
    incumbent_code_reference: PropTypes.arrayOf(PropTypes.shape({})),
    cycle_position_id: PropTypes.number.isRequired,
    last_updated: PropTypes.string,
    last_updated_id: PropTypes.number,
  }),
};

CyclePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
  editableInfoLoading: false,
  editableInfoError: false,
  editableInfo: {
    cycle_status_reference: [{ code: '', name: '' }],
    incumbent_code_reference: [{ code: '', name: '' }],
    cycle_position_id: null,
    cycle_position_status: '',
    ted_override_date: null,
    now_ted_flag: 'N',
  },
};

export default CyclePositionCard;
