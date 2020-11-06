import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { bidListFetchData } from '../../actions/bidList';
import HomePage from '../../Containers/HomePage/HomePage';
import { BID_LIST } from '../../Constants/PropTypes';
import { LOGIN_REDIRECT } from '../../login/routes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentDidMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else {
      this.props.bidListFetchData();
    }
  }

  onChildSubmit(e) {
    this.props.onNavigateTo(e);
  }

  render() {
    const { onNavigateTo, userProfileIsLoading, bidList } = this.props;
    return (
      <HomePage
        onNavigateTo={onNavigateTo}
        userProfileIsLoading={userProfileIsLoading}
        bidList={bidList.results}
      />
    );
  }
}

Home.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfileIsLoading: PropTypes.bool,
  bidList: BID_LIST.isRequired,
  bidListFetchData: PropTypes.func.isRequired,
};

Home.defaultProps = {
  userProfileIsLoading: false,
  bidList: { results: [] },
};

const mapStateToProps = state => ({
  userProfileIsLoading: state.userProfileIsLoading,
  bidList: state.bidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
  bidListFetchData: () => dispatch(bidListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
