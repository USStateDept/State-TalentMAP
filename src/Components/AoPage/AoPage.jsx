import { Route, Switch } from 'react-router-dom';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/Agenda/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/Agenda/AgendaItemHistory/AgendaItemHistory';
import AgendaItemMaintenanceContainer from 'Components/Agenda/AgendaItemMaintenanceContainer/AgendaItemMaintenanceContainer';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch/PanelMeetingSearch';
import PanelMeetingAgendas from 'Components/Panel/PanelMeetingAgendas/PanelMeetingAgendas';
import CycleManagement from 'Components/CycleManagement';
import CyclePositionSearch from 'Components/CycleManagement/CyclePositionSearch';
import AssignmentCycleEdit from 'Components/CycleManagement/AssignmentCycleEdit';
import PublishablePositions from 'Components/PublishablePositions/PublishablePositions';
import Assignments from 'Components/Assignments';
import BidderPortfolio from 'Containers/BidderPortfolio';
import BiddingTool from '../BiddingFunctionsPage/BiddingTool/BiddingTool';

const AoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/ao/employeeagendas" render={() => <EmployeeAgendaSearch isCDO={false} viewType="ao" />} />
      <Route path="/profile/ao/agendaitemhistory/:id" render={() => <AgendaItemHistory isCDO={false} viewType="ao" />} />
      <Route path="/profile/ao/editagendaitem/:id/:agendaID" render={() => <AgendaItemMaintenanceContainer isCDO={false} />} />
      <Route path="/profile/ao/createagendaitem/:id" render={() => <AgendaItemMaintenanceContainer isCDO={false} />} />
      <Route path="/profile/ao/panelmeetings" render={() => <PanelMeetingSearch isCDO={false} />} />
      <Route path="/profile/ao/availablebidders" render={() => <AvailableBidderContainer isCDO={false} isAO />} />
      <Route path="/profile/ao/panelmeetingagendas/:pmID" render={() => <PanelMeetingAgendas isAO />} />
      <Route path="/profile/ao/cyclemanagement" render={() => <CycleManagement isAO />} />
      <Route path="/profile/ao/assginmentcycle/:id" render={() => <AssignmentCycleEdit />} />
      <Route path="/profile/ao/cyclepositionsearch/:id" render={() => <CyclePositionSearch isAO />} />
      <Route path="/profile/ao/publishablepositions" render={() => <PublishablePositions viewType="ao" />} />
      <Route path="/profile/ao/:id/assignments" render={(props) => <Assignments {...props} />} />
      <Route path="/profile/ao/bidderportfolio" render={() => <BidderPortfolio viewType="ao" />} />
      <Route path="/profile/ao/biddingtool/:id" render={() => <BiddingTool />} />
      <Route path="/profile/ao/biddingtool/" render={() => <BiddingTool />} />
    </Switch>
  </div>
);

export default AoPage;
