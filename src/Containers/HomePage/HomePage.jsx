import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import ENDPOINT_PARAMS from '../../Constants/EndpointParams';
import ResultsSearchHeader from '../../Components/ResultsSearchHeader/ResultsSearchHeader';
import Explore from '../../Components/Explore/Explore';
import NewPositionsSection from '../../Components/NewPositionsSection';
// import PopularPositionsSection from '../../Components/PopularPositionsSection';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.submitRegion = this.submitRegion.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
  }

  submitRegion(q) {
    this.props.onNavigateTo(`/results?${ENDPOINT_PARAMS.org}=${q}`);
  }

  render() {
    const { filters } = this.props;
    return (
      <div className="home">
        <div className="results results-search-bar-homepage">
          <ResultsSearchHeader
            onUpdate={this.submitSearch}
          />
        </div>
        <Explore
          filters={filters}
          onRegionSubmit={this.submitRegion}
        />
        <div className="usa-grid-full positions-section">
          <NewPositionsSection />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  filters: ITEMS.isRequired,
};

export default HomePage;
