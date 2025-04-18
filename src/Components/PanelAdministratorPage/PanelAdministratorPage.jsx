import { Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import PanelAdmin from 'Components/AdministratorPage/PanelAdmin';

const PanelAdministratorPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/panel_admin/panel/" render={() => <PanelAdmin />} />
    </Switch>
  </div>
);

PanelAdministratorPage.propTypes = {
};

PanelAdministratorPage.defaultProps = {
};

export default PanelAdministratorPage;
