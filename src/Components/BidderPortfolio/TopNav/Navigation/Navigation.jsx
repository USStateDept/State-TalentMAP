import React from 'react';
import PropTypes from 'prop-types';
import NavigationList from './NavigationList';

const Navigation = ({ counts }) => (
  <div className="usa-grid-full">
    <NavigationList counts={counts} />
  </div>
);

Navigation.propTypes = {
  counts: PropTypes.shape({}).isRequired,
};

export default Navigation;
