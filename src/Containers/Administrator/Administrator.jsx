import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdministratorPage from '../../Components/AdministratorPage';
import { getLogs } from '../../actions/logs';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class AdministratorContainer extends Component {
  constructor(props) {
    super(props);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.state = {};
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

  render() {
    const { logs, logsIsLoading, logsHasErrored } = this.props;
    const props = { logs, logsIsLoading, logsHasErrored, onDownloadClick: this.onDownloadClick };
    return (
      <AdministratorPage {...props} />
    );
  }
}

AdministratorContainer.propTypes = {
  getLogs: PropTypes.func,
  isLoading: PropTypes.bool,
  logs: PropTypes.string,
  logsIsLoading: PropTypes.bool,
  logsHasErrored: PropTypes.bool,
};

AdministratorContainer.defaultProps = {
  getLogs: EMPTY_FUNCTION,
  isLoading: false,
  logs: '',
  logsIsLoading: false,
  logsHasErrored: false,
};

const mapStateToProps = state => ({
  logs: state.logsSuccess,
  logsIsLoading: state.logsIsLoading,
  logsHasErrored: state.logsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  getLogs: () => dispatch(getLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)((AdministratorContainer));
