import { useState } from 'react';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { Column, Row } from 'Components/Layout';
import { formatDate, userHasPermissions } from 'utilities';
import {
  deleteAssignmentCyclesSelections,
  postAssignmentCyclesSelections,
  saveAssignmentCyclesSelections,
} from 'actions/cycleManagement';
import CheckBox from '../CheckBox';

const CycleSearchCard = (props) => {
  const dispatch = useDispatch();

  const {
    id,
    cycle_name,
    cycle_status,
    cycle_category,
    cycle_begin_date,
    cycle_end_date,
    cycle_excl_position,
    cycle_post_view,
    isAO,
    onEditModeSearch,
  } = props;

  const cycleLink = `/profile/${isAO ? 'ao' : 'bureau'}/cyclepositionsearch/${id}`;
  const userProfile = useSelector(state => state.userProfile);
  const assignmentCyclesSelections = useSelector(state => state.cycleManagementAssignmentCycle);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);
  const [assignmentCycle, setAssignmentCycle] = useState(assignmentCyclesSelections?.assignmentCycle || 'Select an assignment cycle');
  const [cycleCategory, setCycleCategory] = useState(assignmentCyclesSelections?.cycleCategory || 'Fall');
  const [cycleStatus, setCycleStatus] = useState(assignmentCyclesSelections?.cycleStatus || 'Winter');
  const [exclusivePositions, setExclusivePositions]
    = useState(assignmentCyclesSelections?.exclusivePositions);
  const [postViewable, setPostViewable] = useState(assignmentCyclesSelections?.postViewable);
  const [cycleBoundries, setCycleBoundries]
    = useState(assignmentCyclesSelections?.cycleBoundary || null);
  const [sixMonthLanguage, setSixMonthLanguage]
    = useState(assignmentCyclesSelections?.sixMonthBoundary || null);
  const [twelveMonthLanguage, setTwelveMonthLanguage]
    = useState(assignmentCyclesSelections?.twelveMonthBoundary || null);
  const [twentyFourMonthLanguage, setTwentyFourMonthLanguage]
    = useState(assignmentCyclesSelections?.twelveMonthBoundary || null);
  const [bureauPositionReview, setBureauPositionReview] = useState(assignmentCyclesSelections?.bureaPositionReview || 'Select a bureau position review date');
  const [bidDue, setBidDue] = useState(assignmentCyclesSelections?.bidDueDate || 'Select a bid due date');
  const [bureauPreSeasonBidReview, setBureauPreSeasonBidReview] = useState(assignmentCyclesSelections?.bureauPreSeasonBidReview || 'Select a bureau pre-season bid review date');
  const [bureauEarlySeasonBidReview, setBureauEarlySeasonBidReview] = useState(assignmentCyclesSelections?.bureauEarlySeasonBidReview || 'Select a bureau early season bid review date');
  const [bureauBidReview, setBureauBidReview] = useState(assignmentCyclesSelections?.bureauBidReview || 'Select a bureau bid review date');
  const [bidAudit, setBidAudit] = useState(assignmentCyclesSelections?.bidAudit || 'Select a bid audit date');
  const [bidBookReview, setBidBookReview] = useState(assignmentCyclesSelections?.bidBookReview || 'Select a bid book review date');
  const [bidCountReview, setBidCountReview] = useState(assignmentCyclesSelections?.bidCountReview || 'Select a bid count review date');
  const [htfReview, setHtfReview] = useState(assignmentCyclesSelections?.htfReview || 'Select a HTF review date');
  const [organizationCountReview, setOrganizationCountReview] = useState(assignmentCyclesSelections?.organizationCountReview || 'Select a organization count review date');
  const [mdsReview, setMdsReview] = useState(assignmentCyclesSelections?.mdsReview || 'Select a MDS review date');
  const [assignedBidder, setAssignedBidder] = useState(assignmentCyclesSelections?.assignedBidder || 'Select a assigned bidder date');
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const DATE_FORMAT = 'MMMM d, yyyy';

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

  const collapseCard = () => {
    setShowMore(!showMore);
    setEdit(e => !e);
    onEditModeSearch(id);
  };

  const onCancelRequest = () => {
    swal.close();
    setAssignmentCycle('');
    setCycleCategory('');
    setCycleStatus('');
    setExclusivePositions(false);
    setPostViewable(false);
    setCycleBoundries(null);
    setSixMonthLanguage(null);
    setTwelveMonthLanguage(null);
    setTwentyFourMonthLanguage(null);
    setBureauPositionReview('');
    setBidDue('');
    setBureauPreSeasonBidReview('');
    setBureauEarlySeasonBidReview('');
    setBureauBidReview('');
    setBidAudit('');
    setBidBookReview('');
    setBidCountReview('');
    setHtfReview('');
    setOrganizationCountReview('');
    setMdsReview('');
    setAssignedBidder('');
    setEdit(false);
    onEditModeSearch(id);
  };

  const cancel = (e) => {
    e.preventDefault();
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{'Are you sure you want to discard all changes made to this list?'}</span>
          </div>
          <div className="modal-controls">
            <button onClick={onCancelRequest}>Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
          </div>
        </div>
      ),
    });
  };

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
    dispatch(saveAssignmentCyclesSelections(userData));
    setEdit(false);
    onEditModeSearch(id);
  };

  const deleteAC = (e) => {
    e.preventDefault();
    const userData = {
      id,
    };
    dispatch(deleteAssignmentCyclesSelections(userData));
    setEdit(false);
    onEditModeSearch(id);
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
    dispatch(postAssignmentCyclesSelections(userData));
    setEdit(false);
    onEditModeSearch(id);
  };

  return (
    <Row fluid className="cycle-search-card box-shadow-standard">
      <Row fluid className="cyc-card--row">
        <Column columns={3}>
          {cycle_name}
        </Column>
        <Column columns={12} className="cyc-card--middle-cols">
          <Column>
            {`Cycle Start: ${cycle_begin_date ? formatDate(cycle_begin_date) : ''}`}
          </Column>
          <Column>
            {`Bid Due: ${cycle_end_date ? formatDate(cycle_end_date) : ''}`}
          </Column>
          <Column>
            {cycle_status}
          </Column>
          <Column>
            {`Status: ${cycle_category}`}
          </Column>
          <Column>
            {`Exluded: ${cycle_excl_position}`}
          </Column>
          <Column>
            {`Post View: ${cycle_post_view}`}
          </Column>
        </Column>
        <Column columns={3} className="cyc-card--link-col">
          <span>
            <Link to={cycleLink}>
              View Cycle Positions
            </Link>
            {isSuperUser &&
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  collapseCard();
                  setEditMode(!editMode);
                }
                }
                to="#"
              >
                {!edit ?
                  <div>
                    <FA className="fa-solid fa-pencil" />
                    Edit Cycle Details
                  </div>
                  : <div>Close</div>
                }
              </Link>
            }
          </span>
        </Column>
      </Row>
      {edit &&
        <div>
          <form className="assignment-cycle-form" >
            <div className="ac-sections">
              <label htmlFor="assignmentCycle">Assignment Cycle</label>
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
            <div className="ac-sections">
              <label htmlFor="exclusoivePositions">Exclusive Positions</label>
              <span className="bs-validation-container">
                <CheckBox
                  id="exclusivePositions"
                  name="exclusivePositions"
                  checked={exclusivePositions}
                  onChange={() => setExclusivePositions(e => !e)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="postViewable">Post Viewable</label>
              <span className="bs-validation-container">
                <CheckBox
                  id="postViewable"
                  name="postViewable"
                  checked={postViewable}
                  onChange={() => setPostViewable(e => !e)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="cycleCategory">Cycle Category</label>
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
            <div className="ac-sections">
              <label htmlFor="cycleStatus">Cycle Status</label>
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
            {
              <>
                <div className="ac-sections">
                  <label htmlFor="cycle-bound">Cycle Boundary Dates</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <DateRangePicker
                      onChange={setCycleBoundries}
                      value={cycleBoundries}
                      maxDetail="month"
                      calendarIcon={null}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="sixmonths">6 Month Language Dates </label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <DateRangePicker
                      onChange={setSixMonthLanguage}
                      value={sixMonthLanguage}
                      maxDetail="month"
                      calendarIcon={null}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="twelve">12 Month Language Dates</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <DateRangePicker
                      onChange={setTwelveMonthLanguage}
                      value={twelveMonthLanguage}
                      maxDetail="month"
                      calendarIcon={null}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="twentyfour">24 Month Language Dates</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <DateRangePicker
                      onChange={setTwentyFourMonthLanguage}
                      value={twentyFourMonthLanguage}
                      maxDetail="month"
                      calendarIcon={null}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="brrd">Bureau Position Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bureauPositionReview ? '' : 'hide'} fa-close`} onClick={() => setBureauPositionReview(null)} />
                    <DatePicker
                      selected={bureauPositionReview}
                      onChange={(date) => setBureauPositionReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bureauPositionReview}
                      minDate={bureauPositionReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bdd">Bid Due Date </label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bidDue ? '' : 'hide'} fa-close`} onClick={() => setBidDue(null)} />
                    <DatePicker
                      selected={bidDue}
                      onChange={(date) => setBidDue(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bidDue}
                      minDate={bidDue}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bpsbrd">Bureau Pre-Season Bid Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bureauPreSeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauPreSeasonBidReview(null)} />
                    <DatePicker
                      selected={bureauPreSeasonBidReview}
                      onChange={(date) => setBureauPreSeasonBidReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bureauPreSeasonBidReview}
                      minDate={bureauPreSeasonBidReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="besbrd">Bureau Early Season Bid Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bureauEarlySeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauEarlySeasonBidReview(null)} />
                    <DatePicker
                      selected={bureauEarlySeasonBidReview}
                      onChange={(date) => setBureauEarlySeasonBidReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bureauEarlySeasonBidReview}
                      minDate={bureauEarlySeasonBidReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bbrd">Bureau Bid Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bureauBidReview ? '' : 'hide'} fa-close`} onClick={() => setBureauBidReview(null)} />
                    <DatePicker
                      selected={bureauBidReview}
                      onChange={(date) => setBureauBidReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bureauBidReview}
                      minDate={bureauBidReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bad">Bid Audit Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bidAudit ? '' : 'hide'} fa-close`} onClick={() => setBidAudit(null)} />
                    <DatePicker
                      selected={bidAudit}
                      onChange={(date) => setBidAudit(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bidAudit}
                      minDate={bidAudit}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bbrd">Bid Book Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bidBookReview ? '' : 'hide'} fa-close`} onClick={() => setBidBookReview(null)} />
                    <DatePicker
                      selected={bidBookReview}
                      onChange={(date) => setBidBookReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bidBookReview}
                      minDate={bidBookReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="bcrd">Bid Count Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${bidCountReview ? '' : 'hide'} fa-close`} onClick={() => setBidCountReview(null)} />
                    <DatePicker
                      selected={bidCountReview}
                      onChange={(date) => setBidCountReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={bidCountReview}
                      minDate={bidCountReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="htf">HTF Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${htfReview ? '' : 'hide'} fa-close`} onClick={() => setHtfReview(null)} />
                    <DatePicker
                      selected={htfReview}
                      onChange={(date) => setHtfReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={htfReview}
                      minDate={htfReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="ocrd">Organization Count Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${organizationCountReview ? '' : 'hide'} fa-close`} onClick={() => setOrganizationCountReview(null)} />
                    <DatePicker
                      selected={organizationCountReview}
                      onChange={(date) => setOrganizationCountReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={organizationCountReview}
                      minDate={organizationCountReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="mds">MDS Review Date</label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${mdsReview ? '' : 'hide'} fa-close`} onClick={() => setMdsReview(null)} />
                    <DatePicker
                      selected={mdsReview}
                      onChange={(date) => setMdsReview(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={mdsReview}
                      minDate={mdsReview}
                    />
                  </span>
                </div>
                <div className="ac-sections">
                  <label htmlFor="abd">Assigned Bidder Date </label>
                  <span className="date-picker-validation-container larger-date-picker">
                    <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                    <FA name="times" className={`${assignedBidder ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidder(null)} />
                    <DatePicker
                      selected={assignedBidder}
                      onChange={(date) => setAssignedBidder(date)}
                      dateFormat={DATE_FORMAT}
                      placeholderText={assignedBidder}
                      minDate={assignedBidder}
                    />
                  </span>
                </div>
              </>
            }
          </form>
          <div>
            <button onClick={saveAC}>Save and Return</button>
            <button onClick={deleteAC}>Delete Assignment Cycle</button>
            <button onClick={postAC} type="submit">Post Open Positions</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </div>
      }
    </Row>
  );
};

CycleSearchCard.propTypes = {
  id: PropTypes.string.isRequired,
  cycle_name: PropTypes.string,
  cycle_status: PropTypes.string,
  cycle_category: PropTypes.string,
  cycle_begin_date: PropTypes.string,
  cycle_end_date: PropTypes.string,
  cycle_excl_position: PropTypes.string,
  cycle_post_view: PropTypes.string,
  isAO: PropTypes.bool,
  onEditModeSearch: PropTypes.func.isRequired,
};

CycleSearchCard.defaultProps = {
  cycle_name: '',
  cycle_status: '',
  cycle_category: '',
  cycle_begin_date: '',
  cycle_end_date: null,
  cycle_excl_position: null,
  cycle_post_view: '',
  isAO: false,
  onEditModeSearch: () => { },
};

export default CycleSearchCard;
