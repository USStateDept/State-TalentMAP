import React from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import ExploreRegionDropdown from '../../Components/ExploreRegionDropdown/ExploreRegionDropdown';

const Explore = ({ filters, onRegionSubmit }) => (
  <div className="explore-section">
    <div className="explore-section-inner usa-grid-full">
      <ExploreRegionDropdown
        filters={filters}
        onRegionSubmit={onRegionSubmit}
      />
      <div className="explore-map-container">
        <img alt="world map" src="/assets/img/gray-world-map.png" className="explore-map" />
      </div>
    </div>
  </div>
);

Explore.propTypes = {
  filters: ITEMS.isRequired,
  onRegionSubmit: PropTypes.func.isRequired,
};

export default Explore;
