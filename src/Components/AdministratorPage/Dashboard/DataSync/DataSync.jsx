import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, orderBy } from 'lodash';
import FA from 'react-fontawesome';
import { format, differenceInCalendarDays, parse } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import TimeInput from 'time-input';
import InteractiveElement from '../../../InteractiveElement';
import Form from '../../../Form';
import FieldSet from '../../../FieldSet';
import RadioList from '../../../RadioList';
import Spinner from '../../../Spinner';

export const FORMAT = 'MM-DD-YY HH:MM';

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

const getScheduledJob = (jobs = [], prop = 'next_sync', ordering = 'desc') => {
  let sync;
  if (jobs.length) {
    const orderedJobs = orderBy(jobs, prop, ordering);
    sync = get(orderedJobs, '[0]');
  }
  if (sync) {
    return { ...sync, next_sync: formatDate(sync.next_sync) };
  }
  return null;
};

class DataSync extends Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.updateOccurrence = this.updateOccurrence.bind(this);
    this.updateFrequency = this.updateFrequency.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.dateIsValid = this.dateIsValid.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.state = {
      showForm: false,
      formValues: {
        recurring: 'once',
        frequency: 'weekly',
        date: new Date(),
        time: '12:00:00 PM',
      },
    };
  }

  showForm() {
    this.setState({ showForm: true });
    setTimeout(() => {
      document.getElementById('once').focus();
    }, 0);
  }

  closeForm() {
    this.setState({ showForm: false });
    setTimeout(() => {
      document.getElementById('new-sync-button').focus();
    }, 0);
  }

  updateOccurrence(recurring) {
    const { formValues } = this.state;
    formValues.recurring = recurring;
    this.setState({ formValues });
  }

  updateFrequency(frequency) {
    const { formValues } = this.state;
    formValues.frequency = frequency;
    this.setState({ formValues });
  }

  updateTime(time) {
    const { formValues } = this.state;
    formValues.time = time;
    this.setState({ formValues });
  }

  updateDate(date) {
    const { formValues } = this.state;
    formValues.date = date;
    this.setState({ formValues });
  }

  dateIsValid() {
    const { formValues: { date } } = this.state;
    return date && differenceInCalendarDays(date, new Date()) >= 0;
  }

  formIsValid() {
    const { formValues: { recurring, frequency, time } } = this.state;
    return recurring && frequency && this.dateIsValid() && time;
  }

  render() {
    const { showForm, formValues } = this.state;
    const { syncJobs, isLoading } = this.props; // eslint-disable-line
    const formIsValid = this.formIsValid();
    const dateIsValid = this.dateIsValid();
    const nextScheduled = getScheduledJob(syncJobs);
    const lastRun = getScheduledJob(syncJobs, 'last_sync');
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
                  <span>{nextScheduled.talentmap_model}: {nextScheduled.next_sync}</span>
                </div>
              }
              <div className="usa-grid-full sync-job-container">
                {
                  syncJobs.map((n) => {
                    const nextSyncDate = format(n.next_sync, FORMAT);
                    return (
                      <div key={n.id} className="usa-grid-full sync-job-item">
                        <div>
                          <strong>{n.talentmap_model}: </strong>
                          <span>Next sync at {nextSyncDate}</span>
                        </div>
                        <FA name="trash-o" />
                        <FA name="pencil" />
                      </div>
                    );
                  })
                }
              </div>
              {
                !showForm &&
                  <div className="usa-grid-full new-sync-container">
                    <InteractiveElement id="new-sync-button" type="a" onClick={this.showForm}>Schedule New Sync +</InteractiveElement>
                  </div>
              }
              {
                showForm &&
                <div className="usa-grid-full new-sync-container new-sync-container--form">
                  <div className="usa-grid-full new-sync-form">
                    <h4>Schedule New Sync</h4>
                    <Form id="sync-form" onFormSubmit={(e) => { e.preventDefault(); }}>
                      <FieldSet legend="Sync Occurrence" legendSrOnly>
                        <RadioList
                          options={[
                            { id: 'once', label: 'Once' },
                            { id: 'recurring', label: 'Recurring' },
                          ]}
                          value={formValues.recurring}
                          onChange={this.updateOccurrence}
                        />
                      </FieldSet>
                      <FieldSet legend="Starts">
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
                              onDayChange={this.updateDate}
                              value={formValues.date}
                              format={'MM/DD/YYYY'}
                              formatDate={formatDate}
                              parseDate={parseDate}
                            />
                          </div>
                          <div className="date-time-form date-time-form--time">
                            <label htmlFor="time-input" className="label">Time:</label>
                            <TimeInput id="time-input" value={formValues.time} onChange={this.updateTime} />
                          </div>
                        </div>
                      </FieldSet>
                      {
                        formValues.recurring &&
                        <FieldSet legend="Frequency">
                          <RadioList
                            options={[
                              { id: 'daily', label: 'Daily' },
                              { id: 'weekly', label: 'Weekly' },
                              { id: 'monthly', label: 'Monthly' },
                            ]}
                            value={formValues.frequency}
                            onChange={this.updateFrequency}
                          />
                        </FieldSet>
                      }
                    </Form>
                    <button disabled={!formIsValid} type="submit" form="sync-form" value="Create sync">Create sync</button>
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
                  <span>{nextScheduled.talentmap_model}: {nextScheduled.next_sync}</span>
                </div> }
              </div>
              <button className="usa-button-secondary">Run sync now</button>
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
};

DataSync.defaultProps = {
  syncJobs: [],
  isLoading: false,
};

export default DataSync;
