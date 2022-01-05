import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import { comparisonsFetchData } from 'actions/comparisons';
import { bidListFetchData } from 'actions/bidList';
import CompareList from 'Components/CompareList/CompareList';
import { BID_LIST, COMPARE_LIST, SetType, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_USER_PROFILE } from 'Constants/DefaultProps';
import { LOGIN_REDIRECT } from '../../login/routes';

export class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  UNSAFE_componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else {
      const ids = get(this, 'props.match.params.ids');
      if (ids) { this.getComparisons(ids); }
      this.props.fetchBidList();
    }
  }

  onToggle = id => {
    let compareArray = this.props.match.params.ids.split(',');
    compareArray = compareArray.filter(f => f !== String(id));
    const compareString = compareArray.toString();
    this.props.onNavigateTo(`/compare/${compareString}`);
    this.getComparisons(`${compareString}`);
  };

  getComparisons(ids) {
    this.props.fetchData(ids);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { comparisons, hasErrored, isLoading, userProfile, bidList,
      bidListToggleIsLoading } = this.props;
    return (
      <CompareList
        compare={comparisons}
        favorites={userProfile.favorite_positions}
        hasErrored={hasErrored}
        isLoading={isLoading}
        onToggle={this.onToggle}
        bidList={bidList}
        bidListToggleIsLoading={bidListToggleIsLoading}
      />
    );
  }
}

Compare.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      ids: PropTypes.string,
    }),
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  comparisons: COMPARE_LIST,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  bidList: BID_LIST,
  bidListToggleIsLoading: SetType,
  fetchBidList: PropTypes.func.isRequired,
};

Compare.defaultProps = {
  comparisons: [],
  hasErrored: false,
  isLoading: true,
  bidList: { results: [] },
  userProfile: DEFAULT_USER_PROFILE,
  bidListToggleIsLoading: new Set(),
};

Compare.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  comparisons: state.comparisons,
  hasErrored: state.comparisonsHasErrored,
  isLoading: state.comparisonsIsLoading,
  userProfile: state.userProfile,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(comparisonsFetchData(url)),
  fetchBidList: () => dispatch(bidListFetchData()),
  onNavigateTo: dest => dispatch(push(dest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Compare));
