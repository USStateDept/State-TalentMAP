import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ITEMS } from '../../Constants/PropTypes';
import FieldSet from '../../Components/FieldSet/FieldSet';
import SelectForm from '../../Components/SelectForm/SelectForm';

class ExploreRegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.selectRegion = this.selectRegion.bind(this);
    this.searchRegion = this.searchRegion.bind(this);
    this.state = {
      selection: { value: '' },
    };
  }

  selectRegion(e) {
    const { selection } = this.state;
    selection.value = e.target.value;
    this.setState({ selection });
  }

  searchRegion(e) {
    e.preventDefault();
    this.props.onRegionSubmit(this.state.selection.value);
  }

  render() {
    const { filters } = this.props;
    // function to find the Region filters
    function filterRegion(filterItem) {
      return (filterItem.item && filterItem.item.title === 'Region');
    }
    // set an array so we can render in case we don't find Region
    let regions = [];
    // find the Region filters
    // use .filter and [0] instead of .find because .find breaks pa11y test
    const foundRegion = filters.filter(filterRegion)[0];
    // if found, set foundRegion to a copy of the data
    if (foundRegion && foundRegion.data) { regions = foundRegion.data.slice(); }
    if (regions) {
      regions.forEach((region, i) => {
        // set up our prop names so that SelectForm can read them
        regions[i].text = region.long_description;
        regions[i].value = region.code;
      });
      // also add a placeholder to the top
      regions.unshift(
        {
          text: 'Select a region',
          value: '',
          disabled: true,
        },
      );
    }

    const { selection } = this.state;
    return (
      <div className="usa-form">
        <form onSubmit={this.searchRegion}>
          <div className="usa-width-one-half explore-region-fieldset">
            <FieldSet legend="region" legendSrOnly>
              <SelectForm
                id="explore-region-dropdown"
                label="Explore by Region"
                onSelectOption={this.selectRegion}
                options={regions}
              />
            </FieldSet>
          </div>
          <div className="usa-width-one-half view-results-button">
            <button
              disabled={!selection.value.length}
              className="usa-button"
              type="submit"
            >
              {selection.value.length ? 'View results' : 'Select region'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ExploreRegionDropdown.propTypes = {
  filters: ITEMS.isRequired,
  onRegionSubmit: PropTypes.func.isRequired,
};

ExploreRegionDropdown.defaultProps = {
};

export default ExploreRegionDropdown;
