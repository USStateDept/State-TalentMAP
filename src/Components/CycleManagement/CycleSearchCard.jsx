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
    bureaPositionReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidDueDate: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauPreSeasonBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauEarlySeasonBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bureauBidReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidAudit: formatDate('1976-10-01T21:12:12.854000Z'),
    bidBookReview: formatDate('1976-10-01T21:12:12.854000Z'),
    bidCountReview: formatDate('1976-10-01T21:12:12.854000Z'),
    htfReview: formatDate('1976-10-01T21:12:12.854000Z'),
    organizationCountReview: formatDate('1976-10-01T21:12:12.854000Z'),
    mdsReview: formatDate('1976-10-01T21:12:12.854000Z'),
    assignedBidder: formatDate('1976-10-01T21:12:12.854000Z'),
  };

  const cycleLink = `/profile/${isAO ? 'ao' : 'bureau'}/cyclepositionsearch/${id}`;
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);
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
    console.log(userData, id);
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
                      value={cycleBoundries || dummyInfo.cycleBoundary}
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
                      value={sixMonthLanguage || dummyInfo.sixMonthBoundary}
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
                      value={twelveMonthLanguage || dummyInfo.twelveMonthBoundary}
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
                      value={twentyFourMonthLanguage || dummyInfo.twentyFourMonthBoundary}
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
                      placeholderText={id === '' ? 'Select a bureau position review date' : formatDate(dummyInfo.bureaPositionReview)}
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
                      placeholderText={id === '' ? 'Select a bid due date' : formatDate(dummyInfo.bidDueDate)}
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
                      placeholderText={id === '' ? 'Select a bureau pre-season bid review date' : formatDate(dummyInfo.bureauPreSeasonBidReview)}
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
                      placeholderText={id === '' ? 'Select a bureau early season bid review date' : formatDate(dummyInfo.bureauEarlySeasonBidReview)}
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
                      placeholderText={id === '' ? 'Select a bureau bid review date' : formatDate(dummyInfo.bureauBidReview)}
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
                      placeholderText={id === '' ? 'Select a bid audit date' : formatDate(dummyInfo.bidAudit)}
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
                      placeholderText={id === '' ? 'Select a bid book review date' : formatDate(dummyInfo.bidBookReview)}
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
                      placeholderText={id === '' ? 'Select a bid count review date' : formatDate(dummyInfo.bidCountReview)}
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
                      placeholderText={id === '' ? 'Select a HTF review date' : formatDate(dummyInfo.htfReview)}
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
                      placeholderText={id === '' ? 'Select a organization count review date' : formatDate(dummyInfo.organizationCountReview)}
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
                      placeholderText={id === '' ? 'Select a MDS review date' : formatDate(dummyInfo.mdsReview)}
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
                      placeholderText={id === '' ? 'Select a assigned bidder date' : formatDate(dummyInfo.assignedBidder)}
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
};

export default CycleSearchCard;
