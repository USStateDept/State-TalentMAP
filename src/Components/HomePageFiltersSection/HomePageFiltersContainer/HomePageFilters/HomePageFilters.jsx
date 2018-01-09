import React from 'react';
import PropTypes from 'prop-types';
import SkillCodeFilter from '../../SkillCodeFilter';
import Form from '../../../Form';
import FieldSet from '../../../FieldSet/FieldSet';
import { FILTER_ITEMS_ARRAY } from '../../../../Constants/PropTypes';

const HomePageFiltersSection = ({ filters, submitSearch, onFilterSelect, isLoading }) => {
  const skillCodes = filters.find(f => f.item && f.item.description === 'skill');
  const skillCodesData = skillCodes ? skillCodes.data : [];
  return (
    <div className="usa-grid-full">
      <Form className="usa-grid-full" onFormSubmit={submitSearch}>
        <FieldSet
          legend="Search by Skill Code"
        >
          <SkillCodeFilter
            filters={skillCodesData}
            onFilterSelect={onFilterSelect}
            isLoading={isLoading}
          />
        </FieldSet>
        <button
          className="saved-search-form-secondary-button"
          onClick={submitSearch}
        >
          Search
        </button>
      </Form>
    </div>
  );
};

HomePageFiltersSection.propTypes = {
  filters: FILTER_ITEMS_ARRAY.isRequired,
  submitSearch: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

HomePageFiltersSection.defaultProps = {
  isLoading: false,
};

export default HomePageFiltersSection;
