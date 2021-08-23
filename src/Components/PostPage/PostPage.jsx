import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import PositionManager from '../BureauPage/PositionManager';
import PositionManagerDetails from '../BureauPage/PositionManagerDetails';

const PostPage = props => {
  const dashboardProps = {
    placeholderText: 'Post Dashboard',
  };

  // eslint-disable-next-line no-unused-vars
  const posManagerProps = {
    isPost: props.isPost,
    fromPostMenu: true,
  };

  return (
    <div className="usa-grid-full profile-content-container">
      <Switch>
        <Route path="/profile/post/dashboard" render={() => <Dashboard {...dashboardProps} />} />
        <Route path="/profile/post/positionmanager" render={() => <PositionManager {...posManagerProps} />} />
        <Route path="/profile/post/positionmanager/:type/:id" render={() => <PositionManagerDetails />} />
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
