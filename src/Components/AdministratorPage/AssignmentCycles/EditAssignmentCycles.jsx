import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditBidSeasons = (props) => {
  const { details, currentAssignmentInfo, id } = props;
  const [description, setDescription] = useState(currentAssignmentInfo?.description);
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
  ];

  const startDatePicker = useRef(null);
  const endDatePicker = useRef(null);
  const panelCutoffPicker = useRef(null);

  return (
    <div>
      <form className="assignment-cycle-form">
        <div>
          <label className="label-desc" htmlFor="status">Assignment Cycle</label>
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
          <label htmlFor="season">Cycle Category</label>
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
              {seasonOptions.length === 0 ?
                <option value="">None Listed</option> : seasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
            {!!seasonError && <span className="usa-input-error-message" role="alert">Season is required.</span>}
          </span>
        </div>
        <div>
          <label htmlFor="season">Cycle Status</label>
          <span className="bs-validation-container">
            <select
              id="season"
              className={seasonError ? 'select-error' : ''}
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
              aria-describedby={seasonError ? 'season-error' : ''}
              value={season}
            >
              {seasonOptions.length === 0 ?
                <option value="">None Listed</option> : seasonOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </span>
        </div>
        <div>
          <label htmlFor="season">Exclusive Positions</label>
          <span className="bs-validation-container">
            <select
              id="season"
              className={seasonError ? 'select-error' : ''}
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
              aria-describedby={seasonError ? 'season-error' : ''}
              value={season}
            >
              <option key="Yes" value="Yes">Yes</option>
              <option key="No" value="No">No</option>
            </select>
          </span>
        </div>
        <div>
          <label htmlFor="season">Post Viewable</label>
          <span className="bs-validation-container">
            <select
              id="season"
              className={seasonError ? 'select-error' : ''}
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
              aria-describedby={seasonError ? 'season-error' : ''}
              value={season}
            >
              <option key="Yes" value="Yes">Yes</option>
              <option key="No" value="No">No</option>
            </select>
          </span>
        </div>
        {
          <>
            <div>
              <dt>Cycle Boundary Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => startDatePicker.current.setOpen(true)} />
                <FA name="times" className={`${startDate ? '' : 'hide'} fa-close`} onClick={() => setStartDate(null)} />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a start date' : formatDate(currentAssignmentInfo?.bid_seasons_begin_date)}
                  className={startDateError ? 'select-error' : ''}
                  ref={startDatePicker}
                />
                {!!startDateErrorText && <span className="usa-input-error-message" role="alert">{startDateErrorText}</span>}
              </span>
            </div>
            <div>
              <dt>6 Month Language Dates </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => endDatePicker.current.setOpen(true)} />
                <FA name="times" className={`${endDate ? '' : 'hide'} fa-close`} onClick={() => setEndDate(null)} />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a end date' : formatDate(currentAssignmentInfo?.bid_seasons_end_date)}
                  className={endDateError ? 'select-error' : ''}
                  minDate={startDate}
                  ref={endDatePicker}
                />
                {!!endDateErrorText && <span className="usa-input-error-message" role="alert">{endDateErrorText}</span>}
              </span>
            </div>
            <div>
              <dt>12 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>24 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Position Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bid Due Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Pre-Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Early Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bid Audit Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bid Book Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Bid Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>HTF Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Organization Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>MDS Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <dt>Assigned Bidder Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoff ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoff(null)} />
                <DatePicker
                  selected={panelCutoff}
                  onChange={(date) => setPanelCutoff(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a panel cutoff date' : formatDate(currentAssignmentInfo?.bid_seasons_panel_cutoff)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
          </>
        }
        <button onClick={cancel}>Save Button</button>
        <button onClick={submit}>Delete Assignment Cycle</button>
        <button onClick={submit} type="submit" disabled={submitDisabled}>Post Open Positions</button>
        <button onClick={cancel}>Cancel</button>
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
  currentAssignmentInfo: PropTypes.shape({
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
  currentAssignmentInfo: {
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
