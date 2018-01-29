import React from 'react';
import PropTypes from 'prop-types';
import HomePageFiltersContainer from './HomePageFiltersContainer';
import { FILTER_ITEMS_ARRAY, USER_SKILL_CODE_ARRAY } from '../../Constants/PropTypes';

const HomePageFiltersSection = ({ filters, isLoading, userSkills }) => (
  <div className="explore-section padded-main-content">
    <div className="usa-grid-full explore-section-inner">
      <HomePageFiltersContainer filters={filters} isLoading={isLoading} userSkills={userSkills} />
    </div>
  </div>
);

HomePageFiltersSection.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  isLoading: PropTypes.bool,
  userSkills: USER_SKILL_CODE_ARRAY,
};

HomePageFiltersSection.defaultProps = {
  isLoading: false,
  userSkills: [],
};

export default HomePageFiltersSection;
