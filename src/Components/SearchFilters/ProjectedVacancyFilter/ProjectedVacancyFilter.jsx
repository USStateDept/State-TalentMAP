import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../../Toggle';

// This will probably have state in the future
// eslint-disable-next-line react/prefer-stateless-function
class ProjectedVacancyFilter extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className="projected-vacancy-filter-container">
        <Toggle items={items} />
      </div>
    );
  }
}

ProjectedVacancyFilter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

ProjectedVacancyFilter.defaultProps = {
  items: [
    {
      label: 'Open Positions',
      value: 'open',
    },
    {
      label: 'Projected Vancancies',
      value: 'projected',
    },
  ],
};

export default ProjectedVacancyFilter;
