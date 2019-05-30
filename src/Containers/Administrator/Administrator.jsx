import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdministratorPage from '../../Components/AdministratorPage';
import { getLogs, getLogsList, getLog } from '../../actions/logs';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class AdministratorContainer extends Component {
  constructor(props) {
    super(props);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.getLogById = this.getLogById.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.props.getLogsList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.logsIsLoading && !nextProps.logsIsLoading && nextProps.logs) {
      const filename = `logs-${Date.now()}.txt`;
      const data = nextProps.logs;
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
    }
  }

  onDownloadClick() {
    if (!this.props.isLoading) {
      this.props.getLogs();
    }
  }

  getLogById(id) {
    this.props.getLog(id);
  }

  render() {
    const { logs, logsIsLoading, logsHasErrored,
    logsList, logsListIsLoading, logsListHasErrored,
    log, logIsLoading, logHasErrored } = this.props;
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
  log: PropTypes.string,
  logIsLoading: PropTypes.bool,
  logHasErrored: PropTypes.bool,
  getLog: PropTypes.func,
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
  log: '',
  logIsLoading: false,
  logHasErrored: false,
  getLog: EMPTY_FUNCTION,
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
});

export const mapDispatchToProps = dispatch => ({
  getLogs: () => dispatch(getLogs()),
  getLogsList: () => dispatch(getLogsList()),
  getLog: id => dispatch(getLog(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)((AdministratorContainer));
