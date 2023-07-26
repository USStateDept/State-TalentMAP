import { Route, Switch } from 'react-router-dom';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/Agenda/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/Agenda/AgendaItemHistory/AgendaItemHistory';
import AgendaItemMaintenanceContainer from 'Components/Agenda/AgendaItemMaintenanceContainer/AgendaItemMaintenanceContainer';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch/PanelMeetingSearch';
import PanelMeetingAgendas from 'Components/Panel/PanelMeetingAgendas/PanelMeetingAgendas';
import CycleManagement from 'Components/CycleManagement';
import CyclePositionSearch from 'Components/CycleManagement/CyclePositionSearch';

const AoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/ao/employeeagendas" render={() => <EmployeeAgendaSearch isCDO={false} viewType="ao" />} />
      <Route path="/profile/ao/agendaitemhistory/:id" render={() => <AgendaItemHistory isCDO={false} viewType="ao" />} />
      <Route path="/profile/ao/createagendaitem/:id/:agendaID" render={() => <AgendaItemMaintenanceContainer isCDO={false} />} />
      <Route path="/profile/ao/createagendaitem/:id" render={() => <AgendaItemMaintenanceContainer isCDO={false} />} />
      <Route path="/profile/ao/panelmeetings" render={() => <PanelMeetingSearch isCDO={false} />} />
      <Route path="/profile/ao/availablebidders" render={() => <AvailableBidderContainer isCDO={false} isAO />} />
      <Route path="/profile/ao/panelmeetingagendas/:pmID" render={() => <PanelMeetingAgendas isAO />} />
      <Route path="/profile/ao/cyclemanagement" render={() => <CycleManagement isAO />} />
      <Route path="/profile/ao/cyclepositionsearch/:id" render={() => <CyclePositionSearch isAO />} />
    </Switch>
  </div>
);

export default AoPage;
