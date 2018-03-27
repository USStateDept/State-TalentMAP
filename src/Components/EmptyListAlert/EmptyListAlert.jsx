import React from 'react';
import PropTypes from 'prop-types';

const EmptyListAlert = ({ textLineOne, textLineTwo }) => (
  <div className="usa-grid-full empty-list-alert">
    <p>{textLineOne}</p>
    <p>{textLineTwo}</p>
  </div>
);

EmptyListAlert.propTypes = {
  textLineOne: PropTypes.node.isRequired,
  textLineTwo: PropTypes.node,
};

EmptyListAlert.defaultProps = {
  textLineTwo: '',
};

export default EmptyListAlert;
