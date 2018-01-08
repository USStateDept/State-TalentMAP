import React from 'react';
import PropTypes from 'prop-types';
import HomePageFiltersContainer from './HomePageFiltersContainer';
import { FILTER_ITEMS_ARRAY } from '../../Constants/PropTypes';

const HomePageFiltersSection = ({ filters, isLoading }) => (
  <div className="explore-section">
    <div className="explore-section-inner usa-grid-full">
      <HomePageFiltersContainer filters={filters} isLoading={isLoading} />
    </div>
  </div>
);

HomePageFiltersSection.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
};

HomePageFiltersSection.defaultProps = {
  isLoading: false,
};

export default HomePageFiltersSection;
