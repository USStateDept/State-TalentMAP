import { Route, Switch } from 'react-router-dom';
import BidderPortfolio from 'Containers/BidderPortfolio';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/Agenda/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/Agenda/AgendaItemHistory/AgendaItemHistory';
import AgendaItemMaintenanceContainer from 'Components/Agenda/AgendaItemMaintenanceContainer/AgendaItemMaintenanceContainer';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch/PanelMeetingSearch';
import PanelMeetingAgendas from 'Components/Panel/PanelMeetingAgendas/PanelMeetingAgendas';

const CdoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/cdo/availablebidders" render={() => <AvailableBidderContainer isCDO isAO={false} />} />
      <Route path="/profile/cdo/bidderportfolio" render={() => <BidderPortfolio viewType="cdo" />} />
      <Route path="/profile/cdo/employeeagendas" render={() => <EmployeeAgendaSearch isCDO viewType="cdo" />} />
      <Route path="/profile/cdo/agendaitemhistory/:id" render={() => <AgendaItemHistory isCDO viewType="cdo" />} />
      <Route path="/profile/cdo/createagendaitem/:id/:agendaID" render={() => <AgendaItemMaintenanceContainer isCDO />} />
      <Route path="/profile/cdo/createagendaitem/:id" render={() => <AgendaItemMaintenanceContainer isCDO />} />
      <Route path="/profile/cdo/panelmeetings" render={() => <PanelMeetingSearch isCDO />} />
      <Route path="/profile/cdo/panelmeetingagendas/:pmID" render={() => <PanelMeetingAgendas isCDO />} />
    </Switch>
  </div>
);

export default CdoPage;
