import { Route, Switch } from 'react-router-dom';
import PanelRemarks from 'Components/AdministratorPage/PanelRemarks';

const PanelAdministratorPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/panel_admin/panelremarks/" render={() => <PanelRemarks />} />
    </Switch>
  </div>
);

export default PanelAdministratorPage;
