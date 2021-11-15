import { Route, Switch } from 'react-router-dom';
import BidderPortfolio from 'Containers/BidderPortfolio';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import EmployeeAgendaSearch from 'Components/EmployeeAgendaSearch/EmployeeAgendaSearch';
import AgendaItemHistory from 'Components/EmployeeAgendaSearch/AgendaItemHistory';

const CdoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/cdo/availablebidders" render={() => <AvailableBidderContainer isCDO />} />
      <Route path="/profile/cdo/bidderportfolio" render={() => <BidderPortfolio />} />
      <Route path="/profile/cdo/employeeagendasearch" render={() => <EmployeeAgendaSearch />} />
      <Route path="/profile/cdo/agendaitemhistory/perdet" render={() => <AgendaItemHistory />} />
    </Switch>
  </div>
);

export default CdoPage;
