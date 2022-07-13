import { Route, Switch } from 'react-router-dom';
import BidderPortfolio from 'Containers/BidderPortfolio';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/Agenda/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/Agenda/AgendaItemHistory/AgendaItemHistory';
import AgendaItemMaintenanceContainer from 'Components/Agenda/AgendaItemMaintenanceContainer/AgendaItemMaintenanceContainer';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch/PanelMeetingSearch';

const CdoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/cdo/availablebidders" render={() => <AvailableBidderContainer isCDO />} />
      <Route path="/profile/cdo/bidderportfolio" render={() => <BidderPortfolio />} />
      <Route path="/profile/cdo/employeeagendas" render={() => <EmployeeAgendaSearch isCDO />} />
      <Route path="/profile/cdo/agendaitemhistory/:id" render={() => <AgendaItemHistory isCDO />} />
      <Route path="/profile/cdo/createagendaitem/:id" render={() => <AgendaItemMaintenanceContainer isCDO />} />
      <Route path="/profile/cdo/panelmeetings" render={() => <PanelMeetingSearch isCDO />} />
    </Switch>
  </div>
);

export default CdoPage;
