import { Route, Switch } from 'react-router-dom';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import PublishablePositions from 'Components/PublishablePositions/PublishablePositions';
import CycleManagement from 'Components/CycleManagement';
import CyclePositionSearch from 'Components/CycleManagement/CyclePositionSearch';
import PositionManager from './PositionManager';
import PositionManagerDetails from './PositionManagerDetails';
import ProjectedVacancy from './ProjectedVacancy';
import SearchPostAccess from './SearchPostAccess';

const BureauPage = () => {
  const posManagerProps = {
    fromBureauMenu: true,
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/bureau/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
        <Route path="/profile/bureau/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
        <Route path="/profile/bureau/availablebidders" render={() => <AvailableBidderContainer isCDO={false} />} />
        <Route path="/profile/bureau/projectedvacancy" render={() => <ProjectedVacancy isCDO={false} isAO={false} />} />
        <Route path="/profile/bureau/publishablepositions" render={() => <PublishablePositions />} />
        <Route path="/profile/bureau/cyclemanagement" render={() => <CycleManagement isAO={false} />} />
        <Route path="/profile/bureau/cyclepositionsearch/:id" render={() => <CyclePositionSearch />} />
        <Route path="/profile/bureau/searchpostaccess" render={() => <SearchPostAccess />} />
      </Switch>
    </div>
  );
};

export default BureauPage;
