import { Route, Switch } from 'react-router-dom';
import BidderPortfolio from 'Containers/BidderPortfolio';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';

const CdoPage = () => (
  <div className="usa-grid-full profile-content-container">
    <Switch>
      <Route path="/profile/cdo/availablebidders" render={() => <AvailableBidderContainer isCDO />} />
      <Route path="/profile/cdo/bidderportfolio" render={() => <BidderPortfolio />} />
    </Switch>
  </div>
);

export default CdoPage;
