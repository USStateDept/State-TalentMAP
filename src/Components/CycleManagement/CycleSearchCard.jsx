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
} from 'actions/assignmentCycle';
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

  const dummyInfo = {
    assignmentCycle: 'This is a dummy assignment cycle',
    cycleCategory: 'Summer',
    cycleStatus: 'Winter',
    cycleBoundary: [formatDate('1976-10-01T21:12:12.854000Z'), formatDate('2014-31-12T21:12:12.854000Z')],
    sixMonthBoundary: [formatDate('1976-11-11T21:12:12.854000Z'), formatDate('2022-31-17T21:12:12.854000Z')],
    twelveMonthBoundary: [formatDate('2005-10-25T21:12:12.854000Z'), formatDate('2018-31-14T21:12:12.854000Z')],
    twentyFourMonthBoundary: [formatDate('2003-10-22T21:12:12.854000Z'), formatDate('2014-31-22T21:12:12.854000Z')],
    bureaPositionReview: new Date('Tue May 25 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bidDueDate: new Date('Tue Aug 07 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bureauPreSeasonBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bureauEarlySeasonBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bureauBidReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bidAudit: new Date('Tue Sep 22 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bidBookReview: new Date('Tue Oct 11 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    bidCountReview: new Date('Tue Jan 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    htfReview: new Date('Tue Dec 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    organizationCountReview: new Date('Tue Aug 29 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    mdsReview: new Date('Tue Aug 14 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
    assignedBidder: new Date('Tue Feb 22 2023 00:00:00 GMT-0500 (Central Daylight Time)'),
  };

  const cycleLink = `/profile/${isAO ? 'ao' : 'bureau'}/cyclepositionsearch/${id}`;
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);
  const [assignmentCycle, setAssignmentCycle] = useState(dummyInfo.assignmentCycle || 'Select an assignment cycle');
  const [cycleCategory, setCycleCategory] = useState(dummyInfo.cycleCategory || 'Fall');
  const [cycleStatus, setCycleStatus] = useState(dummyInfo.cycleStatus || 'Winter');
  const [exclusivePositions, setExclusivePositions]
    = useState(dummyInfo.exclusivePositions || false);
  const [postViewable, setPostViewable] = useState(dummyInfo.postViewable || false);
  const [cycleBoundries, setCycleBoundries] = useState(dummyInfo.cycleBoundary || null);
  const [sixMonthLanguage, setSixMonthLanguage] = useState(dummyInfo.sixMonthBoundary || null);
  const [twelveMonthLanguage, setTwelveMonthLanguage]
    = useState(dummyInfo.twelveMonthBoundary || null);
  const [twentyFourMonthLanguage, setTwentyFourMonthLanguage]
    = useState(dummyInfo.twelveMonthBoundary || null);
  const [bureauPositionReview, setBureauPositionReview] = useState(dummyInfo.bureaPositionReview || 'Select a bureau position review date');
  const [bidDue, setBidDue] = useState(dummyInfo.bidDueDate || 'Select a bid due date');
  const [bureauPreSeasonBidReview, setBureauPreSeasonBidReview] = useState(dummyInfo.bureauPreSeasonBidReview || 'Select a bureau pre-season bid review date');
  const [bureauEarlySeasonBidReview, setBureauEarlySeasonBidReview] = useState(dummyInfo.bureauEarlySeasonBidReview || 'Select a bureau early season bid review date');
  const [bureauBidReview, setBureauBidReview] = useState(dummyInfo.bureauBidReview || 'Select a bureau bid review date');
  const [bidAudit, setBidAudit] = useState(dummyInfo.bidAudit || 'Select a bid audit date');
  const [bidBookReview, setBidBookReview] = useState(dummyInfo.bidBookReview || 'Select a bid book review date');
  const [bidCountReview, setBidCountReview] = useState(dummyInfo.bidCountReview || 'Select a bid count review date');
  const [htfReview, setHtfReview] = useState(dummyInfo.htfReview || 'Select a HTF review date');
  const [organizationCountReview, setOrganizationCountReview] = useState(dummyInfo.organizationCountReview || 'Select a organization count review date');
  const [mdsReview, setMdsReview] = useState(dummyInfo.mdsReview || 'Select a MDS review date');
  const [assignedBidder, setAssignedBidder] = useState(dummyInfo.assignedBidder || 'Select a assigned bidder date');
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const DATE_FORMAT = 'MMMM d, yyyy';

  const seasonOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
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
            {<Link to={cycleLink}>
              View Cycle Positions
            </Link>}
            { isSuperUser &&
            <div className="cyc-admin-link">
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
                  : <span>Close</span>
                }
              </Link>
            </div>
            }
          </span>
        </Column>
      </Row>
      {edit &&
          <form className="assignment-cycle-form">
            <div>
              <label className="text-area-ac" htmlFor="assignmentCycle">Assignment Cycle</label>
              <span className="bs-validation-container">
                <TextareaAutosize
                  maxlength="255"
                  name="description"
                  placeholder="Please provide a description of the assignment cycle."
                  defaultValue={id === '' ? assignmentCycle : dummyInfo.assignmentCycle}
                  onChange={(e) => setAssignmentCycle(e.target.value)}
                />
              </span>
            </div>
            <div>
              <label htmlFor="cycleCategory">Cycle Category</label>
              <span className="bs-validation-container">
                <select
                  id="cycleCategory"
                  defaultValue="None Selected"
                  onChange={(e) => setCycleCategory(e.target.value)}
                  value={id === '' ? cycleCategory : dummyInfo.cycleCategory}
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
              <label htmlFor="cycleStatus">Cycle Status</label>
              <span className="bs-validation-container">
                <select
                  id="cycleStatus"
                  defaultValue="None Selected"
                  onChange={(e) => setCycleStatus(e.target.value)}
                  value={id === '' ? cycleStatus : dummyInfo.cycleStatus}
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
            <div>
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
            {
              <>
                <div>
                  <dt>Cycle Boundary Dates</dt>
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
                <div>
                  <dt>6 Month Language Dates </dt>
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
                <div>
                  <dt>12 Month Language Dates</dt>
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
                <div>
                  <dt>24 Month Language Dates</dt>
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
                <div>
                  <dt>Bureau Position Review Date</dt>
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
                <div>
                  <dt>Bid Due Date </dt>
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
                <div>
                  <dt>Bureau Pre-Season Bid Review Date</dt>
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
                <div>
                  <dt>Bureau Early Season Bid Review Date</dt>
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
                <div>
                  <dt>Bureau Bid Review Date</dt>
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
                <div>
                  <dt>Bid Audit Date</dt>
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
                <div>
                  <dt>Bid Book Review Date</dt>
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
                <div>
                  <dt>Bid Count Review Date</dt>
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
                <div>
                  <dt>HTF Review Date</dt>
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
                <div>
                  <dt>Organization Count Review Date</dt>
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
                <div>
                  <dt>MDS Review Date</dt>
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
                <div>
                  <dt>Assigned Bidder Date </dt>
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
            <button onClick={saveAC}>Save and Return</button>
            <button onClick={deleteAC}>Delete Assignment Cycle</button>
            <button onClick={postAC} type="submit">Post Open Positions</button>
            <button onClick={cancel}>Cancel</button>
          </form>
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
  onEditModeSearch: () => {},
};

export default CycleSearchCard;
