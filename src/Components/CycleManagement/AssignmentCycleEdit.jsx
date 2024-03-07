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
  const assignmentCycle = useSelector(state => state.cycleManagementAssignmentCycle);
  const assignmentCycleLoading = useSelector(state => state.cycleManagementAssignmentCycleFetchDataLoading);
  const assignmentCycleError = useSelector(state => state.cycleManagementAssignmentCycleFetchDataErrored);
  const assignmentCycleUpdateSuccess = useSelector(state => state.cycleManagementAssignmentCycleUpdateSuccess);
  const assignmentCycleDeleteSuccess = useSelector(state => state.cycleManagementDelete);

  const [editMode, setEditMode] = useState(false);
  const [cycleName, setCycleName] = useState(assignmentCycle?.cycle_name);
  const [cycleCategory, setCycleCategory] = useState(assignmentCycle?.cycle_category);
  const [cycleStatus, setCycleStatus] = useState(assignmentCycle?.cycle_status);
  const [exclusivePosition, setExclusivePosition] = useState(assignmentCycle?.exclusive_position);
  const [postViewable, setPostViewable] = useState(assignmentCycle?.post_viewable);

  const [cycleDates, setCycleDates] = useState([assignmentCycle?.dates_mapping?.CYCLE?.begin_date, assignmentCycle?.dates_mapping?.CYCLE?.end_date]);
  const [sixMonthLang, setSixMonthLang] = useState([assignmentCycle?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['6MOLANG']?.end_date]);
  const [twelveMonthLang, setTwelveMonthLang] = useState([assignmentCycle?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['12MOLANG']?.end_date]);
  const [twentyFourMonthLang, setTwentyFourMonthLang] = useState([assignmentCycle?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['24MOLANG']?.end_date]);

  const [bidAudit, setBidAudit] = useState(assignmentCycle?.dates_mapping?.BIDAUDIT?.begin_date);
  const [bidBook, setBidBook] = useState(assignmentCycle?.dates_mapping?.BIDBOOK?.begin_date);
  const [bidCount, setBidCount] = useState(assignmentCycle?.dates_mapping?.BIDCOUNT?.begin_date);
  const [bidDue, setBidDue] = useState(assignmentCycle?.dates_mapping?.BIDDUE?.begin_date);
  const [bidHtf, setBidHtf] = useState(assignmentCycle?.dates_mapping?.BIDHTF?.begin_date);
  const [bidMds, setBidMds] = useState(assignmentCycle?.dates_mapping?.BIDMDS?.begin_date);
  const [bidOrg, setBidOrg] = useState(assignmentCycle?.dates_mapping?.BIDORG?.begin_date);
  const [bidStart, setBidStart] = useState(assignmentCycle?.dates_mapping?.BIDSTART?.begin_date);
  const [burBid, setBurBid] = useState(assignmentCycle?.dates_mapping?.BURBID?.begin_date);
  const [burEarly, setBurEarly] = useState(assignmentCycle?.dates_mapping?.BUREARLY?.begin_date);
  const [burPos, setBurPos] = useState(assignmentCycle?.dates_mapping?.BURPOS?.begin_date);
  const [burPrebd, setBurPrebd] = useState(assignmentCycle?.dates_mapping?.BURPREBD?.begin_date);
  const [assignedBidderDate, setAssignedBidderDate] = useState(assignmentCycle?.dates_mapping?.PANLASG?.begin_date);

  const cycleCategories = assignmentCycle?.cycle_category_reference || [];
  const cycleStatuses = assignmentCycle?.cycle_status_reference || [];

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
    setCycleName(assignmentCycle?.cycle_name);
    setCycleCategory(assignmentCycle?.cycle_category);
    setCycleStatus(assignmentCycle?.cycle_status);
    setExclusivePosition(assignmentCycle?.exclusive_position);
    setPostViewable(assignmentCycle?.post_viewable);
    setCycleDates([assignmentCycle?.dates_mapping?.CYCLE?.begin_date, assignmentCycle?.dates_mapping?.CYCLE?.end_date]);
    setSixMonthLang([assignmentCycle?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['6MOLANG']?.end_date]);
    setTwelveMonthLang([assignmentCycle?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['12MOLANG']?.end_date]);
    setTwentyFourMonthLang([assignmentCycle?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['24MOLANG']?.end_date]);
    setBidAudit(assignmentCycle?.dates_mapping?.BIDAUDIT?.begin_date);
    setBidBook(assignmentCycle?.dates_mapping?.BIDBOOK?.begin_date);
    setBidCount(assignmentCycle?.dates_mapping?.BIDCOUNT?.begin_date);
    setBidDue(assignmentCycle?.dates_mapping?.BIDDUE?.begin_date);
    setBidHtf(assignmentCycle?.dates_mapping?.BIDHTF?.begin_date);
    setBidMds(assignmentCycle?.dates_mapping?.BIDMDS?.begin_date);
    setBidOrg(assignmentCycle?.dates_mapping?.BIDORG?.begin_date);
    setBidStart(assignmentCycle?.dates_mapping?.BIDSTART?.begin_date);
    setBurBid(assignmentCycle?.dates_mapping?.BURBID?.begin_date);
    setBurEarly(assignmentCycle?.dates_mapping?.BUREARLY?.begin_date);
    setBurPos(assignmentCycle?.dates_mapping?.BURPOS?.begin_date);
    setBurPrebd(assignmentCycle?.dates_mapping?.BURPREBD?.begin_date);
    setAssignedBidderDate(assignmentCycle?.dates_mapping?.PANLASG?.begin_date);
  }, [assignmentCycleLoading]); // but why?


  const saveAC = (e) => {
    e.preventDefault();
    const cycleData = {
      cycleId: match?.params?.id,
      assignmentCycle: cycleName,
      cycleCategory: cycleCategory?.value,
      cycleStatus: cycleStatus?.value,
      exclusivePosition,
      postViewable,
      cycleBoundries: cycleDates,
      sixMonthLanguage: sixMonthLang,
      twelveMonthLanguage: twelveMonthLang,
      twentyFourMonthLanguage: twentyFourMonthLang,
      bidAudit,
      bidBookReview: bidBook,
      bidCountReview: bidCount,
      bidDue,
      htfReview: bidHtf,
      mdsReview: bidMds,
      organizationCountReview: bidOrg,
      biddingStart: bidStart,
      bureauBidReview: burBid,
      bureauEarlySeasonBidReview: burEarly,
      bureauPositionReview: burPos,
      bureauPreSeasonBidReview: burPrebd,
      assignedBidder: assignedBidderDate,
      stampDate: assignmentCycle?.last_updated,
      stampId: assignmentCycle?.last_updated_id,
      stampStrings: assignmentCycle?.update_timestamps,
      stampIdStrings: assignmentCycle?.id_timestamps,
    };
    dispatch(cycleManagementUpdateCycle(cycleData));
  };

  const postOpenPositions = () => {
    swal.close();
    dispatch(cycleManagementPostOpenPositions(match?.params?.id));
  };

  const deleteAssignmentCycle = () => {
    swal.close();
    dispatch(cycleManagementDeleteCycle(match?.params?.id));
  };

  const onCancelRequest = () => {
    swal.close();
    setCycleName(assignmentCycle?.cycle_name);
    setCycleCategory(assignmentCycle?.cycle_category);
    setCycleStatus(assignmentCycle?.cycle_status);
    setExclusivePosition(assignmentCycle?.exclusive_position);
    setPostViewable(assignmentCycle?.post_viewable);
    setCycleDates([assignmentCycle?.dates_mapping?.CYCLE?.begin_date, assignmentCycle?.dates_mapping?.CYCLE?.end_date]);
    setSixMonthLang([assignmentCycle?.dates_mapping?.['6MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['6MOLANG']?.end_date]);
    setTwelveMonthLang([assignmentCycle?.dates_mapping?.['12MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['12MOLANG']?.end_date]);
    setTwentyFourMonthLang([assignmentCycle?.dates_mapping?.['24MOLANG']?.begin_date, assignmentCycle?.dates_mapping?.['24MOLANG']?.end_date]);
    setBidAudit(assignmentCycle?.dates_mapping?.BIDAUDIT?.begin_date);
    setBidBook(assignmentCycle?.dates_mapping?.BIDBOOK?.begin_date);
    setBidCount(assignmentCycle?.dates_mapping?.BIDCOUNT?.begin_date);
    setBidDue(assignmentCycle?.dates_mapping?.BIDDUE?.begin_date);
    setBidHtf(assignmentCycle?.dates_mapping?.BIDHTF?.begin_date);
    setBidMds(assignmentCycle?.dates_mapping?.BIDMDS?.begin_date);
    setBidOrg(assignmentCycle?.dates_mapping?.BIDORG?.begin_date);
    setBidStart(assignmentCycle?.dates_mapping?.BIDSTART?.begin_date);
    setBurBid(assignmentCycle?.dates_mapping?.BURBID?.begin_date);
    setBurEarly(assignmentCycle?.dates_mapping?.BUREARLY?.begin_date);
    setBurPos(assignmentCycle?.dates_mapping?.BURPOS?.begin_date);
    setBurPrebd(assignmentCycle?.dates_mapping?.BURPREBD?.begin_date);
    setAssignedBidderDate(assignmentCycle?.dates_mapping?.PANLASG?.begin_date);
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
        <span>Assignment Cycle: {cycleName}</span>
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
          <span>{cycleCategory?.label}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="exclusivePosition">Exclusive Position</label>
          <span className="bs-validation-container">
            <CheckBox
              id="exclusivePosition"
              name="exclusivePosition"
              value={exclusivePosition === 'Y'}
              overrideLifecycle
            />
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="postViewable">Post Viewable</label>
          <span className="bs-validation-container">
            <CheckBox
              id="postViewable"
              name="postViewable"
              value={postViewable === 'Y'}
              overrideLifecycle
            />
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Cycle Status</label>
          <span>{cycleStatus?.label}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Cycle Boundary Dates</label>
          <span>{cycleDates?.[0]} - {cycleDates?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">6 Month Language Dates</label>
          <span>{sixMonthLang?.[0]} - {sixMonthLang?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">12 Month Language Dates</label>
          <span>{twelveMonthLang?.[0]} - {twelveMonthLang?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">24 Month Language Dates</label>
          <span>{twentyFourMonthLang?.[0]} - {twentyFourMonthLang?.[1]}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Position Review Date</label>
          <span>{burPos}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bidding Start Date</label>
          <span>{bidStart}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Due Date</label>
          <span>{bidDue}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Pre-Season Bid Review Date</label>
          <span>{burPrebd}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Early Season Bid Review Date</label>
          <span>{burEarly}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bureau Bid Review Date</label>
          <span>{burBid}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Audit Date</label>
          <span>{bidAudit}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Book Review Date</label>
          <span>{bidBook}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Bid Count Review Date</label>
          <span>{bidCount}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">HTF Review Date</label>
          <span>{bidHtf}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Organization Count Review Date</label>
          <span>{bidOrg}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">MDS Review Date</label>
          <span>{bidMds}</span>
        </div>
        <div className="ac-sections">
          <label htmlFor="assignmentCycle">Assigned Bidder Date</label>
          <span>{assignedBidderDate}</span>
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
              defaultValue={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
            />
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="exclusoivePositions">Exclusive Position</label>
          <span className="bs-validation-container">
            <CheckBox
              id="exclusivePosition"
              name="exclusivePosition"
              value={exclusivePosition === 'Y'}
              onChange={e => setExclusivePosition(e ? 'Y' : 'N')}
            />
          </span>
        </div>
        <div className="ac-sections">
          <label htmlFor="postViewable">Post Viewable</label>
          <span className="bs-validation-container">
            <CheckBox
              id="postViewable"
              name="postViewable"
              value={postViewable === 'Y'}
              onChange={e => setPostViewable(e ? 'Y' : 'N')}
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
        {
          <>
            <div className="ac-sections">
              <label htmlFor="cycle-bound">Cycle Boundary Dates</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <DateRangePicker
                  onChange={setCycleDates}
                  value={cycleDates}
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
                  onChange={setSixMonthLang}
                  value={sixMonthLang}
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
                  onChange={setTwelveMonthLang}
                  value={twelveMonthLang}
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
                  onChange={setTwentyFourMonthLang}
                  value={twentyFourMonthLang}
                  maxDetail="month"
                  calendarIcon={null}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="brrd">Bureau Position Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${burPos ? '' : 'hide'} fa-close`} onClick={() => setBurPos('')} />
                <DatePicker
                  selected={burPos && new Date(burPos)}
                  onChange={(date) => setBurPos(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bdd">Bidding Start Date </label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidStart ? '' : 'hide'} fa-close`} onClick={() => setBidStart('')} />
                <DatePicker
                  selected={bidStart && new Date(bidStart)}
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
                <FA name="times" className={`${burPrebd ? '' : 'hide'} fa-close`} onClick={() => setBurPrebd('')} />
                <DatePicker
                  selected={burPrebd && new Date(burPrebd)}
                  onChange={(date) => setBurPrebd(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="besbrd">Bureau Early Season Bid Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${burEarly ? '' : 'hide'} fa-close`} onClick={() => setBurEarly('')} />
                <DatePicker
                  selected={burEarly && new Date(burEarly)}
                  onChange={(date) => setBurEarly(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bbrd">Bureau Bid Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${burBid ? '' : 'hide'} fa-close`} onClick={() => setBurBid('')} />
                <DatePicker
                  selected={burBid && new Date(burBid)}
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
                <FA name="times" className={`${bidBook ? '' : 'hide'} fa-close`} onClick={() => setBidBook('')} />
                <DatePicker
                  selected={bidBook && new Date(bidBook)}
                  onChange={(date) => setBidBook(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="bcrd">Bid Count Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidCount ? '' : 'hide'} fa-close`} onClick={() => setBidCount('')} />
                <DatePicker
                  selected={bidCount && new Date(bidCount)}
                  onChange={(date) => setBidCount(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="htf">HTF Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidHtf ? '' : 'hide'} fa-close`} onClick={() => setBidHtf('')} />
                <DatePicker
                  selected={bidHtf && new Date(bidHtf)}
                  onChange={(date) => setBidHtf(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="ocrd">Organization Count Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidOrg ? '' : 'hide'} fa-close`} onClick={() => setBidOrg('')} />
                <DatePicker
                  selected={bidOrg && new Date(bidOrg)}
                  onChange={(date) => setBidOrg(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="mds">MDS Review Date</label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${bidMds ? '' : 'hide'} fa-close`} onClick={() => setBidMds('')} />
                <DatePicker
                  selected={bidMds && new Date(bidMds)}
                  onChange={(date) => bidMds(date)}
                />
              </span>
            </div>
            <div className="ac-sections">
              <label htmlFor="abd">Assigned Bidder Date </label>
              <span className="date-picker-validation-container larger-date-picker">
                <FA name="fa-regular fa-calendar" className="fa fa-calendar" />
                <FA name="times" className={`${assignedBidderDate ? '' : 'hide'} fa-close`} onClick={() => setAssignedBidderDate('')} />
                <DatePicker
                  selected={assignedBidderDate && new Date(assignedBidderDate)}
                  onChange={(date) => setAssignedBidderDate(date)}
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
        <div className="expanded-content pt-20">
          <ProfileSectionTitle title="Cycle Search" icon="cogs" className="xl-icon" />
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
