import { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import InteractiveElement from 'Components/InteractiveElement';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditBidSeasons = (props) => {
  const { details, seasonInfo, id } = props;
  const [description, setDescription] = useState(seasonInfo?.description);
  const [season, setSeason] = useState('None Selected');
  const startDateInfo = !get(details, 'startDate') ? null : new Date(get(details, 'startDate'));
  const endDateInfo = !get(details, 'endDate') ? null : new Date(get(details, 'endDate'));
  const panelCutoffInfo = !get(details, 'panelCutoff') ? null : new Date(get(details, 'panelCutoff'));
  const [startDate, setStartDate] = useState(startDateInfo);
  const [endDate, setEndDate] = useState(endDateInfo);
  const [panelCutoff, setPanelCutoff] = useState(panelCutoffInfo);

  const submit = (e) => {
    e.preventDefault();
    swal.close();
    // Doing nothing for now but closing.
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const seasonError = season === '';
  const startDateFlag = startDate === null;
  const endDateFlag = endDate === null;
  const panelCutOffFlag = panelCutoff === null;
  const startDateError = startDateFlag && !endDateFlag;
  const endDateError = !endDateFlag && startDate > endDate;
  const panelCutOffError = startDateError || endDateError;
  const startDateClearIconInactive = startDateFlag ||
    (!startDateFlag && !endDateFlag);
  const submitDisabled = seasonError ||
    startDateError || endDateError || panelCutOffError;


  const getStartDateErrorText = () => {
    if (startDateError) {
      return 'You must delete end date or add back a start date before saving.';
    }
    return null;
  };

  const startDateErrorText = getStartDateErrorText();

  const updateStartDate = (date) => {
    setStartDate(date);
  };

  const updateEndDate = (date) => {
    setEndDate(date);
  };

  const updatePanelCutOff = (date) => {
    setPanelCutoff(date);
  };

  const clearStartDate = () => {
    setStartDate(null);
  };

  const clearEndDate = () => {
    setEndDate(null);
  };

  const clearPanelCutOff = () => {
    setPanelCutoff(null);
  };

  const seasonOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'None listed', label: 'None listed' },
  ];

  return (
    <div>
      <form className="bid-seasons-form">
        <div>
          <label htmlFor="status">Description</label>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="255"
            name="description"
            placeholder="Please provide a description of the bid season."
            defaultValue={id === '' ? '' : `${description}`}
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
          <span className="bs-validation-container">
            <select
              id="season"
              className={seasonError ? 'select-error' : ''}
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
              aria-describedby={seasonError ? 'season-error' : ''}
              value={season}
            >
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
                  selected={startDate}
                  onChange={updateStartDate}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo?.bid_seasons_begin_date)}
                  className={startDateError ? 'select-error' : ''}
                />
                {!!startDateErrorText && <span className="usa-input-error-message" role="alert">{startDateErrorText}</span>}
              </span>
              {startDateClearIconInactive &&
              <div className="bs-clear-icon">
                <FA name="times-circle fa-lg inactive" />
              </div>
              }
              {!startDateFlag && endDateFlag &&
              <div className="bs-clear-icon">
                <InteractiveElement
                  onClick={clearStartDate}
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
                  selected={endDate}
                  onChange={updateEndDate}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo?.bid_seasons_end_date)}
                  className={endDateError ? 'select-error' : ''}
                  minDate={startDate}
                />
              </span>
              {endDateFlag ?
                <div className="date-clear-icon">
                  <FA name="times-circle fa-lg inactive" />
                </div>
                :
                <div className="date-clear-icon">
                  <InteractiveElement
                    onClick={clearEndDate}
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
                  selected={panelCutoff}
                  onChange={updatePanelCutOff}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'MM/DD/YYYY' : formatDate(seasonInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoff}
                />
              </span>
              {panelCutOffFlag ?
                <div className="date-clear-icon">
                  <FA name="times-circle fa-lg inactive" />
                </div>
                :
                <div className="date-clear-icon">
                  <InteractiveElement
                    onClick={clearPanelCutOff}
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
  id: PropTypes.string.is,
  details: PropTypes.shape({
    formattedCreated: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    panelCutOff: PropTypes.string,
  }),
  seasonInfo: PropTypes.shape({
    bid_seasons_name: PropTypes.string,
    bid_seasons_category: PropTypes.string,
    bid_seasons_begin_date: PropTypes.string,
    bid_seasons_panel_cutoff: PropTypes.string,
    bid_seasons_end_date: PropTypes.string,
    bid_seasons_future_vacancy: PropTypes.string,
    description: PropTypes.string,
  }),
};


EditBidSeasons.defaultProps = {
  id: '',
  details: {
    formattedCreated: '',
    startDate: '',
    endDate: '',
    panelCutOff: '',
  },
  seasonInfo: {
    bid_seasons_name: '',
    bid_seasons_category: '',
    bid_seasons_begin_date: '',
    bid_seasons_panel_cutoff: '',
    bid_seasons_end_date: '',
    bid_seasons_future_vacancy: '',
    description: '',
  },
};

export default EditBidSeasons;
