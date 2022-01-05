import { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Toggle from '../../Toggle';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class ProjectedVacancyFilter extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    const item = nextProps.items.find(f => f.isSelected);
    if (item && item.code && this.toggleRef) {
      this.toggleRef.updateVal(item.code);
    }
    if (!item && get(nextProps, 'items[0].code') && this.toggleRef) {
      this.toggleRef.updateVal(nextProps.items[0].code);
    }
  }
  render() {
    const { items, onChange } = this.props;
    const items$ = items.map(m => {
      if (m.code === 'projected') {
        return { ...m, label: m.short_description, value: m.code, toggleClass: 'toggle-pv' };
      } else if (m.code === 'open') {
        return { ...m, label: m.short_description, value: m.code, toggleClass: 'toggle-ap' };
      }
      return { ...m, label: m.short_description, value: m.code, toggleClass: '' };
    });
    return (
      <div className="projected-vacancy-filter-container">
        <Toggle ref={(x) => { this.toggleRef = x; }} items={items$} onChange={onChange} />
      </div>
    );
  }
}

ProjectedVacancyFilter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    short_description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  onChange: PropTypes.func,
};

ProjectedVacancyFilter.defaultProps = {
  items: [],
  onChange: EMPTY_FUNCTION,
};

export default ProjectedVacancyFilter;
