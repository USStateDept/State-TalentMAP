import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Stats from './Stats';
import PositionLists from './PositionLists';
import PositionManager from './PositionManager';

const BureauPage = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    isLoading,
  } = props;

  const dashboardProps = {
    placeholderText: 'I am the Bureau Dashboard',
  };

  const statsProps = {
    placeholderText: 'I am the Bureau Stats',
  };

  const posListsProps = {
    placeholderText: 'I am the Bureau Position Lists',
  };

  const posManagerProps = {
    placeholderText: 'I am the Bureau Position Manager',
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/bureau/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/bureau/stats" render={() => <Stats {...statsProps} />} />
        <Route path="/profile/bureau/positionlists" render={() => <PositionLists {...posListsProps} />} />
        <Route path="/profile/bureau/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
      </Switch>
    </div>
  );
};

BureauPage.propTypes = {
  isLoading: PropTypes.bool,
};

BureauPage.defaultProps = {
  isLoading: false,
};

export default BureauPage;
