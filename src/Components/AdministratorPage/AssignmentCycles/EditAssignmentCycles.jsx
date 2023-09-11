import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditAssignmentCycles = (props) => {
  const { id } = props;

  const [assignmentCycle, setAssignmentCycle] = useState('');
  const [cycleCategory, setCycleCategory] = useState('');
  const [cycleStatus, setCycleStatus] = useState('');
  const [exclusivePositions, setExclusivePositions] = useState('');
  const [postViewable, setPostViewable] = useState('');
  const [cycleBoundries, setCycleBoundries] = useState('');
  const [sixMonthLanguage, setSixMonthLanguage] = useState('');
  const [twelveMonthLanguage, setTwelveMonthLanguage] = useState('');
  const [twentyFourMonthLanguage, setTwentyFourMonthLanguage] = useState('');
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

  const cycleBoundaryDates = useRef(null);
  const sixMonthLanguageDates = useRef(null);
  const twelveMonthLanguageDates = useRef(null);
  const twentyFourMonthLanguageDates = useRef(null);
  const bureauPositionReviewDate = useRef(null);
  const bidDueDate = useRef(null);
  const bureauPreSeasonBidReviewDate = useRef(null);
  const bureauEarlySeasonBidReviewDate = useRef(null);
  const bureauBidReviewDate = useRef(null);
  const bidAuditDate = useRef(null);
  const bidBookReviewDate = useRef(null);
  const bidCountReviewDate = useRef(null);
  const htfReviewDate = useRef(null);
  const organizationCountReviewDate = useRef(null);
  const mdsReviewDate = useRef(null);
  const assignedBidderDate = useRef(null);

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
            defaultValue={id === '' ? '' : `${assignmentCycle}`}
            onChange={(e) => setAssignmentCycle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="season">Cycle Category</label>
          <span className="bs-validation-container">
            <select
              id="season"
              defaultValue="None Selected"
              onChange={(e) => setCycleCategory(e.target.value)}
              value={cycleCategory}
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
              onChange={(e) => setCycleStatus(e.target.value)}
              value={cycleStatus}
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
              onChange={(e) => setExclusivePositions(e.target.value)}
              value={exclusivePositions}
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
              onChange={(e) => setPostViewable(e.target.value)}
              value={postViewable}
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
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => cycleBoundaryDates.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setCycleBoundries(null)} />
                <DatePicker
                  selected={cycleBoundries}
                  onChange={(date) => setCycleBoundries(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a cycle boundary date"
                  ref={cycleBoundaryDates}
                />
              </span>
            </div>
            <div>
              <dt>6 Month Language Dates </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => sixMonthLanguageDates.current.setOpen(true)} />
                <FA name="times" className={`${sixMonthLanguageDates ? '' : 'hide'} fa-close`} onClick={() => setSixMonthLanguage(null)} />
                <DatePicker
                  selected={sixMonthLanguage}
                  onChange={(date) => setSixMonthLanguage(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a 6 month language date"
                  minDate={sixMonthLanguageDates}
                  ref={sixMonthLanguageDates}
                />
              </span>
            </div>
            <div>
              <dt>12 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => twelveMonthLanguageDates.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setTwelveMonthLanguage(null)} />
                <DatePicker
                  selected={twelveMonthLanguage}
                  onChange={(date) => setTwelveMonthLanguage(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a 12 month language date"
                  minDate={twelveMonthLanguageDates}
                  ref={twelveMonthLanguageDates}
                />
              </span>
            </div>
            <div>
              <dt>24 Month Language Dates</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => twentyFourMonthLanguageDates.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setTwentyFourMonthLanguage(null)} />
                <DatePicker
                  selected={twentyFourMonthLanguage}
                  onChange={(date) => setTwentyFourMonthLanguage(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a 24 month language date"
                  minDate={twentyFourMonthLanguageDates}
                  ref={twentyFourMonthLanguageDates}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Position Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bureauPositionReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauPositionReview(null)} />
                <DatePicker
                  selected={bureauPositionReview}
                  onChange={(date) => setBureauPositionReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bureau position review date"
                  minDate={bureauPositionReviewDate}
                  ref={bureauPositionReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Bid Due Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bidDueDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidDue(null)} />
                <DatePicker
                  selected={bidDue}
                  onChange={(date) => setBidDue(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bid due date"
                  minDate={bidDueDate}
                  ref={bidDueDate}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Pre-Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bureauPreSeasonBidReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauPreSeasonBidReview(null)} />
                <DatePicker
                  selected={bureauPreSeasonBidReview}
                  onChange={(date) => setBureauPreSeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bureau pre-season bid review date"
                  minDate={bureauPreSeasonBidReviewDate}
                  ref={bureauPreSeasonBidReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Early Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bureauEarlySeasonBidReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauEarlySeasonBidReview(null)} />
                <DatePicker
                  selected={bureauEarlySeasonBidReview}
                  onChange={(date) => setBureauEarlySeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bureau early season bid review date"
                  minDate={bureauEarlySeasonBidReviewDate}
                  ref={bureauEarlySeasonBidReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bureauBidReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBureauBidReview(null)} />
                <DatePicker
                  selected={bureauBidReview}
                  onChange={(date) => setBureauBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bureau bid review date"
                  minDate={bureauBidReviewDate}
                  ref={bureauBidReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Bid Audit Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bidAuditDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidAudit(null)} />
                <DatePicker
                  selected={bidAudit}
                  onChange={(date) => setBidAudit(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bid audit date"
                  minDate={bidAuditDate}
                  ref={bidAuditDate}
                />
              </span>
            </div>
            <div>
              <dt>Bid Book Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bidBookReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidBookReview(null)} />
                <DatePicker
                  selected={bidBookReview}
                  onChange={(date) => setBidBookReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bid book review date"
                  minDate={bidBookReviewDate}
                  ref={bidBookReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Bid Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => bidCountReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setBidCountReview(null)} />
                <DatePicker
                  selected={bidCountReview}
                  onChange={(date) => setBidCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a bid count review date"
                  minDate={bidCountReviewDate}
                  ref={bidCountReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>HTF Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => htfReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setHtfReview(null)} />
                <DatePicker
                  selected={htfReview}
                  onChange={(date) => setHtfReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a HTF review date date"
                  minDate={htfReviewDate}
                  ref={htfReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Organization Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => organizationCountReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setOrganizationCountReview(null)} />
                <DatePicker
                  selected={organizationCountReview}
                  onChange={(date) => setOrganizationCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a organization count review date"
                  minDate={organizationCountReviewDate}
                  ref={organizationCountReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>MDS Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => mdsReviewDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setMdsReview(null)} />
                <DatePicker
                  selected={mdsReview}
                  onChange={(date) => setMdsReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a MDS review date"
                  minDate={mdsReviewDate}
                  ref={mdsReviewDate}
                />
              </span>
            </div>
            <div>
              <dt>Assigned Bidder Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" onClick={() => assignedBidderDate.current.setOpen(true)} />
                <FA name="times" className={`${cycleBoundries ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidder(null)} />
                <DatePicker
                  selected={assignedBidder}
                  onChange={(date) => setAssignedBidder(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText="Select a assigned bidder date"
                  minDate={assignedBidderDate}
                  ref={assignedBidderDate}
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
