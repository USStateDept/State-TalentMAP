import { Route, Switch } from 'react-router-dom';
import BiddingTool from './BiddingTool/BiddingTool';

const BiddingFunctionsPage = () => {
  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/biddingfunctions/biddingtool/:id" render={() => <BiddingTool />} />
        <Route path="/profile/biddingfunctions/biddingtool/" render={() => <BiddingTool />} />
      </Switch>
    </div>
  );
};

export default BiddingFunctionsPage;
