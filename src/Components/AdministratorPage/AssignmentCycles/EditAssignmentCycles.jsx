import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditAssignmentCycles = (props) => {
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
            placeholder="Please provide a description of the assignment cycle."
            defaultValue={id === '' ? '' : `${description}`}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="season">Cycle Category</label>
          <span className="bs-validation-container">
            <select
              id="season"
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
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
          <label htmlFor="season">Cycle Status</label>
          <span className="bs-validation-container">
            <select
              id="season"
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
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
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
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
              defaultValue="None Selected"
              onChange={(e) => setSeason(e.target.value)}
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
                  placeholderText="Select a cycle boundary date"
                  ref={startDatePicker}
                />
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
                  placeholderText="Select a end date"
                  minDate={startDate}
                  ref={endDatePicker}
                />
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
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
                  placeholderText="Select a panel cutoff date"
                  minDate={panelCutoffPicker}
                  ref={panelCutoffPicker}
                />
              </span>
            </div>
          </>
        }
        <button onClick={cancel}>Save Button</button>
        <button onClick={submit}>Delete Assignment Cycle</button>
        <button onClick={submit} type="submit">Post Open Positions</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};

EditAssignmentCycles.propTypes = {
  id: PropTypes.string.is,
  details: PropTypes.shape({
    cycle_name: PropTypes.string,
    cycle_category: PropTypes.string,
    cycle_begin_date: PropTypes.string,
    cycle_end_date: PropTypes.string,
    cycle_excl_position: PropTypes.string,
    cycle_post_view: PropTypes.string,
    cycle_status: PropTypes.string,
    description: PropTypes.string,
  }),
  currentAssignmentInfo: PropTypes.shape({
    cycle_name: PropTypes.string,
    cycle_category: PropTypes.string,
    cycle_begin_date: PropTypes.string,
    cycle_end_date: PropTypes.string,
    cycle_excl_position: PropTypes.string,
    cycle_post_view: PropTypes.string,
    cycle_status: PropTypes.string,
    description: PropTypes.string,
  }),
};


EditAssignmentCycles.defaultProps = {
  id: '',
  details: {
    cycle_name: '',
    cycle_category: '',
    cycle_begin_date: '',
    cycle_end_date: '',
    cycle_excl_position: '',
    cycle_post_view: '',
    cycle_status: '',
    description: '',
  },
  currentAssignmentInfo: {
    cycle_name: '',
    cycle_category: '',
    cycle_begin_date: '',
    cycle_end_date: '',
    cycle_excl_position: '',
    cycle_post_view: '',
    cycle_status: '',
    description: '',
  },
};

export default EditAssignmentCycles;
