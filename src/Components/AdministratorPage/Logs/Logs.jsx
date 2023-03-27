import { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { isEqual } from 'lodash';
import TextInput from 'Components/TextInput';
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
    this.state = {
      selected: '',
      page: 1,
      range: 10,
      logSize: 1000,
      logOffset: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.log, this.props.log)) {
      setTimeout(() => {
        const objDiv = document.getElementById(LOG_CONTAINER);
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 0);
    }
  }

  onPageChange = ({ page }) => {
    this.setState({ page });
  };

  selectLog = selected => {
    const { logSize, logOffset } = this.state;
    this.setState({ selected }, () => {
      this.props.getLog(selected, logSize, logOffset);
    });
  };

  render() {
    const {
      logsList,
      logsListIsLoading,
      logsListHasErrored,
      log,
      logIsLoading,
      logHasErrored,
      onDownloadOne,
    } = this.props;
    const { page, range, selected, logSize } = this.state;

    const logsLen = logsList.length;

    const logSuccess = selected && !logIsLoading && !logHasErrored && !!log.length;

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
            <TextInput inputProps={{ type: 'number' }} id="logSize" label="Log size (lines)" value={logSize} changeText={e => this.setState({ logSize: e })} />
            <div className="usa-grid-full total-results">
              <TotalResults total={logsLen} pageNumber={page} pageSize={range} />
            </div>
            <div className="usa-grid-full">
              {paginate(logsList.sort(), range, page).map((m) => {
                const isSelected = m === selected;
                return (
                  <LogRow
                    key={m}
                    name={m}
                    onClick={this.selectLog}
                    onDownloadClick={e => onDownloadOne(e, logSize)}
                    isSelected={isSelected}
                  />
                );
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
            <div className="usa-grid-full log-contents-container">
              <h3>Log Contents</h3>
              <div id={LOG_CONTAINER} className="log-container">
                {
                  logSuccess &&
                  (log || []).map(m => <div key={shortid.generate()} className="log-line-item"><code>{m}</code></div>)
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
              {
                logSuccess &&
                <button onClick={() => onDownloadOne(this.state.selected, logSize)} className="usa-button">Download</button>
              }
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
  log: PropTypes.arrayOf(PropTypes.string),
  logIsLoading: PropTypes.bool,
  logHasErrored: PropTypes.bool,
  getLog: PropTypes.func,
  onDownloadOne: PropTypes.func,
};

LogsPage.defaultProps = {
  logsList: [],
  logsListIsLoading: false,
  logsListHasErrored: false,
  log: [],
  logIsLoading: false,
  logHasErrored: false,
  getLog: EMPTY_FUNCTION,
  onDownloadOne: EMPTY_FUNCTION,
};

export default LogsPage;
