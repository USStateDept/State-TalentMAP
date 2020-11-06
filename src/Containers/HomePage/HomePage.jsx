import { Component } from 'react';
import PropTypes from 'prop-types';
import { BID_RESULTS } from '../../Constants/PropTypes';
import HomePagePositionsContainer from '../HomePagePositionsContainer/HomePagePositionsContainer';
import HomePageBanner from '../../Components/HomePageBanner';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  render() {
    const { userProfileIsLoading, bidList, onNavigateTo } = this.props;
    return (
      <div className="home content-container">
        <HomePageBanner />
        <HomePagePositionsContainer
          bidList={bidList}
          onNavigateTo={onNavigateTo}
          userProfileIsLoading={userProfileIsLoading}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  userProfileIsLoading: PropTypes.bool,
  bidList: BID_RESULTS.isRequired,
};

HomePage.defaultProps = {
  userProfileIsLoading: false,
  filtersIsLoading: false,
};

export default HomePage;
