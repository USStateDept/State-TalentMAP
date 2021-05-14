import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdministratorPage from '../../Components/AdministratorPage';
import { getLog, getLogToDownload, getLogs, getLogsList } from '../../actions/logs';
import { getTableStats, getUsers } from '../../actions/userRoles';
import { fetchFeatureFlagsData } from '../../actions/featureFlags';
import { patchSync, putAllSyncs, syncsFetchData } from '../../actions/synchronizations';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

export const downloadFile = (text) => {
  const filename = `logs-${Date.now()}.txt`;
  const data = text;
  const blob = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};

class AdministratorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    this.props.getLogsList();
    this.props.getUsers();
    this.props.getTableStats();
    this.props.getSyncJobs();
    this.props.fetchFeatureFlagsData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.logsIsLoading && !nextProps.logsIsLoading && nextProps.logs) {
      downloadFile(nextProps.log);
    }
    if (this.props.logToDownloadIsLoading && !nextProps.logToDownloadIsLoading
            && nextProps.logToDownload) {
      downloadFile(nextProps.logToDownload);
    }
    if (this.props.patchSyncIsLoading && !nextProps.patchSyncIsLoading
            && !nextProps.patchSyncHasErrored) {
      this.props.getSyncJobs();
    }
  }

  onDownloadClick = () => {
    if (!this.props.isLoading) {
      this.props.getLogs();
    }
  };

  onDownloadOne = (id, size) => {
    if (!this.props.logToDownloadIsLoading) {
      this.props.getLogToDownload(id, size);
    }
  };

  getLogById = (id, size) => {
    this.props.getLog(id, size);
  };

  runAllJobs = () => {
    const { putAllSyncJobs, putAllSyncsIsLoading } = this.props;
    if (!putAllSyncsIsLoading) {
      putAllSyncJobs();
    }
  };

  render() {
    const {
      logs, logsIsLoading, logsHasErrored, patchSyncJob, patchSyncIsLoading,
      logsList, logsListIsLoading, logsListHasErrored,
      log, logIsLoading, logHasErrored, syncJobs, syncJobsIsLoading, totalUsers, featureFlags,
    } = this.props;
    const props = {
      logs,
      logsIsLoading,
      logsHasErrored,
      onDownloadClick: this.onDownloadClick,
      logsList,
      logsListIsLoading,
      logsListHasErrored,
      log,
      logIsLoading,
      logHasErrored,
      getLog: this.getLogById,
      onDownloadOne: this.onDownloadOne,
      getUserPermissions: this.getUserPermissions,
      onUpdatePermission: this.onUpdatePermission,
      syncJobs,
      syncJobsIsLoading,
      runAllJobs: this.runAllJobs,
      patchSyncJob,
      patchSyncIsLoading,
      totalUsers: totalUsers.count,
      featureFlags,
    };
    return (
      <AdministratorPage {...props} />
    );
  }
}

AdministratorContainer.propTypes = {
  getLogs: PropTypes.func,
  getLogsList: PropTypes.func,
  isLoading: PropTypes.bool,
  logs: PropTypes.string,
  logsIsLoading: PropTypes.bool,
  logsHasErrored: PropTypes.bool,
  logsList: PropTypes.arrayOf(PropTypes.string),
  logsListIsLoading: PropTypes.bool,
  logsListHasErrored: PropTypes.bool,
  log: PropTypes.arrayOf(PropTypes.string),
  logIsLoading: PropTypes.bool,
  logHasErrored: PropTypes.bool,
  logToDownload: PropTypes.string,
  logToDownloadIsLoading: PropTypes.bool,
  logToDownloadHasErrored: PropTypes.bool,
  getLog: PropTypes.func,
  getLogToDownload: PropTypes.func,
  getSyncJobs: PropTypes.func,
  syncJobs: PropTypes.arrayOf(PropTypes.shape({})),
  syncJobsIsLoading: PropTypes.bool,
  putAllSyncJobs: PropTypes.func,
  putAllSyncsIsLoading: PropTypes.bool,
  patchSyncIsLoading: PropTypes.bool,
  patchSyncJob: PropTypes.func,
  patchSyncHasErrored: PropTypes.bool,
  getUsers: PropTypes.func,
  getTableStats: PropTypes.func,
  totalUsers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({ count: PropTypes.number })]),
  fetchFeatureFlagsData: PropTypes.func,
  featureFlags: PropTypes.shape({}),
};

AdministratorContainer.defaultProps = {
  getLogs: EMPTY_FUNCTION,
  getLogsList: EMPTY_FUNCTION,
  isLoading: false,
  logs: '',
  logsIsLoading: false,
  logsHasErrored: false,
  logsList: [],
  logsListIsLoading: false,
  logsListHasErrored: false,
  log: [],
  logIsLoading: false,
  logHasErrored: false,
  logToDownload: '',
  logToDownloadIsLoading: false,
  logToDownloadHasErrored: false,
  getLog: EMPTY_FUNCTION,
  getLogToDownload: EMPTY_FUNCTION,
  getSyncJobs: EMPTY_FUNCTION,
  syncJobs: [],
  syncJobsIsLoading: false,
  putAllSyncsIsLoading: false,
  putAllSyncJobs: EMPTY_FUNCTION,
  patchSyncIsLoading: false,
  patchSyncJob: EMPTY_FUNCTION,
  patchSyncHasErrored: false,
  getUsers: EMPTY_FUNCTION,
  getTableStats: EMPTY_FUNCTION,
  totalUsers: {},
  fetchFeatureFlagsData: EMPTY_FUNCTION,
  featureFlags: {},
};

const mapStateToProps = state => ({
  logs: state.logsSuccess,
  logsIsLoading: state.logsIsLoading,
  logsHasErrored: state.logsHasErrored,
  logsList: state.logsListSuccess,
  logsListIsLoading: state.logsListIsLoading,
  logsListHasErrored: state.logsListHasErrored,
  log: state.logSuccess,
  logIsLoading: state.logIsLoading,
  logHasErrored: state.logHasErrored,
  logToDownload: state.logToDownloadSuccess,
  logToDownloadIsLoading: state.logToDownloadIsLoading,
  logToDownloadHasErrored: state.logToDownloadHasErrored,
  syncJobs: state.syncs,
  syncJobsIsLoading: state.syncsIsLoading,
  putAllSyncsIsLoading: state.putAllSyncsIsLoading,
  patchSyncIsLoading: state.patchSyncIsLoading,
  patchSyncHasErrored: state.patchSyncHasErrored,
  totalUsers: state.usersSuccess,
  featureFlags: state.featureFlags,
});

export const mapDispatchToProps = dispatch => ({
  getLogs: () => dispatch(getLogs()),
  getLogsList: () => dispatch(getLogsList()),
  getLog: (id, size) => dispatch(getLog(id, size)),
  getLogToDownload: (id, size) => dispatch(getLogToDownload(id, size)),
  getSyncJobs: () => dispatch(syncsFetchData()),
  putAllSyncJobs: () => dispatch(putAllSyncs()),
  patchSyncJob: data => dispatch(patchSync(data)),
  getUsers: () => dispatch(getUsers()),
  getTableStats: () => dispatch(getTableStats()),
  fetchFeatureFlagsData: () => dispatch(fetchFeatureFlagsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)((AdministratorContainer));
