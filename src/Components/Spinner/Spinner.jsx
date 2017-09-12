import React from 'react';
import PropTypes from 'prop-types';

// uses https://design.cms.gov/components/spinner/

const Spinner = ({ type, size, color, filled, inverse }) => (
  <div className={`tm-spinner tm-spinner-${type}`}>
    <span className={
      `ds-c-spinner
      ${size ? `ds-c-spinner--${size}` : ''}
      ${filled ? 'ds-c-spinner--filled' : ''}
      ${inverse ? 'ds-u-fill--background-inverse ds-u-color--base-inverse' : ''}
      ${color ? `ds-u-color--${color}` : ''}`
      }
    />
  </div>
);

Spinner.propTypes = {
  type: PropTypes.oneOf(['position-results', 'homepage-position-results']), // optional class to be defined
  size: PropTypes.oneOf(['small', 'big']),
  color: PropTypes.oneOf(['primary', 'success', 'muted']),
  filled: PropTypes.bool,
  inverse: PropTypes.bool,
};

Spinner.defaultProps = {
  type: '', // user defined classes stored elsewhere using "tm-spinner-" as a prefix
  size: undefined,
  color: undefined,
  filled: false,
  inverse: false,
};

export default Spinner;
