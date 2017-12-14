import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY } from '../../Constants/PropTypes';
import ExploreRegionDropdown from '../../Components/ExploreRegionDropdown/ExploreRegionDropdown';
import { getAssetPath } from '../../utilities';

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
    const map = getAssetPath(`/assets/img/gray-world-map-${selectedRegion.value}.png`);
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
              src={map}
              className="explore-map"
            />
          </div>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  onRegionSubmit: PropTypes.func.isRequired,
};

export default Explore;
