import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';

const SaveNewSearchAlert = ({ newSavedSearchSuccess }) => (
  <div className="usa-grid-full saved-search-alert">
    <Alert type="success" title="Success" messages={[{ body: newSavedSearchSuccess }]} isAriaLive />
  </div>
);

SaveNewSearchAlert.propTypes = {
  newSavedSearchSuccess: PropTypes.string,
};

SaveNewSearchAlert.defaultProps = {
  newSavedSearchSuccess: false,
};

export default SaveNewSearchAlert;
