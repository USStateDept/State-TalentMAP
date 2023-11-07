import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import Spinner from 'Components/Spinner';
import { editPostPanelProcessing, postPanelProcessingFetchData } from 'actions/postPanelProcessing';
import { panelMeetingsFetchData } from 'actions/panelMeetings';
import { runPanelMeeting } from 'actions/panelMeetingAdmin';
import { submitPanelMeeting } from '../../Panel/helpers';
import { userHasPermissions } from '../../../utilities';


const PostPanelProcessing = (props) => {
  const { panelMeetingsResults, panelMeetingsIsLoading, pmSeqNum } = props;

  const dispatch = useDispatch();


  // ============= Retrieve Data =============

  const panelMeetingsResults$ = panelMeetingsResults?.results?.[0] ?? {};
  const { panelMeetingDates } = panelMeetingsResults$;

  const postPanelStarted$ = panelMeetingDates?.find(x => x.mdt_code === 'POSS');
  const postPanelRunTime$ = panelMeetingDates?.find(x => x.mdt_code === 'POST');
  const agendaCompletedTime$ = panelMeetingDates?.find(x => x.mdt_code === 'COMP');

  const postPanelResults = useSelector(state => state.postPanelProcessingFetchDataSuccess);
  const postPanelIsLoading = useSelector(state => state.postPanelProcessingFetchDataLoading);
  const statuses = postPanelResults?.statuses ?? [];
  const values = postPanelResults?.values ?? [];

  const runPostPanelSuccess = useSelector(state => state.runPostPanelProcessingSuccess);

  useEffect(() => {
    dispatch(postPanelProcessingFetchData(pmSeqNum));
  }, []);


  // ============= Input Management =============

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const [postPanelStarted, setPostPanelStarted] = useState();
  const [postPanelRuntime, setPostPanelRuntime] = useState();
  const [agendaCompletedTime, setAgendaCompletedTime] = useState();
  const [formData, setFormData] = useState(values);

  useEffect(() => {
    if (!postPanelIsLoading && !panelMeetingsIsLoading) {
      if (postPanelStarted$) {
        setPostPanelStarted(new Date(postPanelStarted$.pmd_dttm));
      }
      if (postPanelRunTime$) {
        setPostPanelRuntime(new Date(postPanelRunTime$.pmd_dttm));
      }
      if (agendaCompletedTime$) {
        setAgendaCompletedTime(new Date(agendaCompletedTime$.pmd_dttm));
      }
    }
  }, [panelMeetingsResults]);

  useEffect(() => {
    // - Submits current date as Post Panel Started upon opening this tab
    // if Post Panel Processing has not started yet
    // - Can be removed by the cancel button if Post Panel has not ran yet
    // - Including conditions for all 3 dates because some Panels have post panel runtime
    // and agenda completed dates but no post panel started date
    if (!postPanelStarted$ && !postPanelRunTime$ && !agendaCompletedTime$) {
      dispatch(submitPanelMeeting(panelMeetingsResults$,
        { postPanelStarted: new Date() },
      ));
    }
    setFormData(values);
  }, [postPanelResults]);

  const handleStatusSelection = (objLabel, newStatus) => {
    const newFormData = formData.map(o => {
      if (o.label === objLabel) {
        return {
          ...o,
          status: newStatus,
        };
      }
      return o;
    });
    setFormData(newFormData);
  };

  // ============= Submission Management =============

  const runPostPanelProcessing = () => {
    const currTimestamp = new Date();
    setPostPanelRuntime(currTimestamp);
    dispatch(runPanelMeeting(pmSeqNum, 'post_panel'));
    if (runPostPanelSuccess) {
      dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
      dispatch(postPanelProcessingFetchData(pmSeqNum));
    }
  };

  const submit = () => {
    formData.forEach((o, i) => {
      if (values[i].status !== o.status) {
        if (o.status === 'H') {
          dispatch(editPostPanelProcessing({
            status: o.status,
            sequence_number: o.sequence_number,
            update_id: o.update_id,
            update_date: o.update_date,
            aht_code: o.aht_code,
            aih_hold_number: o.aih_hold_number,
            aih_hold_comment: o.aih_hold_comment,
            aih_sequence_number: o.aih_sequence_number,
          }));
        } else {
          dispatch(editPostPanelProcessing({
            status: o.status,
            sequence_number: o.sequence_number,
            update_id: o.update_id,
            update_date: o.update_date,
          }));
        }
      }
    });
    // TODO: Save Post Panel Started and Agenda Completed Time
  };


  // ============= Form Conditions =============

  const isLoading = postPanelIsLoading || panelMeetingsIsLoading;

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = !userHasPermissions(['superuser'], userProfile.permission_groups);

  const beforePostPanelStarted = (
    postPanelStarted$ ? (new Date(postPanelStarted$.pmd_dttm) - new Date() > 0) : true
  );
  const beforeAgendaCompletedTime = (
    agendaCompletedTime$ ? (new Date(agendaCompletedTime$.pmd_dttm) - new Date() > 0) : true
  );

  // Super Admins can manually edit any field, otherwise, certain fields
  // are restricted by preconditions determined by prior steps

  const disablePostPanelStarted = !isSuperUser &&
    (postPanelRunTime$ && !beforePostPanelStarted);

  const disableTable = !isSuperUser &&
    (!beforeAgendaCompletedTime);

  const disableRunPostPanel =
    (postPanelRunTime$ || !beforeAgendaCompletedTime);

  const disableAgendaCompletedTime = !isSuperUser &&
    (!postPanelRunTime$ || !beforeAgendaCompletedTime);

  const disableSave = !isSuperUser &&
    (!beforeAgendaCompletedTime);

  return (
    (isLoading) ?
      <Spinner type="panel-admin-remarks" size="small" /> :
      <div className="post-panel-processing">
        <div className="post-panel-grid-row">
          <div className="panel-meeting-field">
            <label htmlFor="addendum-cutoff-date">Post Panel Started</label>
            <div className="date-picker-wrapper larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <DatePicker
                disabled={disablePostPanelStarted}
                selected={postPanelStarted}
                onChange={(date) => setPostPanelStarted(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MM/dd/yyyy h:mm aa"
                ref={datePickerRef}
              />
            </div>
          </div>
          <div className="panel-meeting-field">
            <label htmlFor="addendum-cutoff-date">Post Panel Run Time</label>
            <div className="date-picker-wrapper larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <DatePicker
                disabled
                selected={postPanelRuntime}
                onChange={(date) => setPostPanelRuntime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MM/dd/yyyy h:mm aa"
                ref={datePickerRef}
              />
            </div>
          </div>
        </div>
        <div className="post-panel-processing--table">
          <table>
            <thead>
              <tr>
                <th>Val</th>
                <th>Item</th>
                <th>Label</th>
                <th>Name</th>
                {statuses.map((o) => (
                  <th key={o.code}>{o.description}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.map(d => (
                <tr key={d.label}>
                  <td key={`${d.label}-valid`}>
                    {d.valid === 'Y' ?
                      <FA name="check" /> :
                      '---'
                    }
                  </td>
                  <td key={`${d.label}-item`}>
                    <span className="item-link">
                      {d.item}
                    </span>
                  </td>
                  <td key={`${d.label}-label`}>{d.label}</td>
                  <td key={`${d.label}-employee`}>{d.employee}</td>
                  {statuses.map((o) => (
                    <td key={`${d.label}-${o.code}`}>
                      <input
                        id={`${d.label}-status-${o.code}`}
                        type="radio"
                        name={`${d.label}-status-${o.description}`}
                        checked={d.status === o.description}
                        onChange={() => handleStatusSelection(d.label, o.description)}
                        disabled={disableTable}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          disabled={disableRunPostPanel}
          className="text-button mb-20"
          onClick={runPostPanelProcessing}
        >
          Run Post Panel Processing
        </button>
        <div className="post-panel-grid-row">
          <div className="panel-meeting-field">
            <label htmlFor="addendum-cutoff-date">Agenda Completed Time</label>
            <div className="date-picker-wrapper larger-date-picker">
              <FA name="fa fa-calendar" onClick={() => openDatePicker()} />
              <DatePicker
                disabled={disableAgendaCompletedTime}
                selected={agendaCompletedTime}
                onChange={(date) => setAgendaCompletedTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                timeCaption="time"
                dateFormat="MM/dd/yyyy h:mm aa"
                ref={datePickerRef}
              />
            </div>
          </div>
        </div>
        <div className="position-form--actions">
          <button onClick={submit} disabled={disableSave}>Save</button>
        </div>
      </div>
  );
};

PostPanelProcessing.propTypes = {
  pmSeqNum: PropTypes.string,
  panelMeetingsResults: PropTypes.shape(),
  panelMeetingsIsLoading: PropTypes.bool,
};

PostPanelProcessing.defaultProps = {
  match: {},
  pmSeqNum: undefined,
  panelMeetingsResults: undefined,
  panelMeetingsIsLoading: false,
};

export default withRouter(PostPanelProcessing);
