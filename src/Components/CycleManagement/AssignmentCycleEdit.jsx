/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import TextareaAutosize from 'react-textarea-autosize';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import swal from '@sweetalert/with-react';
import FA from 'react-fontawesome';
import Spinner from 'Components/Spinner';
import CheckBox from 'Components/CheckBox';
import Alert from 'Components/Alert/Alert';
import TabbedCard from 'Components/TabbedCard';
import BackButton from 'Components/BackButton';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import {
  cycleManagementAssignmentCycleFetchData,
  cycleManagementDeleteCycle,
  cycleManagementDeleteCycleSuccess,
  cycleManagementPostOpenPositions,
  cycleManagementUpdateCycle,
  cycleManagementUpdateCycleSuccess,
} from 'actions/cycleManagement';
import { userHasPermissions } from 'utilities';
import { history } from '../../store';

const AssignmentCycleEdit = ({ isAO, match }) => {
  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);
  const assignmentCycleData = useSelector(state => state.cycleManagementAssignmentCycle);
  const assignmentCycleLoading = useSelector(state => state.cycleManagementAssignmentCycleFetchDataLoading);
  const assignmentCycleError = useSelector(state => state.cycleManagementAssignmentCycleFetchDataErrored);
  const assignmentCycleUpdateSuccess = useSelector(state => state.cycleManagementAssignmentCycleUpdateSuccess);
  const assignmentCycleDeleteSuccess = useSelector(state => state.cycleManagementDelete);

  const [editMode, setEditMode] = useState(false);
  const [assignmentCycle, setCycleName] = useState(assignmentCycleData?.cycle_name);
  const [cycleCategory, setCycleCategory] = useState(assignmentCycleData?.cycle_category);
  const [cycleStatus, setCycleStatus] = useState(assignmentCycleData?.cycle_status);
  const [exclusivePosition, setExclusivePosition] = useState(assignmentCycleData?.exclusive_position);
  const [postViewable, setPostViewable] = useState(assignmentCycleData?.post_viewable);

  const [cycleBoundries, setCycleBoundries] = useState([assignmentCycleData?.dates_mapping?.CYCLE?.begin_date, assignmentCycleData?.dates_mapping?.CYCLE?.end_date]);
  const [sixMonthLanguage, setSixMonthLanguage] = useState([assignmentCycleData?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['6MOLANG']?.end_date]);
  const [twelveMonthLanguage, setTwelveMonthLanguage] = useState([assignmentCycleData?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['12MOLANG']?.end_date]);
  const [twentyFourMonthLanguage, setTwentyFourMonthLanguage] = useState([assignmentCycleData?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['24MOLANG']?.end_date]);

  const [bidAudit, setBidAudit] = useState(assignmentCycleData?.dates_mapping?.BIDAUDIT?.begin_date);
  const [bidBookReview, setBidBook] = useState(assignmentCycleData?.dates_mapping?.BIDBOOK?.begin_date);
  const [bidCountReview, setBidCount] = useState(assignmentCycleData?.dates_mapping?.BIDCOUNT?.begin_date);
  const [bidDue, setBidDue] = useState(assignmentCycleData?.dates_mapping?.BIDDUE?.begin_date);
  const [htfReview, setBidHtf] = useState(assignmentCycleData?.dates_mapping?.BIDHTF?.begin_date);
  const [mdsReview, setBidMds] = useState(assignmentCycleData?.dates_mapping?.BIDMDS?.begin_date);
  const [organizationCountReview, setBidOrg] = useState(assignmentCycleData?.dates_mapping?.BIDORG?.begin_date);
  const [biddingStart, setBidStart] = useState(assignmentCycleData?.dates_mapping?.BIDSTART?.begin_date);
  const [bureauBidReview, setBurBid] = useState(assignmentCycleData?.dates_mapping?.BURBID?.begin_date);
  const [bureauEarlySeasonBidReview, setBurEarly] = useState(assignmentCycleData?.dates_mapping?.BUREARLY?.begin_date);
  const [bureauPositionReview, setBurPos] = useState(assignmentCycleData?.dates_mapping?.BURPOS?.begin_date);
  const [bureauPreSeasonBidReview, setBurPrebd] = useState(assignmentCycleData?.dates_mapping?.BURPREBD?.begin_date);
  const [assignedBidder, setAssignedBidderDate] = useState(assignmentCycleData?.dates_mapping?.PANLASG?.begin_date);

  const cycleCategories = assignmentCycleData?.cycle_category_reference || [];
  const cycleStatuses = assignmentCycleData?.cycle_status_reference || [];

  useEffect(() => {
    dispatch(cycleManagementAssignmentCycleFetchData(match?.params?.id));
  }, []);

  useEffect(() => {
    if (assignmentCycleUpdateSuccess) {
      setEditMode(false);
      dispatch(cycleManagementUpdateCycleSuccess(false));
      dispatch(cycleManagementAssignmentCycleFetchData(match?.params?.id));
    }
  }, [assignmentCycleUpdateSuccess]);

  useEffect(() => {
    if (assignmentCycleDeleteSuccess) {
      dispatch(cycleManagementDeleteCycleSuccess(false));
      history.push(`/profile/${isAO ? 'ao' : 'bureau'}/cyclemanagement`);
    }
  }, [assignmentCycleDeleteSuccess]);

  useEffect(() => {
    setCycleName(assignmentCycleData?.cycle_name);
    setCycleCategory(assignmentCycleData?.cycle_category);
    setCycleStatus(assignmentCycleData?.cycle_status);
    setExclusivePosition(assignmentCycleData?.exclusive_position);
    setPostViewable(assignmentCycleData?.post_viewable);
    setCycleBoundries([assignmentCycleData?.dates_mapping?.CYCLE?.begin_date, assignmentCycleData?.dates_mapping?.CYCLE?.end_date]);
    setSixMonthLanguage([assignmentCycleData?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['6MOLANG']?.end_date]);
    setTwelveMonthLanguage([assignmentCycleData?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['12MOLANG']?.end_date]);
    setTwentyFourMonthLanguage([assignmentCycleData?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['24MOLANG']?.end_date]);
    setBidAudit(assignmentCycleData?.dates_mapping?.BIDAUDIT?.begin_date);
    setBidBook(assignmentCycleData?.dates_mapping?.BIDBOOK?.begin_date);
    setBidCount(assignmentCycleData?.dates_mapping?.BIDCOUNT?.begin_date);
    setBidDue(assignmentCycleData?.dates_mapping?.BIDDUE?.begin_date);
    setBidHtf(assignmentCycleData?.dates_mapping?.BIDHTF?.begin_date);
    setBidMds(assignmentCycleData?.dates_mapping?.BIDMDS?.begin_date);
    setBidOrg(assignmentCycleData?.dates_mapping?.BIDORG?.begin_date);
    setBidStart(assignmentCycleData?.dates_mapping?.BIDSTART?.begin_date);
    setBurBid(assignmentCycleData?.dates_mapping?.BURBID?.begin_date);
    setBurEarly(assignmentCycleData?.dates_mapping?.BUREARLY?.begin_date);
    setBurPos(assignmentCycleData?.dates_mapping?.BURPOS?.begin_date);
    setBurPrebd(assignmentCycleData?.dates_mapping?.BURPREBD?.begin_date);
    setAssignedBidderDate(assignmentCycleData?.dates_mapping?.PANLASG?.begin_date);
  }, [assignmentCycleLoading]);

  const disableSave = assignmentCycle?.length
    && cycleBoundries
    && sixMonthLanguage
    && twelveMonthLanguage
    && twentyFourMonthLanguage
    && bidAudit
    && bidBookReview
    && bidCountReview
    && bidDue
    && htfReview
    && mdsReview
    && organizationCountReview
    && biddingStart
    && bureauBidReview
    && bureauEarlySeasonBidReview
    && bureauPositionReview
    && bureauPreSeasonBidReview
    && assignedBidder;

  const saveAC = (e) => {
    e.preventDefault();
    const cycleData = {
      cycleId: match?.params?.id,
      assignmentCycle,
      cycleCategory,
      cycleStatus,
      exclusivePosition,
      postViewable,
      cycleBoundries,
      sixMonthLanguage,
      twelveMonthLanguage,
      twentyFourMonthLanguage,
      bidAudit,
      bidBookReview,
      bidCountReview,
      bidDue,
      htfReview,
      mdsReview,
      organizationCountReview,
      biddingStart,
      bureauBidReview,
      bureauEarlySeasonBidReview,
      bureauPositionReview,
      bureauPreSeasonBidReview,
      assignedBidder,
      stampDate: assignmentCycleData?.last_updated,
      stampId: assignmentCycleData?.last_updated_id,
      stampStrings: assignmentCycleData?.update_timestamps,
      stampIdStrings: assignmentCycleData?.id_timestamps,
    };
    dispatch(cycleManagementUpdateCycle(cycleData));
  };

  const postOpenPositions = () => {
    swal.close();
    dispatch(cycleManagementPostOpenPositions(match?.params?.id));
  };

  const deleteAssignmentCycle = () => {
    swal.close();
    const cycleDeleteData = {
      cycleId: match?.params?.id,
      stampDate: assignmentCycleData?.last_updated,
      stampId: assignmentCycleData?.last_updated_id,
    };
    dispatch(cycleManagementDeleteCycle(cycleDeleteData));
  };

  const onCancelRequest = () => {
    swal.close();
    setCycleName(assignmentCycleData?.cycle_name);
    setCycleCategory(assignmentCycleData?.cycle_category);
    setCycleStatus(assignmentCycleData?.cycle_status);
    setExclusivePosition(assignmentCycleData?.exclusive_position);
    setPostViewable(assignmentCycleData?.post_viewable);
    setCycleBoundries([assignmentCycleData?.dates_mapping?.CYCLE?.begin_date, assignmentCycleData?.dates_mapping?.CYCLE?.end_date]);
    setSixMonthLanguage([assignmentCycleData?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['6MOLANG']?.end_date]);
    setTwelveMonthLanguage([assignmentCycleData?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['12MOLANG']?.end_date]);
    setTwentyFourMonthLanguage([assignmentCycleData?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycleData?.dates_mapping?.['24MOLANG']?.end_date]);
    setBidAudit(assignmentCycleData?.dates_mapping?.BIDAUDIT?.begin_date);
    setBidBook(assignmentCycleData?.dates_mapping?.BIDBOOK?.begin_date);
    setBidCount(assignmentCycleData?.dates_mapping?.BIDCOUNT?.begin_date);
    setBidDue(assignmentCycleData?.dates_mapping?.BIDDUE?.begin_date);
    setBidHtf(assignmentCycleData?.dates_mapping?.BIDHTF?.begin_date);
    setBidMds(assignmentCycleData?.dates_mapping?.BIDMDS?.begin_date);
    setBidOrg(assignmentCycleData?.dates_mapping?.BIDORG?.begin_date);
    setBidStart(assignmentCycleData?.dates_mapping?.BIDSTART?.begin_date);
    setBurBid(assignmentCycleData?.dates_mapping?.BURBID?.begin_date);
    setBurEarly(assignmentCycleData?.dates_mapping?.BUREARLY?.begin_date);
    setBurPos(assignmentCycleData?.dates_mapping?.BURPOS?.begin_date);
    setBurPrebd(assignmentCycleData?.dates_mapping?.BURPREBD?.begin_date);
    setAssignedBidderDate(assignmentCycleData?.dates_mapping?.PANLASG?.begin_date);
    setEditMode(false);
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

  const postAC = (e) => {
    e.preventDefault();
    swal({
      title: 'Post Open Positions',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{'Do you want to Post the Open Positions for this Assignment Cycle?'}</span>
            <div>
              <span>{'The Cycle must be Open in order to do so.'}</span>
            </div>
          </div>
          <div className="modal-controls">
            <button onClick={postOpenPositions}>Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
          </div>
        </div>
      ),
    });
  };

  const deleteAC = (e) => {
    e.preventDefault();
    swal({
      title: 'Delete Assignment Cycle',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>{'Are you sure you want to delete this Assignment Cycle?'}</span>
          </div>
          <div className="modal-controls">
            <button onClick={deleteAssignmentCycle}>Yes</button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>No</button>
          </div>
        </div>
      ),
    });
  };


  const readView = (
    <>
      <div className="ace-heading">
        <span>Assignment Cycle: {assignmentCycle}</span>
        <span>
          {isSuperUser &&
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setEditMode(!editMode);
              }}
            >
              <div>
                <FA className="fa-solid fa-pencil" />
                  Edit
              </div>
            </Link>
          }
        </span>
      </div>

      <div className="assignment-cycle-form">
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Cycle Category</label>
          <span>
            { cycleCategories?.find(x => x?.value === cycleCategory)?.label || 'None Listed' }
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Cycle Status</label>
          <span>
            { cycleStatuses?.find(x => x?.value === cycleStatus)?.label || 'None Listed' }
          </span>
        </div>

        <div className="ac-sections">
          <span className="ac-validation-container">
            <CheckBox
              id="exclusivePosition"
              name="exclusivePosition"
              value={exclusivePosition === 'Y'}
              overrideLifecycle
            />
            <label htmlFor="exclusivePosition">Exclusive Position</label>
          </span>
          <span className="ac-validation-container">
            <CheckBox
              id="postViewable"
              name="postViewable"
              value={postViewable === 'Y'}
              overrideLifecycle
            />
            <label htmlFor="postViewable">Post Viewable</label>
          </span>
        </div>

        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Cycle Boundary Dates</label>
          <span>{cycleBoundries?.[0]} - {cycleBoundries?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">6 Month Language Dates</label>
          <span>{sixMonthLanguage?.[0]} - {sixMonthLanguage?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">12 Month Language Dates</label>
          <span>{twelveMonthLanguage?.[0]} - {twelveMonthLanguage?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">24 Month Language Dates</label>
          <span>{twentyFourMonthLanguage?.[0]} - {twentyFourMonthLanguage?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Position Review Date</label>
          <span>{bureauPositionReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bidding Start Date</label>
          <span>{biddingStart}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Due Date</label>
          <span>{bidDue}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Pre-Season Bid Review Date</label>
          <span>{bureauPreSeasonBidReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Early Season Bid Review Date</label>
          <span>{bureauEarlySeasonBidReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Bid Review Date</label>
          <span>{bureauBidReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Audit Date</label>
          <span>{bidAudit}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Book Review Date</label>
          <span>{bidBookReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Count Review Date</label>
          <span>{bidCountReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">HTF Review Date</label>
          <span>{htfReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Organization Count Review Date</label>
          <span>{organizationCountReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">MDS Review Date</label>
          <span>{mdsReview}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Assigned Bidder Date</label>
          <span>{assignedBidder}</span>
        </div>
      </div>
    </>
  );


  const editView = () => (
    <>
      <form className="assignment-cycle-form" >
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Assignment Cycle</label>
          <span className="bs-validation-container">
            <TextareaAutosize
              maxlength="255"
              name="description"
              placeholder="Please provide a description of the assignment cycle."
              defaultValue={assignmentCycle}
              onChange={(e) => setCycleName(e.target.value)}
            />
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="cycleCategory">Cycle Category</label>
          <span className="bs-validation-container">
            <select
              id="cycleCategory"
              defaultValue={cycleCategory.value}
              onChange={(e) => setCycleCategory(e.target.value)}
              value={cycleCategory.value}
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
              defaultValue={cycleStatus.value}
              onChange={(e) => setCycleStatus(e.target.value)}
              value={cycleStatus.value}
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

        <div className="ac-sections">
          <span className="ac-validation-container">
            <CheckBox
              id="exclusivePosition"
              name="exclusivePosition"
              value={exclusivePosition === 'Y'}
              onCheckBoxClick={e => setExclusivePosition(e ? 'Y' : 'N')}
            />
            <label htmlFor="exclusoivePositions">Exclusive Position</label>
          </span>
          <span className="ac-validation-container">
            <CheckBox
              id="postViewable"
              name="postViewable"
              value={postViewable === 'Y'}
              onCheckBoxClick={e => setPostViewable(e ? 'Y' : 'N')}
            />
            <label htmlFor="postViewable">Post Viewable</label>
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
                <FA name="times" className={`${bureauPositionReview ? '' : 'hide'} fa-close`} onClick={() => setBurPos('')} />
                <DatePicker
                  selected={bureauPositionReview && new Date(bureauPositionReview)}
                  onChange={(date) => setBurPos(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bdd">Bidding Start Date </label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${biddingStart ? '' : 'hide'} fa-close`} onClick={() => setBidStart('')} />
                <DatePicker
                  selected={biddingStart && new Date(biddingStart)}
                  onChange={(date) => setBidStart(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bdd">Bid Due Date </label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidDue ? '' : 'hide'} fa-close`} onClick={() => setBidDue('')} />
                <DatePicker
                  selected={bidDue && new Date(bidDue)}
                  onChange={(date) => setBidDue(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bpsbrd">Bureau Pre-Season Bid Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauPreSeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBurPrebd('')} />
                <DatePicker
                  selected={bureauPreSeasonBidReview && new Date(bureauPreSeasonBidReview)}
                  onChange={(date) => setBurPrebd(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="besbrd">Bureau Early Season Bid Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauEarlySeasonBidReview ? '' : 'hide'} fa-close`} onClick={() => setBurEarly('')} />
                <DatePicker
                  selected={bureauEarlySeasonBidReview && new Date(bureauEarlySeasonBidReview)}
                  onChange={(date) => setBurEarly(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bbrd">Bureau Bid Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bureauBidReview ? '' : 'hide'} fa-close`} onClick={() => setBurBid('')} />
                <DatePicker
                  selected={bureauBidReview && new Date(bureauBidReview)}
                  onChange={(date) => setBurBid(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bad">Bid Audit Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidAudit ? '' : 'hide'} fa-close`} onClick={() => setBidAudit('')} />
                <DatePicker
                  selected={bidAudit && new Date(bidAudit)}
                  onChange={(date) => setBidAudit(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bbrd">Bid Book Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidBookReview ? '' : 'hide'} fa-close`} onClick={() => setBidBook('')} />
                <DatePicker
                  selected={bidBookReview && new Date(bidBookReview)}
                  onChange={(date) => setBidBook(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bcrd">Bid Count Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidCountReview ? '' : 'hide'} fa-close`} onClick={() => setBidCount('')} />
                <DatePicker
                  selected={bidCountReview && new Date(bidCountReview)}
                  onChange={(date) => setBidCount(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="htf">HTF Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${htfReview ? '' : 'hide'} fa-close`} onClick={() => setBidHtf('')} />
                <DatePicker
                  selected={htfReview && new Date(htfReview)}
                  onChange={(date) => setBidHtf(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="ocrd">Organization Count Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${organizationCountReview ? '' : 'hide'} fa-close`} onClick={() => setBidOrg('')} />
                <DatePicker
                  selected={organizationCountReview && new Date(organizationCountReview)}
                  onChange={(date) => setBidOrg(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="mds">MDS Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${mdsReview ? '' : 'hide'} fa-close`} onClick={() => setBidMds('')} />
                <DatePicker
                  selected={mdsReview && new Date(mdsReview)}
                  onChange={(date) => setBidMds(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="abd">Assigned Bidder Date </label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${assignedBidder ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidderDate('')} />
                <DatePicker
                  selected={assignedBidder && new Date(assignedBidder)}
                  onChange={(date) => setAssignedBidderDate(date)}
                />
              </span>
            </div>
          </>
        }
      </form>
      <div>
        <button onClick={saveAC} disabled={!disableSave}>Save and Return</button>
        <button onClick={deleteAC}>Delete Assignment Cycle</button>
        <button onClick={postAC} type="submit">Post Open Positions</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </>
  );


  const getOverlay = () => {
    let overlay;
    if (assignmentCycleLoading) {
      overlay = <Spinner type="standard-center" class="homepage-position-results" size="big" />;
    } else if (assignmentCycleError) {
      overlay = <Alert type="error" title="Error displaying Assignment Cycle" messages={[{ body: 'Please try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };


  return (
    <div className="cycle-management-page position-search">
      <div className="position-search--header">
        <BackButton />
        <div className="expanded-content pt-20">
          <ProfileSectionTitle title="Cycle Management" icon="cogs" className="xl-icon" />
        </div>
      </div>
      {
        getOverlay() ||
        <div className="ace-wrapper">
          <TabbedCard
            tabs={[{
              text: 'Cycle Information',
              value: 'INFORMATION',
              content: editMode ? editView() : readView,
            }]}
          />
        </div>
      }
    </div>
  );
};

AssignmentCycleEdit.propTypes = {
  isAO: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

AssignmentCycleEdit.defaultProps = {
  match: {},
  isAO: false,
};

export default withRouter(AssignmentCycleEdit);
