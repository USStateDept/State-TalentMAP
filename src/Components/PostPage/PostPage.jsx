import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PublishablePositions from 'Components/PublishablePositions/PublishablePositions';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
import CyclePositionSearch from 'Components/CycleManagement/CyclePositionSearch';
import CycleManagement from 'Components/CycleManagement';
import PositionManager from '../BureauPage/PositionManager';
import PositionManagerDetails from '../BureauPage/PositionManagerDetails';
import BiddingTool from '../BiddingFunctionsPage/BiddingTool/BiddingTool';

const PostPage = props => {
  const posManagerProps = {
    isPost: props.isPost,
    fromPostMenu: true,
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/post/positionmanager/:type/:id" render={() => <PositionManagerDetails viewType="post" />} />
        <Route path="/profile/post/positionmanager" render={() => <PositionManager {...posManagerProps} viewType="post" />} />
        <Route path="/profile/post/availablebidders" render={() => <AvailableBidderContainer isCDO={false} isPost />} />
        <Route path="/profile/post/biddingtool/:id" render={() => <BiddingTool />} />
        <Route path="/profile/post/biddingtool/" render={() => <BiddingTool />} />
        <Route path="/profile/post/publishablepositions" render={() => <PublishablePositions viewType="post" />} />
        <Route path="/profile/post/cyclemanagement/positions" render={() => <CyclePositionSearch viewType="post" />} />
        <Route path="/profile/post/cyclemanagement" render={() => <CycleManagement viewType="post" />} />
      </Switch>
    </div>
  );
};

PostPage.propTypes = {
  isPost: PropTypes.bool,
};

PostPage.defaultProps = {
  isPost: false,
};

export default PostPage;
