import { Route, Switch } from 'react-router-dom';
import PanelAdmin from 'Components/AdministratorPage/PanelAdmin';
import PanelRemarks from 'Components/AdministratorPage/PanelRemarks';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch';
import PanelMeetingAgendas from 'Components/Panel/PanelMeetingAgendas';

const PanelAdministratorPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/panel_admin/panel/" render={() => <PanelAdmin />} />
      <Route path="/profile/panel_admin/panelremarks/" render={() => <PanelRemarks />} /> {/* update route on menu to point here */}
      <Route path="/profile/panel_admin/panelmeetings/agendas" render={(props) => <PanelMeetingAgendas {...props} />} />
      <Route path="/profile/panel_admin/panelmeetings" render={() => <PanelMeetingSearch isCDO={false} />} />
    </Switch>
  </div>
);

export default PanelAdministratorPage;
