import React from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import Toggle from '../../Toggle';

const TandemSelectionFilter = ({ onChange }) => {
  const onChange$ = (val) => {
    onChange(val);
  };
  const items$ = [
    { label: 'Tandem 1', value: '1' },
    { label: 'Tandem 2', value: '2' },
  ];
  return (
    <div className="tandem-filter-container">
      <Toggle items={items$} onChange={onChange$} />
    </div>
  );
};

TandemSelectionFilter.propTypes = {
  onChange: PropTypes.func,
};

TandemSelectionFilter.defaultProps = {
  onChange: EMPTY_FUNCTION,
};

export default TandemSelectionFilter;
