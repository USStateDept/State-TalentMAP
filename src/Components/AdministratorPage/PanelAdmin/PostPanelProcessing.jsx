import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import Spinner from 'Components/Spinner';
import { Tooltip } from 'react-tippy';
import { editPostPanelProcessing, postPanelProcessingFetchData } from 'actions/postPanelProcessing';
import { panelMeetingsFetchData } from 'actions/panelMeetings';
import { runPanelMeeting } from 'actions/panelMeetingAdmin';
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
  const statuses = postPanelResults?.statuses?.filter(o => o.code !== 'N') ?? [];
  const values = postPanelResults?.values?.filter(v => v.status !== 'NR') ?? [];
  const holdOptions = postPanelResults?.hold_options ?? [];
  const hasValidAgendaItems = values?.length > 0 ?? false;

  const editPostPanelSuccess = useSelector(state => state.editPostPanelProcessingSuccess);
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

  // TODO: Finalize this block when Post Panel Started has business rules
  // useEffect(() => {
  //   // - Submits current date as Post Panel Started upon opening this tab
  //   // if Post Panel Processing has not started yet
  //   // - Can be removed by the cancel button if Post Panel has not ran yet
  //   // - Including conditions for all 3 dates because some Panels have post panel runtime
  //   // and agenda completed dates but no post panel started date
  //   if (!postPanelStarted$ && !postPanelRunTime$ && !agendaCompletedTime$) {
  //     dispatch(submitPanelMeeting(panelMeetingsResults$,
  //       { postPanelStarted: new Date() },
  //     ));
  //   }
  //   setFormData(values);
  // }, [postPanelResults]);

  const handleHold = (objLabel, newStatus) => {
    if (newStatus === 'HLD') {
      const ref = formData.find(o => o.label === objLabel);
      let option = ref?.aht_code || ref?.max_aht_code || holdOptions[0].code;
      let description = ref?.aih_hold_comment || ref?.max_aih_hold_comment || '';

      swal({
        title: 'Hold Options',
        button: false,
        closeOnEsc: true,
        content: (
          <div className="simple-action-modal">
            <div className="help-text">
              <div className="position-form--label-input-container">
                <label htmlFor="status">Hold Option</label>
                <select
                  id="hold-option"
                  defaultValue={option}
                  onChange={(e) => { option = e.target.value; }}
                >
                  {holdOptions.map(b => (
                    <option key={b.code} value={b.code}>{b.description}</option>
                  ))}
                </select>
              </div>
              <div className="position-form--label-input-container">
                <label htmlFor="drafting-office">Description</label>
                <textarea
                  id="hold-description"
                  defaultValue={description}
                  onChange={(e) => { description = e.target.value; }}
                />
              </div>
            </div>
            <div className="modal-controls">
              <button
                onClick={() => {
                  const newFormData = formData.map(o => {
                    if (o.label === objLabel) {
                      return {
                        ...o,
                        status: 'HLD',
                        aht_code: option,
                        aih_hold_comment: description,
                      };
                    }
                    return o;
                  });
                  setFormData(newFormData);
                  swal.close();
                }}
              >
                Save
              </button>
              <button
                className="usa-button-secondary"
                onClick={() => swal.close()}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
      });
    }
  };

  const handleStatusSelection = (objLabel, newStatus) => {
    if (newStatus !== 'HLD') {
      const newFormData = formData.map(o => {
        if (o.label === objLabel) {
          return {
            ...o,
            status: newStatus,
            aht_code: '',
            aih_hold_comment: '',
          };
        }
        return o;
      });
      setFormData(newFormData);
    }
  };

  // ============= Submission Management =============

  const runPostPanelProcessing = () => {
    dispatch(runPanelMeeting(pmSeqNum, 'post_panel'));
    if (runPostPanelSuccess) {
      dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
      dispatch(postPanelProcessingFetchData(pmSeqNum));
    }
  };

  const submit = () => {
    let status = '';
    let sequenceNumber = '';
    let updateId = '';
    let updateDate = '';
    let ahtCode = '';
    let aihHoldNumber = '';
    let aihHoldComment = '';
    let aihSequenceNumber = '';
    let aihUpdateId = '';
    let aihUpdateDate = '';

    formData.forEach(s => {
      const separator = status === '' ? '' : ',';
      status = status.concat(separator, s.status);
      sequenceNumber = sequenceNumber.concat(separator, s.sequence_number);
      updateId = updateId.concat(separator, s.update_id);
      updateDate = updateDate.concat(separator, s.update_date);
      ahtCode = ahtCode.concat(separator, s.aht_code);
      aihHoldNumber = aihHoldNumber.concat(separator, s.aih_hold_number);
      aihHoldComment = aihHoldComment.concat(separator, s.aih_hold_comment);
      aihSequenceNumber = aihSequenceNumber.concat(separator, s.aih_sequence_number);
      aihUpdateId = aihUpdateId.concat(separator, s.aih_update_id);
      aihUpdateDate = aihUpdateDate.concat(separator, s.aih_update_date);
    });

    if (status !== '') {
      dispatch(editPostPanelProcessing({
        status,
        sequence_number: sequenceNumber,
        update_id: updateId,
        update_date: updateDate,
        aht_code: ahtCode,
        aih_hold_number: aihHoldNumber,
        aih_hold_comment: aihHoldComment,
        aih_sequence_number: aihSequenceNumber,
        aih_update_id: aihUpdateId,
        aih_update_date: aihUpdateDate,
      }));
    }

    if (editPostPanelSuccess) {
      dispatch(panelMeetingsFetchData({ id: pmSeqNum }));
      dispatch(postPanelProcessingFetchData(pmSeqNum));
    }

    // TODO: Save Post Panel Started and Agenda Completed Time
  };

  // ============= Form Conditions =============

  const isLoading = postPanelIsLoading || panelMeetingsIsLoading;

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);

  const beforeAgendaCompletedTime = (
    agendaCompletedTime$ ? (new Date(agendaCompletedTime$.pmd_dttm) - new Date() > 0) : true
  );

  // Only admins can access editable fields and run buttons
  // Additional business rules must be followed depending on the stage of the panel meeting
  // Post Panel Started and Agenda Completed Time are disabled until further notice

  const disableTable = !isSuperUser ||
    (!beforeAgendaCompletedTime);

  const disableRunPostPanel = !isSuperUser ||
    (postPanelRunTime$ || !beforeAgendaCompletedTime || !hasValidAgendaItems);

  const disableSave = !isSuperUser ||
    (!beforeAgendaCompletedTime);

  const disableHold = (agenda, status) => {
    const isHold = status.code === 'H';
    const isChairHold = agenda.aht_code === 'C';
    const reachedMax = agenda.max_aih_hold_number > 2;
    return isHold && !isChairHold && reachedMax;
  };

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
                disabled
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
                // Disabled until FSBID utilizes this field
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
                  <th key={o.code}>
                    {o.description}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hasValidAgendaItems ?
                <tr>
                  <td colSpan="100%">
                    This panel does not have any valid agenda items.
                  </td>
                </tr> :
                formData.map(d => (
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
                    {statuses.map((o) => {
                      const radio = (
                        <input
                          id={`${d.label}-status-${o.code}`}
                          type="radio"
                          name={`${d.label}-status-${o.description}`}
                          checked={d.status === o.description}
                          onChange={() => handleStatusSelection(d.label, o.description)}
                          onClick={() => handleHold(d.label, o.description)}
                          disabled={disableTable || disableHold(d, o)}
                          className="interactive-element"
                        />
                      );
                      return (
                        <td key={`${d.label}-${o.code}`}>
                          {(o.code === 'H' && d.status === o.description) ?
                            <Tooltip
                              html={
                                <div className="tooltip-text">
                                  <div>
                                    <span className="title">
                                      {holdOptions
                                        .find(h => h.code === d.aht_code)?.description}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text">
                                      {d.aih_hold_comment}
                                    </span>
                                  </div>
                                </div>
                              }
                              theme="oc-status"
                              arrow
                              interactive
                              useContext
                            >
                              {radio}
                            </Tooltip> :
                            radio
                          }
                        </td>
                      );
                    })}
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
                // Disabled until FSBID utilizes this field
                disabled
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
