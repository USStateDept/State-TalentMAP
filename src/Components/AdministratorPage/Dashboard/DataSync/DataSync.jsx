/*
TODO - server-side - next_synchronization is calculated server-side
using the last_synchronization + delta. We may want this field exposed for patching in the future
so that next_sync can be updated independently. Relevant components for this have been commented
out with "TODO server-side".
*/

import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isNull, omit, orderBy, startsWith, toString } from 'lodash';
import FA from 'react-fontawesome';
import { addHours, format, parse, subHours } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import TimeInput from 'react-keyboard-time-input';
import InteractiveElement from '../../../InteractiveElement';
import Form from '../../../Form';
import FieldSet from '../../../FieldSet';
import RadioList from '../../../RadioList';
import Spinner from '../../../Spinner';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import { focusById } from '../../../../utilities';
import ExportButton from '../../../ExportButton';

export const FORMAT = 'MM-DD-YY hh:mm A';
export const FORMAT_TIME = 'hh:mm A';

export const formatDate = (date, format$ = FORMAT, locale) => format(date, format$, { locale });

export const parseDate = (str, format$, locale) => {
  if (str) {
    const parsed = parse(str, format$, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
  }
  return undefined;
};

const getScheduledJob = (jobs = [], prop = 'next_synchronization', ordering = 'desc') => {
  let sync;
  if (jobs.length) {
    const orderedJobs = orderBy(jobs, prop, ordering);
    sync = get(orderedJobs, '[0]');
  }
  if (sync) {
    return { ...sync, next_synchronization: formatDate(sync.next_synchronization) };
  }
  return null;
};

class DataSync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      formValues: {
        id: null,
        last_synchronization: null,
        delta_synchronization: 86400,
        running: 'false',
        talentmap_model: '',
        next_synchronization: null,
        priority: 0,
        use_last_date_updated: 'false',
      },
    };
  }

  setJob = job => {
    const job$ = {
      ...job,
      last_synchronization: parseDate(new Date(job.last_synchronization)),
      last_synchronization_time: format(job.last_synchronization, FORMAT_TIME),

      // TODO - server-side
      // next_synchronization: parseDate(new Date(job.next_synchronization)),
      // next_synchronization_time: format(job.next_synchronization, FORMAT_TIME),

      running: job.running ? 'true' : 'false',
      use_last_date_updated: job.use_last_date_updated ? 'true' : 'false',
    };
    this.setState({ formValues: job$ }, () => this.showForm());
  };

  submitSync = () => {
    const { patchSyncJob } = this.props;
    const { formValues: f } = this.state;

    // Combine date with time since they're separated into two form fields, but
    // one on the API.
    const parseDateTime = (date, time) => {
      let date$ = parse(
        `${format(date, 'YYYY-MM-DD')} ${time}`,
        `YYYY-MM-DD ${FORMAT_TIME}`,
      );
      // date-fns can format TO am/pm but can't parse FROM it,
      // so we check whether or not we need to add an extra 12 hours
      // by looking for PM/pm in the time string.
      // This might be possible in date-fns 2.0, but it's in beta
      // and has breaking changes.
      const isPM = time.includes('PM') || time.includes('pm');
      const is12 = startsWith(time, '12:');
      if (isPM && !is12) {
        date$ = addHours(date$, 12);
      }
      if (!isPM && is12) {
        date$ = subHours(date$, 12);
      }
      return date$;
    };

    const formValues$ = {
      ...omit(f, ['next_synchronization', 'last_synchronization_time']), // TODO - server-side
      last_synchronization: parseDateTime(f.last_synchronization, f.last_synchronization_time),
      running: f.running === 'true',
      use_last_date_updated: f.use_last_date_updated === 'true',
    };

    patchSyncJob(formValues$);
  };

  showForm = () => {
    this.setState({ showForm: true });
    focusById('form-header', 1);
  };

  closeForm = () => {
    this.setState({ showForm: false });
    focusById('new-sync-button', 1);
  };

  updateTime = (value, field = 'next_synchronization_time') => {
    const { formValues } = this.state;
    formValues[field] = value;
    this.setState({ formValues });
  };

  updateBool = (value = false, field) => {
    const { formValues } = this.state;
    if (field) {
      formValues[field] = toString(value);
      this.setState({ formValues });
    }
  };

  updateVal = (value = null, field) => {
    const v$ = get(value, 'target.value');
    const { formValues } = this.state;
    if (!isNull(v$)) {
      formValues[field] = v$;
      this.setState({ formValues });
    }
  };

  updateDate = (value, field = 'next_synchronization') => {
    const { formValues } = this.state;
    formValues[field] = value;
    this.setState({ formValues });
  };

  dateIsValid = (field = 'next_synchronization') => {
    const { formValues: { [field]: field$ } } = this.state;
    return !!field$;
  };

  formIsValid = () => this.dateIsValid('next_synchronization') && this.dateIsValid('last_synchronization');

  render() {
    const { showForm, formValues } = this.state;
    const { syncJobs, isLoading, patchSyncIsLoading, runAllJobs } = this.props;
    const formIsValid = this.formIsValid();
    // const dateIsValid = this.dateIsValid('next_synchronization'); TODO server-side
    const dateLastIsValid = this.dateIsValid('last_synchronization');
    const nextScheduled = getScheduledJob(syncJobs);
    const lastRun = getScheduledJob(syncJobs, 'last_synchronization');
    return (
      <div className="usa-grid-full padded-section data-sync-section">
        <h3>TalentMAP Data Sync</h3>
        {
          isLoading &&
            <Spinner type="homepage-position-results" size="big" />
        }
        {!isLoading &&
          <div>
            <div className="usa-grid-full top-section">
              {
                nextScheduled &&
                <div>
                  <strong>Next sync scheduled: </strong>
                  <span>{nextScheduled.talentmap_model}: {nextScheduled.next_synchronization}</span>
                </div>
              }
              <div className="usa-grid-full sync-job-container">
                {
                  syncJobs.map((n) => {
                    const nextSyncDate = format(n.next_synchronization, FORMAT);
                    return (
                      <div key={n.id} className="usa-grid-full sync-job-item">
                        <div>
                          <strong>{n.talentmap_model}: </strong>
                          <span>Next sync at {nextSyncDate}</span>
                        </div>
                        <InteractiveElement title="Edit details for this job" type="span" onClick={() => this.setJob(n)}>
                          <FA name="pencil" />
                        </InteractiveElement>
                      </div>
                    );
                  })
                }
              </div>
              {
                !showForm &&
                  <div className="usa-grid-full new-sync-container">
                    Click the pencil next to one of the jobs above to edit its details.
                  </div>
              }
              {
                showForm &&
                <div className="usa-grid-full new-sync-container new-sync-container--form">
                  <div className="usa-grid-full new-sync-form">
                    <h4 id="form-header" tabIndex="-1">Update Sync Details</h4>
                    <Form id="sync-form" onFormSubmit={(e) => { e.preventDefault(); }}>
                      <FieldSet legend="Last Synchronization">
                        <div className="date-time-forms">
                          <div className={`date-time-form date-time-form--date ${dateLastIsValid ? '' : 'usa-input-error'}`}>
                            <label
                              htmlFor={`day-picker-input ${dateLastIsValid ? 'input-type-text' : 'usa-input-error-label'}`}
                              className="label"
                            >
                              Date:
                            </label>
                            {!dateLastIsValid && <span className="usa-input-error-message usa-sr-only" id="input-error-message" role="alert">Must be a valid, present or future date</span>}
                            <DayPickerInput
                              containerProps={{ id: 'day-picker-input', ariaDescribedBy: 'input-error-message' }}
                              onDayChange={e => this.updateDate(e, 'last_synchronization')}
                              value={formValues.last_synchronization}
                              format={'MM/DD/YYYY'}
                              formatDate={formatDate}
                              parseDate={parseDate}
                            />
                          </div>
                          <div className="date-time-form date-time-form--time">
                            <label htmlFor="time-input" className="label">Time:</label>
                            <TimeInput
                              id="time-input"
                              value={formValues.last_synchronization_time}
                              onChange={e => this.updateTime(e, 'last_synchronization_time')}
                            />
                          </div>
                        </div>
                      </FieldSet>

                      {
                        /* eslint-disable */
                       /* TODO - server-side
                      <FieldSet legend="Next Synchronization">
                        <div className="date-time-forms">
                          <div className={`date-time-form date-time-form--date ${dateIsValid ? '' : 'usa-input-error'}`}>
                            <label
                              htmlFor={`day-picker-input ${dateIsValid ? 'input-type-text' : 'usa-input-error-label'}`}
                              className="label"
                            >
                              Date:
                            </label>
                            {!dateIsValid && <span className="usa-input-error-message usa-sr-only" id="input-error-message" role="alert">Must be a valid, present or future date</span>}
                            <DayPickerInput
                              containerProps={{ id: 'day-picker-input', ariaDescribedBy: 'input-error-message' }}
                              onDayChange={e => this.updateDate(e, 'next_synchronization')}
                              value={formValues.next_synchronization}
                              format={'MM/DD/YYYY'}
                              formatDate={formatDate}
                              parseDate={parseDate}
                            />
                          </div>
                          <div className="date-time-form date-time-form--time">
                            <label htmlFor="time-input" className="label">Time:</label>
                            <TimeInput
                              id="time-input"
                              value={formValues.next_synchronization_time}
                              onChange={e => this.updateTime(e, 'next_synchronization_time')}
                            />
                          </div>
                        </div>
                      </FieldSet>
                      */
                      /* eslint-enable */
                      }

                      <FieldSet legend="TalentMAP Model">
                        <input type="string" value={formValues.talentmap_model} onChange={e => this.updateVal(e, 'talentmap_model')} />
                      </FieldSet>
                      <FieldSet legend="Priority">
                        <input type="number" value={formValues.priority} onChange={e => this.updateVal(e, 'priority')} />
                      </FieldSet>
                      <FieldSet legend="Delta">
                        <input type="number" value={formValues.delta_synchronization} onChange={e => this.updateVal(e, 'delta_synchronization')} />
                      </FieldSet>
                      <FieldSet legend="Use last updated date">
                        <RadioList
                          options={[
                            { id: 'lastdate-true', value: 'true', label: 'True' },
                            { id: 'lastdate-false', value: 'false', label: 'False' },
                          ]}
                          value={formValues.use_last_date_updated}
                          onChange={e => this.updateBool(e, 'use_last_date_updated')}
                        />
                      </FieldSet>
                      <FieldSet legend="Running">
                        <RadioList
                          options={[
                            { id: 'running-true', value: 'true', label: 'True' },
                            { id: 'running-false', value: 'false', label: 'False' },
                          ]}
                          value={formValues.running}
                          onChange={e => this.updateBool(e, 'running')}
                        />
                      </FieldSet>
                    </Form>
                    <div className="export-button-container">
                      <ExportButton
                        disabled={!formIsValid}
                        type="submit"
                        form="sync-form"
                        value="Update sync"
                        onClick={this.submitSync}
                        isLoading={patchSyncIsLoading}
                        text="Update sync"
                      />
                    </div>
                    <button
                      title="Close form"
                      className="feedback-close unstyled-button"
                      onClick={this.closeForm}
                    >
                      <FA name="times" />
                      <span className="usa-sr-only">Close Feedback</span>
                    </button>
                  </div>
                </div>
              }
            </div>
            <div className="usa-grid-full status-container">
              <div className="usa-grid-full status-container--inner">
                { lastRun && <div>
                  <strong>Last sync: </strong>
                  <span>{nextScheduled.talentmap_model}: {nextScheduled.next_synchronization}</span>
                </div> }
              </div>
              <button className="usa-button-secondary" onClick={runAllJobs}>Run sync now</button>
            </div>
          </div>
        }
      </div>
    );
  }
}

DataSync.propTypes = {
  syncJobs: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  runAllJobs: PropTypes.func,
  patchSyncIsLoading: PropTypes.bool,
  patchSyncJob: PropTypes.func,
};

DataSync.defaultProps = {
  syncJobs: [],
  isLoading: false,
  runAllJobs: EMPTY_FUNCTION,
  patchSyncIsLoading: false,
  patchSyncJob: EMPTY_FUNCTION,
};

export default DataSync;
