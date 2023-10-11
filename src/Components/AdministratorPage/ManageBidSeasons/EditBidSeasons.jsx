import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'utilities';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import CheckBox from 'Components/CheckBox';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditBidSeasons = (props) => {
  const {
    id,
    description,
    bidSeasonsBeginDate,
    bidSeasonsEndDate,
    bidSeasonsPanelCutoff,
    bidSeasonsFutureVacancy,
    bidSeasonsCreateId,
    bidSeasonsCreateDate,
    bidSeasonsUpdateId,
    bidSeasonsUpdateDate,
    bidSeasonsSntSeqNum,
    submitAction,
  } = props;

  const startDateGetDate = bidSeasonsBeginDate ? new Date(bidSeasonsBeginDate) : null;
  const endDateGetDate = bidSeasonsEndDate ? new Date(bidSeasonsEndDate) : null;
  const panelCutoffDateGetDate = bidSeasonsPanelCutoff
    ? new Date(bidSeasonsPanelCutoff) : null;

  const [name, setName] = useState(description);
  const [startDate, setStartDate] = useState(startDateGetDate);
  const [endDate, setEndDate] = useState(endDateGetDate);
  const [panelCutoffDate, setPanelCutoffDate] = useState(panelCutoffDateGetDate);
  const [futureVacancy, setFutureVacancy] = useState(bidSeasonsFutureVacancy);
  const [season, setSeason] = useState(bidSeasonsSntSeqNum);

  const submit = (e) => {
    e.preventDefault();
    swal.close();
    submitAction({
      id,
      name,
      startDate,
      endDate,
      panelCutoffDate,
      futureVacancy,
      bidSeasonsCreateId,
      bidSeasonsCreateDate,
      bidSeasonsUpdateId,
      bidSeasonsUpdateDate,
      season,
    });
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };

  const submitDisabled = !startDate || !endDate || !panelCutoffDate || !name;

  const startDatePicker = useRef(null);
  const endDatePicker = useRef(null);
  const panelCutoffPicker = useRef(null);

  return (
    <div>
      <form className="bid-seasons-form">
        <div>
          <label htmlFor="status">Name</label>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxLength="255"
            name="description"
            placeholder="Please provide the name of the bid season."
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {
          <>
            <div>
              <label htmlFor="status">Season</label>
              <select defaultValue={season} onChange={(e) => setSeason(e.target.value)}>
                <option value="1">Summer</option>
                <option value="2">Winter</option>
              </select>
            </div>
            <div>
              <dt>Start Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => startDatePicker.current.setOpen(true)} />
                <FA name="times" className={`${startDate ? '' : 'hide'} fa-close`} onClick={() => setStartDate(null)} />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={startDate === '' ? 'Select a start date' : formatDate(startDate)}
                  ref={startDatePicker}
                />
              </span>
            </div>
            <div>
              <dt>End Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => endDatePicker.current.setOpen(true)} />
                <FA name="times" className={`${endDate ? '' : 'hide'} fa-close`} onClick={() => setEndDate(null)} />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={endDate === '' ? 'Select a end date' : formatDate(endDate)}
                  minDate={startDate}
                  ref={endDatePicker}
                />
              </span>
            </div>
            <div>
              <dt>Panel Cutoff Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => panelCutoffPicker.current.setOpen(true)} />
                <FA name="times" className={`${panelCutoffDate ? '' : 'hide'} fa-close`} onClick={() => setPanelCutoffDate(null)} />
                <DatePicker
                  selected={panelCutoffDate}
                  onChange={(date) => setPanelCutoffDate(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={panelCutoffDate === '' ? 'Select a panel cutoff date' : formatDate(panelCutoffDate)}
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
            <div>
              <span className="date-picker-validation-container larger-date-picker">
                <CheckBox
                  id="deto"
                  label="Future Vacancy"
                  value={futureVacancy === 'Y'}
                  onCheckBoxClick={e => setFutureVacancy(e ? 'Y' : 'N')}
                />
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
  submitAction: PropTypes.func.isRequired,
  id: PropTypes.number,
  description: PropTypes.string,
  bidSeasonsBeginDate: PropTypes.string,
  bidSeasonsEndDate: PropTypes.string,
  bidSeasonsPanelCutoff: PropTypes.string,
  bidSeasonsFutureVacancy: PropTypes.string,
  bidSeasonsCreateId: PropTypes.number,
  bidSeasonsCreateDate: PropTypes.string,
  bidSeasonsUpdateId: PropTypes.number,
  bidSeasonsUpdateDate: PropTypes.string,
  bidSeasonsSntSeqNum: PropTypes.string,
};

EditBidSeasons.defaultProps = {
  id: null,
  description: null,
  bidSeasonsBeginDate: null,
  bidSeasonsEndDate: null,
  bidSeasonsPanelCutoff: null,
  bidSeasonsFutureVacancy: 'N',
  bidSeasonsSntSeqNum: '1',
  bidSeasonsCreateId: '',
  bidSeasonsCreateDate: '',
  bidSeasonsUpdateId: '',
  bidSeasonsUpdateDate: '',
};

export default EditBidSeasons;
