import { useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import { formatDate } from 'utilities';
import DatePicker from 'react-datepicker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditAssignmentCycles = (props) => {
  const { details, id } = props;

  const [assignmentCycle, setAssignmentCycle] = useState('');
  const [cycleCategory, setCycleCategory] = useState('');
  const [cycleStatus, setCycleStatus] = useState('');
  const [exclusivePositions, setExclusivePositions] = useState('');
  const [postViewable, setPostViewable] = useState('');
  const [cycleBoundries, setCycleBoundries] = useState(null);
  const [sixMonthLanguage, setSixMonthLanguage] = useState(null);
  const [twelveMonthLanguage, setTwelveMonthLanguage] = useState(null);
  const [twentyFourMonthLanguage, setTwentyFourMonthLanguage] = useState(null);
  const [bureauPositionReview, setBureauPositionReview] = useState('');
  const [bidDue, setBidDue] = useState('');
  const [bureauPreSeasonBidReview, setBureauPreSeasonBidReview] = useState('');
  const [bureauEarlySeasonBidReview, setBureauEarlySeasonBidReview] = useState('');
  const [bureauBidReview, setBureauBidReview] = useState('');
  const [bidAudit, setBidAudit] = useState('');
  const [bidBookReview, setBidBookReview] = useState('');
  const [bidCountReview, setBidCountReview] = useState('');
  const [htfReview, setHtfReview] = useState('');
  const [organizationCountReview, setOrganizationCountReview] = useState('');
  const [mdsReview, setMdsReview] = useState('');
  const [assignedBidder, setAssignedBidder] = useState('');

  const seasonOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
  ];

  // These functions arent functional for now.
  const saveAC = (e) => {
    e.preventDefault();
    swal.close();
  };

  const deleteAC = (e) => {
    e.preventDefault();
    swal.close();
  };

  const postAC = (e) => {
    e.preventDefault();
    swal.close();
  };

  const cancelAC = (e) => {
    e.preventDefault();
    swal.close();
  };

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
            defaultValue={id === '' ? assignmentCycle : details?.assignmentCycle?.assignmentCycle}
            onChange={(e) => setAssignmentCycle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="season">Cycle Category</label>
          <span className="bs-validation-container">
            <select
              id="cycleCategory"
              defaultValue="None Selected"
              onChange={(e) => setCycleCategory(e.target.value)}
              value={id === '' ? cycleCategory : details?.assignmentCycle?.cycleCategory}
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
              id="cycleStatus"
              defaultValue="None Selected"
              onChange={(e) => setCycleStatus(e.target.value)}
              value={id === '' ? cycleStatus : details?.assignmentCycle?.cycleStatus}
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
              id="ExclusivePositions"
              defaultValue="None Selected"
              onChange={(e) => setExclusivePositions(e.target.value)}
              value={id === '' ? exclusivePositions : details?.assignmentCycle?.exclusivePosition}
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
              id="postViewable"
              defaultValue="None Selected"
              onChange={(e) => setPostViewable(e.target.value)}
              value={id === '' ? postViewable : details?.assignmentCycle?.postView}
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
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setCycleBoundries(null)} />
                <DateRangePicker
                  onChange={setCycleBoundries}
                  value={id === '' ? cycleBoundries : details?.assignmentCycle?.cycleBoundary}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>6 Month Language Dates </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${sixMonthLanguage ? '' : 'hide'} fa-close`} onClick={() => setSixMonthLanguage(null)} />
                <DateRangePicker
                  onChange={setSixMonthLanguage}
                  value={id === '' ? sixMonthLanguage : details?.assignmentCycle?.sixMonthBoundary}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>12 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${twelveMonthLanguage ? '' : 'hide'} fa-close`} onClick={() => setTwelveMonthLanguage(null)} />
                <DateRangePicker
                  onChange={setTwelveMonthLanguage}
                  value={id === '' ? twelveMonthLanguage : details?.assignmentCycle?.twelveMonthBoundary}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>24 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${twentyFourMonthLanguage ? '' : 'hide'} fa-close`} onClick={() => setTwentyFourMonthLanguage(null)} />
                <DateRangePicker
                  onChange={setTwentyFourMonthLanguage}
                  value={id === '' ? twentyFourMonthLanguage : details?.assignmentCycle?.twentyFourMonthBoundary}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>Bureau Position Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauPositionReview(null)} />
                <DatePicker
                  selected={bureauPositionReview}
                  onChange={(date) => setBureauPositionReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bureau position review date' : formatDate(details?.assignmentCycle?.bureaPositionReview)}
                  minDate={bureauPositionReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Due Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidDue(null)} />
                <DatePicker
                  selected={bidDue}
                  onChange={(date) => setBidDue(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bid due date' : formatDate(details?.assignmentCycle?.bidDueDate)}
                  minDate={bidDue}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Pre-Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauPreSeasonBidReview(null)} />
                <DatePicker
                  selected={bureauPreSeasonBidReview}
                  onChange={(date) => setBureauPreSeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bureau pre-season bid review date' : formatDate(details?.assignmentCycle?.bureauPreSeasonBidReview)}
                  minDate={bureauPreSeasonBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Early Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauEarlySeasonBidReview(null)} />
                <DatePicker
                  selected={bureauEarlySeasonBidReview}
                  onChange={(date) => setBureauEarlySeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bureau early season bid review date' : formatDate(details?.assignmentCycle?.bureauEarlySeasonBidReview)}
                  minDate={bureauEarlySeasonBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauBidReview(null)} />
                <DatePicker
                  selected={bureauBidReview}
                  onChange={(date) => setBureauBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bureau bid review date' : formatDate(details?.assignmentCycle?.bureauBidReview)}
                  minDate={bureauBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Audit Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidAudit(null)} />
                <DatePicker
                  selected={bidAudit}
                  onChange={(date) => setBidAudit(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bid audit date' : formatDate(details?.assignmentCycle?.bidAudit)}
                  minDate={bidAudit}
                />
              </span>
            </div>
            <div>
              <dt>Bid Book Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidBookReview(null)} />
                <DatePicker
                  selected={bidBookReview}
                  onChange={(date) => setBidBookReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bid book review date' : formatDate(details?.assignmentCycle?.bidBookReview)}
                  minDate={bidBookReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidCountReview(null)} />
                <DatePicker
                  selected={bidCountReview}
                  onChange={(date) => setBidCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a bid count review date' : formatDate(details?.assignmentCycle?.bidCountReview)}
                  minDate={bidCountReview}
                />
              </span>
            </div>
            <div>
              <dt>HTF Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setHtfReview(null)} />
                <DatePicker
                  selected={htfReview}
                  onChange={(date) => setHtfReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a HTF review date' : formatDate(details?.assignmentCycle?.htfReview)}
                  minDate={htfReview}
                />
              </span>
            </div>
            <div>
              <dt>Organization Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setOrganizationCountReview(null)} />
                <DatePicker
                  selected={organizationCountReview}
                  onChange={(date) => setOrganizationCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a organization count review date' : formatDate(details?.assignmentCycle?.organizationCountReview)}
                  minDate={organizationCountReview}
                />
              </span>
            </div>
            <div>
              <dt>MDS Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setMdsReview(null)} />
                <DatePicker
                  selected={mdsReview}
                  onChange={(date) => setMdsReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a MDS review date' : formatDate(details?.assignmentCycle?.mdsReview)}
                  minDate={mdsReview}
                />
              </span>
            </div>
            <div>
              <dt>Assigned Bidder Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidder(null)} />
                <DatePicker
                  selected={assignedBidder}
                  onChange={(date) => setAssignedBidder(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={id === '' ? 'Select a assigned bidder date' : formatDate(details?.assignmentCycle?.assignedBidder)}
                  minDate={assignedBidder}
                />
              </span>
            </div>
          </>
        }
        <button onClick={saveAC}>Save Button</button>
        <button onClick={deleteAC}>Delete Assignment Cycle</button>
        <button onClick={postAC} type="submit">Post Open Positions</button>
        <button onClick={cancelAC}>Cancel</button>
      </form>
    </div>
  );
};

EditAssignmentCycles.propTypes = {
  id: PropTypes.string.is,
  details: PropTypes.shape({
    assignmentCycle: PropTypes.string,
    cycleCategory: PropTypes.string,
    cycleStatus: PropTypes.string,
    exclusivePosition: PropTypes.string,
    postView: PropTypes.string,
    cycleBoundary: PropTypes.string,
    sixMonthBoundary: PropTypes.string,
    twelveMonthBoundary: PropTypes.string,
    twentyFourMonthBoundary: PropTypes.string,
    bureaPositionReview: PropTypes.string,
    bidDueDate: PropTypes.string,
    bureauPreSeasonBidReview: PropTypes.string,
    bureauEarlySeasonBidReview: PropTypes.string,
    bureauBidReview: PropTypes.string,
    bidAudit: PropTypes.string,
    bidBookReview: PropTypes.string,
    bidCountReview: PropTypes.string,
    htfReview: PropTypes.string,
    organizationCountReview: PropTypes.string,
    mdsReview: PropTypes.string,
    assignedBidder: PropTypes.string,
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
    assignmentCycle: '',
    cycleCategory: '',
    cycleStatus: '',
    exclusivePosition: '',
    postView: '',
    cycleBoundary: '',
    sixMonthBoundary: '',
    twelveMonthBoundary: '',
    twentyFourMonthBoundary: '',
    bureaPositionReview: '',
    bidDueDate: '',
    bureauPreSeasonBidReview: '',
    bureauEarlySeasonBidReview: '',
    bureauBidReview: '',
    bidAudit: '',
    bidBookReview: '',
    bidCountReview: '',
    htfReview: '',
    organizationCountReview: '',
    mdsReview: '',
    assignedBidder: '',
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
