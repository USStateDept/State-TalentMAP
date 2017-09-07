import React, { Component } from 'react';
import { ITEMS } from '../../Constants/PropTypes';
import SelectForm from '../../Components/SelectForm/SelectForm';

class ExploreRegionDropdown extends Component { // eslint-disable-line
  render() {
    const { filters } = this.props;
    function filterRegion(filterItem) {
      return (filterItem.item && filterItem.item.title === 'Region');
    }
    const regions = filters.slice().find(filterRegion).data;
    regions.forEach((region, i) => {
      regions[i].text = region.long_description;
      regions[i].value = region.code;
    });
    return (
      <div className="usa-form">
        <SelectForm
          id="explore-region-dropdown"
          label="Explore by Region"
          onSelectOption={() => {}}
          options={regions}
        />
      </div>
    );
  }
}

ExploreRegionDropdown.propTypes = {
  filters: ITEMS.isRequired,
};

ExploreRegionDropdown.defaultProps = {
};

export default ExploreRegionDropdown;
