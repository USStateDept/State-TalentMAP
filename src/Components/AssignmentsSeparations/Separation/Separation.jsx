import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useDataLoader } from 'hooks';
import { formatDate, getResult } from 'utilities';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import { NO_STATUS, NO_VALUE } from 'Constants/SystemMessages';
import { resetPositionsFetchData } from 'actions/positions';
import { assignmentSeparationAction } from 'actions/assignment';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import CheckBox from 'Components/CheckBox';
import TMDatePicker from 'Components/TMDatePicker';
import InteractiveElement from 'Components/InteractiveElement';
import PositionExpandableContent from 'Components/PositionExpandableContent';
import GsaLocations from 'Components/Agenda/AgendaItemResearchPane/GsaLocations';
import api from '../../../api';
import { panelMeetingLink } from '../AssignmentsSeparations';

const Separation = (props) => {
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

  const sepId = data?.SEP_SEQ_NUM;
  const revisionNum = data?.SEPD_REVISION_NUM;

  useEffect(() => {
    dispatch(resetPositionsFetchData());
  }, []);

  const [refetch, setRefetch] = useState(true);
  const ep = `/fsbid/assignment_history/${perdet}/separations/${sepId}/?revision_num=${revisionNum}`;
  const { data: detailsData, loading: detailsLoading, error: detailsErrored } = useDataLoader(
    api().get,
    `${ep}${(sepId && revisionNum) ? '' : '&ignore_params=true'}`,
    true,
    undefined,
    refetch,
  );

  const details = detailsData?.data?.QRY_GETSEPDTL_REF?.[0];
  const statusOptions = detailsData?.data?.QRY_LSTASGS_REF;
  const actionOptions = detailsData?.data?.QRY_LSTLAT_REF;
  const travelOptions = detailsData?.data?.QRY_LSTTF_REF;
  const waiverOptions = detailsData?.data?.QRY_LSTWRT_REF;

  // ====================== View Mode ======================

  const locationString = (location) => {
    let displayText;
    if (location) {
      const { city, country, code } = location;
      displayText = (city && country) ? `${city}, ${country}` : city || country || code || '';
    }
    return displayText;
  };

  const sections = {
    /* eslint-disable quote-props */
    bodyPrimary: [
      { 'Status': getResult(details, 'ASGS_CODE') || NO_STATUS },
      { 'Action': getResult(details, 'LAT_CODE') || NO_VALUE },
      { 'Waiver': getResult(details, 'WRT_CODE_RR_REPAY') || NO_VALUE },
      { 'Travel': get(details, 'TF_CD') || NO_VALUE },
      { 'Separation Date': getResult(details, 'SEPD_SEPARATION_DATE') || NO_VALUE },
      { 'US Indicator': <CheckBox value={details?.SEPD_US_IND === 'Y'} disabled /> },
      { 'Panel Meeting Date': panelMeetingLink(details?.PMI_SEQ_NUM, details?.PMD_DTTM) },
      {
        'Location': locationString({
          code: details?.DSC_CD,
          city: details?.SEPD_CITY_TEXT,
          country: details?.SEPD_COUNTRY_STATE_TEXT,
        }) || NO_VALUE,
      },
    ],
    /* eslint-enable quote-props */
  };

  if (!isNew) {
    /* eslint-disable quote-props */
    sections.subheading = [
      { 'Name': details?.EMP_FULL_NAME || NO_VALUE },
    ];
    /* eslint-enable quote-props */
  }

  // ====================== Edit Mode ======================

  const [editMode, setEditMode] = useState(isNew);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  const [status, setStatus] = useState('');
  const [action, setAction] = useState('');
  const [waiver, setWaiver] = useState('');
  const [travel, setTravel] = useState('');
  const [separationDate, setSeparationDate] = useState(null);
  const [usIndicator, setUsIndicator] = useState(false);
  const [panelMeetingDate, setPanelMeetingDate] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (editMode) {
      setDisableOtherEdits(editMode);
      setStatus(details?.ASGS_CODE || '');
      setAction(details?.LAT_CODE || '');
      setWaiver(details?.WRT_CODE_RR_REPAY || 'N'); // Default to "Not Used"
      setTravel(details?.TF_CD || '');
      setSeparationDate(details?.SEPD_SEPARATION_DATE ?
        new Date(details?.SEPD_SEPARATION_DATE) : null);
      setUsIndicator(details?.SEPD_US_IND === 'Y');
      setPanelMeetingDate(details?.PMD_DTTM ?
        new Date(details?.PMD_DTTM) : null);
      setLocation(details?.DSC_CD ? {
        code: details?.DSC_CD,
        city: details?.SEPD_CITY_TEXT,
        country: details?.SEPD_COUNTRY_STATE_TEXT,
      } : null);
    }
  }, [editMode]);

  const onSubmitForm = () => {
    const state = location?.state;
    const country = location?.country;
    const commonFields = {
      location_code: location?.code,
      separation_date: formatDate(separationDate),
      city_text: location?.city,
      country_state_text: (state && country) ? `${state}, ${country}` : state || country || null,
      us_ind: usIndicator ? 'Y' : 'N',
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
        },
        perdet,
        null, // Use Create Endpoint (No Seq Num)
        true, // Use Separation Endpoint
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
          sep_id: sepId,
          revision_num: revisionNum,
          updated_date: details?.SEPD_UPDATE_DATE,
        },
        perdet,
        sepId, // Use Update Endpoint (Has Seq Num)
        true, // Use Separation Endpoint
        onUpdateSuccess, // Refetch Details on Success
      ));
    }
  };

  const form = {
    /* eslint-disable quote-props */
    inputBody:
      <div className={`position-form separation-form ${isNew ? 'create-form' : ''}`}>
        <div className="position-form--inputs">
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
            <label htmlFor="separation-date">Separation Date</label>
            <TMDatePicker
              selected={separationDate}
              onChange={setSeparationDate}
              showMonthDropdown
              showYearDropdown
              isClearable
              type="form"
            />
          </div>
          <div className="position-form--label-input-container height-80">
            <CheckBox
              id={`training-${data.id ?? 'create'}`}
              label="US Indicator"
              value={usIndicator}
              className="mt-40"
              excludeTmCheckboxClass
              onChange={() => setUsIndicator(!usIndicator)}
            />
          </div>
          <div className="position-form--label-input-container">
            <label htmlFor="panel-meeting-date">Panel Meeting Date</label>
            {panelMeetingLink(details?.PMI_SEQ_NUM, panelMeetingDate, true)}
          </div>
          <div className="position-form--label-input-container gsa-location-input">
            <label htmlFor="location">Location</label>
            <input value={locationString(location) || ''} placeholder="Select Location" readOnly />
            {location &&
              <InteractiveElement
                title="Remove Selected Location"
                role="button"
                type="span"
                className="remove-location"
                onClick={() => setLocation(null)}
              >
                <FA name="times" />
              </InteractiveElement>
            }
            <InteractiveElement
              title="Search Location"
              role="button"
              type="span"
              className="search-location"
              onClick={() => setShowLocationSearch(!showLocationSearch)}
            >
              <FA name="globe" />
            </InteractiveElement>
          </div>
        </div>
        {showLocationSearch &&
          <GsaLocations
            setLocation={(loc) => { setLocation(loc); setShowLocationSearch(false); }}
            activeAIL
          />
        }
      </div>,
    cancelText: 'Are you sure you want to discard all changes made to this Separation?',
    handleSubmit: () => onSubmitForm(),
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
          saveText={isNew ? 'Create Separation' : 'Save Separation'}
        />
      }
    </div>
  );
};

Separation.propTypes = {
  data: POSITION_DETAILS.isRequired,
  isNew: PropTypes.bool,
  toggleModal: PropTypes.func,
  perdet: PropTypes.string,
  setDisableOtherEdits: PropTypes.func,
  disableOtherEdits: PropTypes.bool,
  employee: PropTypes.shape(),
};

Separation.defaultProps = {
  data: {},
  isNew: false,
  toggleModal: EMPTY_FUNCTION,
  perdet: '',
  setDisableOtherEdits: EMPTY_FUNCTION,
  disableOtherEdits: false,
  employee: undefined,
};

export default Separation;
