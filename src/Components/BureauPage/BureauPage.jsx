import { Route, Switch } from 'react-router-dom';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import Dashboard from './Dashboard';
import Stats from './Stats';
import PositionManager from './PositionManager';
import PositionManagerDetails from './PositionManagerDetails';

const BureauPage = () => {
  const dashboardProps = {
    placeholderText: 'I am the Bureau Dashboard',
  };

  const statsProps = {
    placeholderText: 'I am the Bureau Stats',
  };

  const posManagerProps = {
    fromBureauMenu: true,
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/(bureau|ao)/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/bureau/stats" render={() => <Stats {...statsProps} />} />
        <Route path="/profile/bureau/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
        <Route path="/profile/bureau/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
        <Route path="/profile/bureau/availablebidders" render={() => <AvailableBidderContainer isCDO={false} />} />
      </Switch>
    </div>
  );
};

export default BureauPage;
