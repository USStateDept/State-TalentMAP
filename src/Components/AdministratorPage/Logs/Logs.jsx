import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import LogRow from './LogRow';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import TotalResults from '../../TotalResults';
import { paginate } from '../../../utilities';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const LOG_CONTAINER = 'log-scroll-container';

class LogsPage extends Component {
  constructor(props) {
    super(props);
    this.selectLog = this.selectLog.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.state = {
      selected: '',
      page: 1,
      range: 3,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.log !== this.props.log) {
      setTimeout(() => {
        const objDiv = document.getElementById(LOG_CONTAINER);
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 0);
    }
  }

  onPageChange({ page }) {
    this.setState({ page });
  }

  selectLog(selected) {
    this.setState({ selected }, () => {
      this.props.getLog(selected);
    });
  }

  render() {
    const {
      logsList,
      logsListIsLoading,
      logsListHasErrored, // eslint-disable-line
      log,
      logIsLoading, // eslint-disable-line
      logHasErrored, // eslint-disable-line
      getLog, // eslint-disable-line
    } = this.props;
    const { page, range, selected } = this.state;

    const logsLen = logsList.length;

    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(logsListIsLoading) ? 'results-loading' : ''}`}
      >
        {
          logsListIsLoading && !logsListHasErrored &&
            <Spinner type="homepage-position-results" size="big" />
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Logs" icon="sitemap" />
        </div>
        {
          !logsListIsLoading && !logsListHasErrored &&
          <div>
            <div className="usa-grid-full total-results">
              <TotalResults total={logsLen} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              {paginate(logsList, range, page).map((m) => {
                const isSelected = m === selected;
                return <LogRow key={m} name={m} onClick={this.selectLog} isSelected={isSelected} />;
              })}
            </div>
            <div className="usa-grid-full react-paginate">
              <PaginationWrapper
                totalResults={logsLen}
                pageSize={range}
                onPageChange={this.onPageChange}
                forcePage={page}
              />
            </div>
            <div className="usa-grid-full">
              <h3>Log Contents</h3>
              <div
                id={LOG_CONTAINER}
                style={{
                  minHeight: '80px',
                  maxHeight: '486px',
                  overflowY: 'scroll',
                  maxWidth: '100%',
                  padding: '16px',
                  backgroundColor: 'white',
                  fontSize: '.8em',
                  border: '1px solid gray',
                }}
              >
                {
                  selected && !logIsLoading && !logHasErrored && !!log.length &&
                  (log || []).map(m => <div style={{ margin: '.3em 0' }}><code>{m}</code></div>)
                }
                {
                  selected && !logIsLoading && !logHasErrored && log.length <= 1 && !log[0] && 'This log file is empty.'
                }
                {
                  selected && logIsLoading && !logHasErrored && 'Log file loading...'
                }
                {
                  selected && !logIsLoading && logHasErrored && 'An error occurred while loading this log file.'
                }
                {
                  !selected && 'Please choose a log file above.'
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

LogsPage.propTypes = {
  logsList: PropTypes.arrayOf(PropTypes.string),
  logsListIsLoading: PropTypes.bool,
  logsListHasErrored: PropTypes.bool,
  log: PropTypes.string,
  logIsLoading: PropTypes.bool,
  logHasErrored: PropTypes.bool,
  getLog: PropTypes.func,
};

LogsPage.defaultProps = {
  logsList: [],
  logsListIsLoading: false,
  logsListHasErrored: false,
  log: '',
  logIsLoading: false,
  logHasErrored: false,
  getLog: EMPTY_FUNCTION,
};

export default LogsPage;
