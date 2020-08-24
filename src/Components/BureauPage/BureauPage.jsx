import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Stats from './Stats';
import PositionLists from './PositionLists';
import PositionManager from './PositionManager';
import PositionManagerDetails from './PositionManagerDetails';

const BureauPage = () => {
  const dashboardProps = {
    placeholderText: 'I am the Bureau Dashboard',
  };

  const statsProps = {
    placeholderText: 'I am the Bureau Stats',
  };

  const posListsProps = {
    placeholderText: 'I am the Bureau Position Lists',
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/bureau/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/bureau/stats" render={() => <Stats {...statsProps} />} />
        <Route path="/profile/bureau/positionlists" render={() => <PositionLists {...posListsProps} />} />
        <Route path="/profile/bureau/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
        <Route path="/profile/bureau/positionmanager" render={() => <PositionManager />} />
      </Switch>
    </div>
  );
};

export default BureauPage;
