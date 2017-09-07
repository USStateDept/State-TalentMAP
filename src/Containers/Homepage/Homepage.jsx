import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import ResultsSearchHeader from '../../Components/ResultsSearchHeader/ResultsSearchHeader';
import ExploreRegionDropdown from '../../Components/ExploreRegionDropdown/ExploreRegionDropdown';

class Results extends Component {
  constructor(props) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
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
        <div className="explore-section">
          <div className="explore-section-inner usa-grid-full">
            <div>
              <ExploreRegionDropdown
                filters={filters}
              />
            </div>
            <div className="explore-map-container">
              <img alt="world map" src="/assets/img/gray-world-map.png" className="explore-map" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  filters: ITEMS.isRequired,
};

Results.defaultProps = {
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
