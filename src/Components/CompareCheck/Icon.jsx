import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ className }) => (
  <span className={`compare-rectangle-container ${className}`} >
    <span className="compare-rectangle" />
    <span className="compare-rectangle" />
    <span className="compare-rectangle" />
  </span>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
