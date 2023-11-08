import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import DatePicker from 'react-datepicker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import TextareaAutosize from 'react-textarea-autosize';
import CheckBox from '../CheckBox';

const DATE_FORMAT = 'MMMM d, yyyy';

const EditAssignmentCycles = (props) => {
  const { onClose, onPost, onSave } = props;

  const [assignmentCycle, setAssignmentCycle] = useState('');
  const [cycleCategory, setCycleCategory] = useState('');
  const [cycleStatus, setCycleStatus] = useState('');
  const [exclusivePositions, setExclusivePositions] = useState(false);
  const [postViewable, setPostViewable] = useState(false);
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

  const cycleCategories = [
    { value: 'A', label: 'A(A100)' },
    { value: 'O', label: 'O(Other)' },
    { value: 'J', label: 'J(Untenured Junior Officer' },
  ];

  const cycleStatuses = [
    { value: 'A', label: 'A(Active)' },
    { value: 'C', label: 'C(Closed)' },
    { value: 'M', label: 'M(Merged)' },
    { value: 'P', label: 'P(Proposed)' },
  ];

  // These functions arent functional for now.
  const saveAC = (e) => {
    e.preventDefault();
    const userData = {
      assignmentCycle,
      cycleCategory,
      cycleStatus,
      exclusivePositions,
      postViewable,
      cycleBoundries,
      sixMonthLanguage,
      twelveMonthLanguage,
      twentyFourMonthLanguage,
      bureauPositionReview,
      bidDue,
      bureauPreSeasonBidReview,
      bureauEarlySeasonBidReview,
      bureauBidReview,
      bidAudit,
      bidBookReview,
      bidCountReview,
      htfReview,
      organizationCountReview,
      mdsReview,
      assignedBidder,
    };
    onSave(true, userData);
  };

  const postAC = (e) => {
    e.preventDefault();
    const userData = {
      assignmentCycle,
      cycleCategory,
      cycleStatus,
      exclusivePositions,
      postViewable,
      cycleBoundries,
      sixMonthLanguage,
      twelveMonthLanguage,
      twentyFourMonthLanguage,
      bureauPositionReview,
      bidDue,
      bureauPreSeasonBidReview,
      bureauEarlySeasonBidReview,
      bureauBidReview,
      bidAudit,
      bidBookReview,
      bidCountReview,
      htfReview,
      organizationCountReview,
      mdsReview,
      assignedBidder,
    };
    onPost(true, userData);
  };

  const cancelAC = (e) => {
    e.preventDefault();
    onClose(true);
  };

  return (
    <div>
      <form className="assignment-cycle-form">
        <div>
          <label className="label-desc" htmlFor="status">Assignment Cycle</label>
          <span className="bs-validation-container">
            <TextareaAutosize
              maxlength="255"
              name="description"
              placeholder="Please provide a description of the assignment cycle."
              defaultValue={assignmentCycle}
              onChange={(e) => setAssignmentCycle(e.target.value)}
            />
          </span>
        </div>
        <div>
          <label htmlFor="season">Cycle Category</label>
          <span className="bs-validation-container">
            <select
              id="cycleCategory"
              defaultValue="None Selected"
              onChange={(e) => setCycleCategory(e.target.value)}
              value={cycleCategory}
            >
              {cycleCategories.length === 0 ?
                <option value="">None Listed</option> : cycleCategories.map((option) => (
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
              value={cycleStatus}
            >
              {cycleStatuses.length === 0 ?
                <option value="">None Listed</option> : cycleStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </span>
        </div>
        <div>
          <label htmlFor="exclusivePositions">Exclusive Positions</label>
          <span className="bs-validation-container">
            <CheckBox
              className="exclusivePositions-new"
              id="exclusivePositions-new"
              name="exclusivePositions-new"
              checked={exclusivePositions}
              onChange={() => setExclusivePositions(e => !e)}
            />
          </span>
        </div>
        <div>
          <label htmlFor="postViewable">Post Viewable</label>
          <span className="bs-validation-container">
            <CheckBox
              className="postViewable-new"
              id="postViewable-new"
              name="postViewable-new"
              checked={postViewable}
              onChange={() => setPostViewable(e => !e)}
            />
          </span>
        </div>
        {
          <>
            <div>
              <dt>Cycle Boundary Dates</dt>
              <span className="date-picker-validation-container-new larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <DateRangePicker
                  onChange={setCycleBoundries}
                  value={cycleBoundries}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>6 Month Language Dates </dt>
              <span className="date-picker-validation-container-new larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <DateRangePicker
                  onChange={setSixMonthLanguage}
                  value={sixMonthLanguage}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>12 Month Language Dates</dt>
              <span className="date-picker-validation-container-new larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <DateRangePicker
                  onChange={setTwelveMonthLanguage}
                  value={twelveMonthLanguage}
                  maxDetail="month"
                  calendarIcon={null}
                  className="date-picker-validation-container"
                />
              </span>
            </div>
            <div>
              <dt>24 Month Language Dates</dt>
              <span className="date-picker-validation-container-new larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <DateRangePicker
                  onChange={setTwentyFourMonthLanguage}
                  value={twentyFourMonthLanguage}
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
                <FA name="times" className={`${bureauPositionReview ? '' : 'hide'} fa-close`} onClick={() => setBureauPositionReview(null)} />
                <DatePicker
                  selected={bureauPositionReview}
                  onChange={(date) => setBureauPositionReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bureau position review date'}
                  minDate={bureauPositionReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Due Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidDue ? '' : 'hide'} fa-close`} onClick={() => setBidDue(null)} />
                <DatePicker
                  selected={bidDue}
                  onChange={(date) => setBidDue(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bid due date'}
                  minDate={bidDue}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Pre-Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauPreSeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauPreSeasonBidReview(null)} />
                <DatePicker
                  selected={bureauPreSeasonBidReview}
                  onChange={(date) => setBureauPreSeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bureau pre-season bid review date'}
                  minDate={bureauPreSeasonBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Early Season Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauEarlySeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauEarlySeasonBidReview(null)} />
                <DatePicker
                  selected={bureauEarlySeasonBidReview}
                  onChange={(date) => setBureauEarlySeasonBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bureau early season bid review date'}
                  minDate={bureauEarlySeasonBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bureau Bid Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauBidReview(null)} />
                <DatePicker
                  selected={bureauBidReview}
                  onChange={(date) => setBureauBidReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bureau bid review date'}
                  minDate={bureauBidReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Audit Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidAudit ? '' : 'hide'} fa-close`} onClick={() => setBidAudit(null)} />
                <DatePicker
                  selected={bidAudit}
                  onChange={(date) => setBidAudit(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bid audit date'}
                  minDate={bidAudit}
                />
              </span>
            </div>
            <div>
              <dt>Bid Book Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidBookReview ? '' : 'hide'} fa-close`} onClick={() => setBidBookReview(null)} />
                <DatePicker
                  selected={bidBookReview}
                  onChange={(date) => setBidBookReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bid book review date'}
                  minDate={bidBookReview}
                />
              </span>
            </div>
            <div>
              <dt>Bid Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidCountReview ? '' : 'hide'} fa-close`} onClick={() => setBidCountReview(null)} />
                <DatePicker
                  selected={bidCountReview}
                  onChange={(date) => setBidCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a bid count review date'}
                  minDate={bidCountReview}
                />
              </span>
            </div>
            <div>
              <dt>HTF Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${htfReview ? '' : 'hide'} fa-close`} onClick={() => setHtfReview(null)} />
                <DatePicker
                  selected={htfReview}
                  onChange={(date) => setHtfReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a HTF review date'}
                  minDate={htfReview}
                />
              </span>
            </div>
            <div>
              <dt>Organization Count Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${organizationCountReview ? '' : 'hide'} fa-close`} onClick={() => setOrganizationCountReview(null)} />
                <DatePicker
                  selected={organizationCountReview}
                  onChange={(date) => setOrganizationCountReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a organization count review date'}
                  minDate={organizationCountReview}
                />
              </span>
            </div>
            <div>
              <dt>MDS Review Date</dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${mdsReview ? '' : 'hide'} fa-close`} onClick={() => setMdsReview(null)} />
                <DatePicker
                  selected={mdsReview}
                  onChange={(date) => setMdsReview(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a MDS review date'}
                  minDate={mdsReview}
                />
              </span>
            </div>
            <div>
              <dt>Assigned Bidder Date </dt>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${assignedBidder ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidder(null)} />
                <DatePicker
                  selected={assignedBidder}
                  onChange={(date) => setAssignedBidder(date)}
                  dateFormat={DATE_FORMAT}
                  placeholderText={'Select a assigned bidder date'}
                  minDate={assignedBidder}
                />
              </span>
            </div>
          </>
        }
        <div>
          <button onClick={saveAC}>Save</button>
          <button onClick={postAC} type="submit">Post Open Positions</button>
          <button onClick={cancelAC}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

EditAssignmentCycles.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPost: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};


EditAssignmentCycles.defaultProps = {
  onClose: () => { },
  onPost: () => { },
  onSave: () => { },
};

export default EditAssignmentCycles;