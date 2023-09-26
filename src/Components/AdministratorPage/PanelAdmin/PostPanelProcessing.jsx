import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import Spinner from 'Components/Spinner';
import { postPanelProcessingFetchData, postPanelStatusesFetchData } from 'actions/postPanelProcessing';
import { createPostPanelProcessing } from '../../../actions/postPanelProcessing';
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
  const postPanelStatusesResults =
    useSelector(state => state.postPanelStatusesFetchDataSuccess);
  const postPanelStatusesIsLoading = useSelector(state => state.postPanelStatusesFetchDataLoading);

  useEffect(() => {
    dispatch(postPanelProcessingFetchData({ id: pmSeqNum }));
    dispatch(postPanelStatusesFetchData());
  }, []);


  // ============= Input Management =============

  const datePickerRef = useRef(null);
  const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const [postPanelStarted, setPostPanelStarted] = useState();
  const [postPanelRuntime, setPostPanelRuntime] = useState();
  const [agendaCompletedTime, setAgendaCompletedTime] = useState();
  const [formData, setFormData] = useState(postPanelResults);

  useEffect(() => {
    if (!!Object.keys(panelMeetingsResults).length && !panelMeetingsIsLoading) {
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
    setFormData(postPanelResults);
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
    dispatch(createPostPanelProcessing(formData));
    dispatch(submitPanelMeeting(panelMeetingsResults$,
      { postPanelRuntime: currTimestamp },
    ));
  };

  const cancel = () => {
    // Depending on how the API works, this will need to handle removing these fields
    // instead of setting them to undefined
    if (!postPanelRunTime$ && !agendaCompletedTime$) {
      dispatch(submitPanelMeeting(panelMeetingsResults$,
        {
          postPanelStarted: undefined,
          postPanelRuntime: undefined,
          agendaCompletedTime: undefined,
        },
      ));
    }
  };

  const submit = () => {
    dispatch(createPostPanelProcessing(formData));
    dispatch(submitPanelMeeting(panelMeetingsResults$,
      {
        postPanelStarted,
        postPanelRuntime,
        agendaCompletedTime,
      },
    ));
  };


  // ============= Form Conditions =============

  // Remove second half of this when loading states are implemented with the api call in actions
  const isLoading = (postPanelIsLoading || postPanelStatusesIsLoading) || (
    (postPanelStatusesResults && !postPanelStatusesResults.length) ||
    (formData && !formData.length)
  );

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = !userHasPermissions(['superuser'], userProfile.permission_groups);

  const beforeAgendaCompletedTime = (
    agendaCompletedTime$ ? (new Date(agendaCompletedTime$.pmd_dttm) - new Date() > 0) : true
  );

  // Super Admins can manually edit any field, otherwise, certain fields
  // are restricted by preconditions determined by prior steps

  const disablePostPanelStarted = !isSuperUser &&
    (postPanelRunTime$ && !beforeAgendaCompletedTime);

  const disablePostPanelRunTime = !isSuperUser &&
    (postPanelRunTime$ && !beforeAgendaCompletedTime);

  const disableTable = !isSuperUser &&
    (!beforeAgendaCompletedTime);

  const disableRunPostPanel =
    (postPanelRunTime$ || !beforeAgendaCompletedTime);

  const disableAgendaCompletedTime = !isSuperUser &&
    (!postPanelRunTime$ && !beforeAgendaCompletedTime);

  const disableCancel = !isSuperUser &&
    (postPanelRunTime$ || agendaCompletedTime$);

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
                disabled={disablePostPanelRunTime}
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
                {postPanelStatusesResults.map((o) => (
                  <th key={o.label}>{o.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.map(d => (
                <tr key={d.label}>
                  <td>
                    {d.value ?
                      <FA name="check" /> :
                      '---'
                    }
                  </td>
                  <td>
                    <span className="item-link">
                      {d.item}
                    </span>
                  </td>
                  <td>{d.label}</td>
                  <td>{d.name}</td>
                  {postPanelStatusesResults.map((o) => (
                    <td key={o.label}>
                      <input
                        type="radio"
                        name={`${o.label} ${d.label}`}
                        checked={d.status === o.value}
                        onChange={() => handleStatusSelection(d.label, o.value)}
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
          <button onClick={cancel} disabled={disableCancel}>Cancel</button>
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
