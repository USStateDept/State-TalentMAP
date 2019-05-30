import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import Dashboard from './Dashboard';
import Logs from './Logs';

const AdministratorPage = (props) => {
  const {
    isLoading,
    logsIsLoading,
    onDownloadClick,
    logsList,
    logsListIsLoading,
    logsListHasErrored,
    log,
    logIsLoading,
    logHasErrored,
    getLog,
  } = props;

  const dashboardProps = {
    isLoading,
    logsIsLoading,
    onDownloadClick,
  };

  const logsProps = {
    logsList,
    logsListIsLoading,
    logsListHasErrored,
    log,
    logIsLoading,
    logHasErrored,
    getLog,
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/administrator/dashboard/" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/administrator/logs/" render={() => <Logs {...logsProps} />} />
      </Switch>
    </div>
  );
};

AdministratorPage.propTypes = {
  isLoading: PropTypes.bool,
  logsIsLoading: PropTypes.bool,
  onDownloadClick: PropTypes.func,
  logsList: PropTypes.arrayOf(PropTypes.string),
  logsListIsLoading: PropTypes.bool,
  logsListHasErrored: PropTypes.bool,
  log: PropTypes.string,
  logIsLoading: PropTypes.bool,
  logHasErrored: PropTypes.bool,
  getLog: PropTypes.func,
};

AdministratorPage.defaultProps = {
  isLoading: false,
  logsIsLoading: false,
  onDownloadClick: EMPTY_FUNCTION,
  logsList: [],
  logsListIsLoading: false,
  logsListHasErrored: false,
  log: '',
  logIsLoading: false,
  logHasErrored: false,
  getLog: EMPTY_FUNCTION,
};

export default AdministratorPage;
