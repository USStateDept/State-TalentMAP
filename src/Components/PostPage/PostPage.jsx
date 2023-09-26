import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvailableBidderContainer from 'Components/AvailableBidder/AvailableBidderContainer';
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
        <Route path="/profile/post/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
        <Route path="/profile/post/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
        <Route path="/profile/post/availablebidders" render={() => <AvailableBidderContainer isCDO={false} isPost />} />
        <Route path="/profile/post/biddingtool/:id" render={() => <BiddingTool />} />
        <Route path="/profile/post/biddingtool/" render={() => <BiddingTool />} />
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
