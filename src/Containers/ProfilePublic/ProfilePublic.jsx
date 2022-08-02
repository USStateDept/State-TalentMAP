import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import ProfileDashboard from 'Components/ProfileDashboard';
import Alert from 'Components/Alert';
import { fetchClassifications } from 'actions/classifications';
import { userProfilePublicFetchData } from 'actions/userProfilePublic';
import { CLASSIFICATIONS, EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { registerHandshake, unregisterHandshake } from 'actions/handshake';
import { toggleBidPosition } from 'actions/bidList';

class ProfilePublic extends Component {
  UNSAFE_componentWillMount() {
    const id = get(this.props, 'match.params.id');
    const isBureauView = this.isBureauView();
    const isPostView = this.isPostView();
    const bureauOrPost = isBureauView || isPostView;
    this.props.fetchData(id, !bureauOrPost);
    if (!bureauOrPost) {
      this.props.fetchClassifications();
    }
  }

  isBureauView = () => {
    const viewType = get(this.props, 'match.params.viewType');
    const isBureauView = viewType === 'bureau';
    return isBureauView;
  }

  isPostView = () => {
    const viewType = get(this.props, 'match.params.viewType');
    return viewType === 'post';
  }

  render() {
    const {
      isLoading,
      hasErrored,
      userProfile,
      classifications,
      classificationsIsLoading,
      classificationsHasErrored,
      registerHandshakePosition,
      unregisterHandshakePosition,
      deleteBid,
    } = this.props;
    const { bidList } = userProfile;
    const clientClassifications = userProfile.classifications;
    const combinedLoading = isLoading || classificationsIsLoading;
    const combinedErrored = hasErrored || classificationsHasErrored;
    const isBureauView = this.isBureauView();
    const isPostView = this.isPostView();
    let props = {};
    if (isBureauView) {
      props = {
        ...props,
        showBidTracker: false,
        showAssignmentHistory: false,
        showClassifications: false,
        showSearchAsClient: false,
      };
    }
    if (isPostView) {
      props = {
        ...props,
        showBidTracker: false,
        showAssignmentHistory: false,
        showClassifications: false,
        showSearchAsClient: false,
      };
    }

    return (
      combinedErrored ?
        <Alert type="error" title="User not found" />
        :
        <ProfileDashboard
          userProfile={userProfile}
          isLoading={combinedLoading}
          bidList={bidList}
          classifications={classifications}
          clientClassifications={clientClassifications}
          registerHandshake={registerHandshakePosition}
          unregisterHandshake={unregisterHandshakePosition}
          deleteBid={deleteBid}
          isPublic
          {...props}
        />
    );
  }
}

ProfilePublic.propTypes = {
  userProfile: USER_PROFILE,
  fetchData: PropTypes.func,
  fetchClassifications: PropTypes.func,
  isLoading: PropTypes.bool,
  classificationsIsLoading: PropTypes.bool,
  classificationsHasErrored: PropTypes.bool,
  hasErrored: PropTypes.bool,
  classifications: CLASSIFICATIONS,
  registerHandshakePosition: PropTypes.func,
  unregisterHandshakePosition: PropTypes.func,
  deleteBid: PropTypes.func,
};

ProfilePublic.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  fetchData: EMPTY_FUNCTION,
  fetchClassifications: EMPTY_FUNCTION,
  hasErrored: false,
  classificationsIsLoading: true,
  classificationsHasErrored: false,
  classifications: [],
  registerHandshakePosition: EMPTY_FUNCTION,
  unregisterHandshakePosition: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
};

ProfilePublic.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfilePublic,
  isLoading: state.userProfilePublicIsLoading,
  hasErrored: state.userProfilePublicHasErrored,
  id: ownProps,
  classificationsIsLoading: state.classificationsIsLoading,
  classificationsHasErrored: state.classificationsHasErrored,
  classifications: state.classifications,
});

export const mapDispatchToProps = (dispatch, ownProps) => {
  const id$ = get(ownProps, 'match.params.id');
  const config = {
    fetchData: (id, includeBids) => dispatch(userProfilePublicFetchData(id, false, includeBids)),
    onNavigateTo: dest => dispatch(push(dest)),
    fetchClassifications: () => dispatch(fetchClassifications()),
    registerHandshakePosition: id => dispatch(registerHandshake(id, id$)),
    unregisterHandshakePosition: id => dispatch(unregisterHandshake(id, id$)),
    deleteBid: id => dispatch(toggleBidPosition(id, true, false, id$, true)),
  };
  return config;
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePublic));
