import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import PanelAdmin from 'Components/AdministratorPage/PanelAdmin';
import PanelRemarks from 'Components/AdministratorPage/PanelRemarks';
import PanelMeetingSearch from 'Components/Panel/PanelMeetingSearch';

const PanelAdministratorPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/panel_admin/panel/" render={() => <PanelAdmin />} />
      <Route path="/profile/panel_admin/panelremarks/" render={() => <PanelRemarks />} />
      <Route path="/profile/panel_admin/panelmeetings" render={() => <PanelMeetingSearch isCDO={false} />} />
    </Switch>
  </div>
);

PanelAdministratorPage.propTypes = {
};

PanelAdministratorPage.defaultProps = {
};

export default PanelAdministratorPage;
