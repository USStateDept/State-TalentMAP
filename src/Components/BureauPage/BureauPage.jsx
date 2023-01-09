import { Route, Switch } from 'react-router-dom';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/Agenda/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/Agenda/AgendaItemHistory/AgendaItemHistory';
import AgendaItemMaintenanceContainer from 'Components/Agenda/AgendaItemMaintenanceContainer/AgendaItemMaintenanceContainer';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch/PanelMeetingSearch';
import EditPositionDetails from 'Components/EditPositionDetails/EditPositionDetails';
import PanelMeetingAgendas from 'Components/Panel/PanelMeetingAgendas/PanelMeetingAgendas';
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
        <Route path="/profile/ao/employeeagendas" render={() => <EmployeeAgendaSearch isCDO={false} viewType="ao" />} />
        <Route path="/profile/ao/agendaitemhistory/:id" render={() => <AgendaItemHistory isCDO={false} viewType="ao" />} />
        <Route path="/profile/ao/createagendaitem/:id/:agendaID" render={() => <AgendaItemMaintenanceContainer isCDO={false} isCreate={false} />} />
        <Route path="/profile/ao/createagendaitem/:id" render={() => <AgendaItemMaintenanceContainer isCDO={false} isCreate />} />
        <Route path="/profile/ao/panelmeetings" render={() => <PanelMeetingSearch isCDO={false} />} />
        <Route path="/profile/ao/availablebidders" render={() => <AvailableBidderContainer isCDO={false} isAO />} />
        <Route path="/profile/ao/panelmeetingagendas" render={() => <PanelMeetingAgendas isCDO={false} isAO />} />
        <Route path="/profile/(bureau|ao)/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/cdo/availablebidders" render={() => <AvailableBidderContainer isCDO isAO={false} />} />
        <Route path="/profile/bureau/stats" render={() => <Stats {...statsProps} />} />
        <Route path="/profile/bureau/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
        <Route path="/profile/bureau/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
        <Route path="/profile/bureau/availablebidders" render={() => <AvailableBidderContainer isCDO={false} />} />
        <Route path="/profile/bureau/positiondetails" render={() => <EditPositionDetails />} />
      </Switch>
    </div>
  );
};

export default BureauPage;
