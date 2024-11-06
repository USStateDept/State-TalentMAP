import { Route, Switch } from 'react-router-dom';
import MaintainEntryLevelPositions from './MaintainELPositions';

const EntryLevelPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/entrylevel/maintainpositions" render={() => <MaintainEntryLevelPositions />} />
    </Switch>
  </div>
);

export default EntryLevelPage;
