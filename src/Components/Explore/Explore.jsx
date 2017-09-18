import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import ExploreRegionDropdown from '../../Components/ExploreRegionDropdown/ExploreRegionDropdown';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      selectedRegion: { value: '' },
    };
  }
  onRegionChange(e) {
    const { selectedRegion } = this.state;
    selectedRegion.value = e;
    this.setState({ selectedRegion });
  }
  render() {
    const { filters, onRegionSubmit } = this.props;
    const { selectedRegion } = this.state;
    return (
      <div className="explore-section">
        <div className="explore-section-inner usa-grid-full">
          <ExploreRegionDropdown
            filters={filters}
            onRegionSubmit={onRegionSubmit}
            selectRegion={this.onRegionChange}
          />
          <div className="explore-map-container">
            <img
              alt="world map"
              src={`/assets/img/gray-world-map-${selectedRegion.value}.png`}
              className="explore-map"
            />
          </div>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  filters: ITEMS.isRequired,
  onRegionSubmit: PropTypes.func.isRequired,
};

export default Explore;
