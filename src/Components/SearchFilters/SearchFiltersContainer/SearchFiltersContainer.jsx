import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../CheckBox/CheckBox';

const shortid = require('shortid');

class SearchFiltersContainer extends Component { // eslint-disable-line
  render() {
    const booleanFilters = this.props.filters.filter(searchFilter => searchFilter.item.bool);
    return (
      <div>
        {
          booleanFilters
            .map(item =>
              (<CheckBox
                key={shortid.generate()}
                id={`checkbox-${item.item.title}`}
                label="Yes"
                title={item.item.title}
                name={item.item.title}
                value={item.data.code}
                selectionRef={item.item.selectionRef}
                legend={item.item.title}
                onCheckBoxClick={(p, v) => this.props.onBooleanFilterClick(p, v)}
              />),
            )
        }
      </div>
    );
  }
}

SearchFiltersContainer.propTypes = {
  filters: PropTypes.object, // eslint-disable-line
  onBooleanFilterClick: PropTypes.func.isRequired,
};

export default SearchFiltersContainer;
