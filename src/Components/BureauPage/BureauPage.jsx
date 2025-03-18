import { Route, Switch } from 'react-router-dom';
import { AssignmentCycleEdit, CycleClassifications, CycleManagement, CyclePositionSearch } from 'Components/CycleManagement';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import PublishablePositions from 'Components/PublishablePositions/PublishablePositions';
import PositionManager from './PositionManager';
import PositionManagerDetails from './PositionManagerDetails';
import ProjectedVacancy from './ProjectedVacancy';
import ManagePostAccess from '../ManagePostAccess/ManagePostAccess';
import SearchPostAccess from './SearchPostAccess';
import BiddingTool from '../BiddingFunctionsPage/BiddingTool/BiddingTool';

const BureauPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/bureau/availablebidders" render={() => <AvailableBidderContainer isCDO={false} />} />
      <Route path="/profile/bureau/managepostaccess" render={() => <ManagePostAccess />} />
      <Route path="/profile/bureau/positionmanager/:type/:id" render={() => <PositionManagerDetails viewType="bureau" />} />
      <Route path="/profile/bureau/positionmanager" render={() => <PositionManager viewType="bureau" />} />
      <Route path="/profile/bureau/projectedvacancy" render={() => <ProjectedVacancy viewType="bureau" />} />
      <Route path="/profile/bureau/publishablepositions" render={() => <PublishablePositions viewType="bureau" />} />
      <Route path="/profile/bureau/searchpostaccess" render={() => <SearchPostAccess />} />
      <Route path="/profile/bureau/biddingtool/:id" render={() => <BiddingTool />} />
      <Route path="/profile/bureau/biddingtool/" render={() => <BiddingTool />} />
      <Route path="/profile/bureau/cyclemanagement/positions" render={() => <CyclePositionSearch viewType="bureau" />} />
      <Route path="/profile/bureau/cyclemanagement" render={() => <CycleManagement viewType="bureau" />} />
      <Route path="/profile/bureau/cycleclassifications/" render={() => <CycleClassifications />} />
      <Route path="/profile/bureau/assignmentcycle/:id" render={() => <AssignmentCycleEdit />} />
    </Switch>
  </div>
);

export default BureauPage;
