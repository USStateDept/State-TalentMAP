import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
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
  const startDateError = startDateFlag && !endDateFlag;
  const endDateError = !endDateFlag && startDate > endDate;
  const panelCutOffError = startDateError || endDateError;
  const submitDisabled = seasonError ||
    startDateError || endDateError || panelCutOffError;


  const getStartDateErrorText = () => {
    if (startDateError) {
      return 'A Start Date has not been provided, please add a Start Date.';
    }

    return null;
  };

  const getEndDateErrorText = () => {
    if (endDateError) {
      return 'A Start Date has not been provided or is before End Date.';
    }

    return null;
  };

  const startDateErrorText = getStartDateErrorText();
  const endDateErrorText = getEndDateErrorText();

  const seasonOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'None listed', label: 'None listed' },
  ];

  const startDatePicker = useRef(null);
  const endDatePicker = useRef(null);
  const panelCutoffPicker = useRef(null);

  const openStartDatePicker = () => {
    startDatePicker.current.setOpen(true);
  };
  const openEndDatePicker = () => {
    endDatePicker.current.setOpen(true);
  };
  const openPanelCutoffPicker = () => {
    panelCutoffPicker.current.setOpen(true);
  };

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
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => openStartDatePicker()} />
                <FA name="times" className={`${startDate ? '' : 'hide'} fa-close`} onClick={() => setStartDate(null)} />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a start date' : formatDate(seasonInfo?.bid_seasons_begin_date)}
                  className={startDateError ? 'select-error' : ''}
                  ref={startDatePicker}
                />
                {!!startDateErrorText && <span className="usa-input-error-message" role="alert">{startDateErrorText}</span>}
              </span>
            </div>
            <div>
              <dt>End Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => openEndDatePicker()} />
                <FA name="times" className={`${endDate ? '' : 'hide'} fa-close`} onClick={() => setEndDate(null)} />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a end date' : formatDate(seasonInfo?.bid_seasons_end_date)}
                  className={endDateError ? 'select-error' : ''}
                  minDate={startDate}
                  ref={endDatePicker}
                />
                {!!endDateErrorText && <span className="usa-input-error-message" role="alert">{endDateErrorText}</span>}
              </span>
            </div>
            <div>
              <dt>Panel Cutoff Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => openPanelCutoffPicker()} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(seasonInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
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
