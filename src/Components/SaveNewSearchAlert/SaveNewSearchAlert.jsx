import React from 'react';
import { NEW_SAVED_SEARCH_SUCCESS_OBJECT } from '../../Constants/PropTypes';
import Alert from '../Alert/Alert';

const SaveNewSearchAlert = ({ newSavedSearchSuccess }) => (
  <div className="usa-grid-full saved-search-alert">
    <Alert type="success" title={newSavedSearchSuccess.title} messages={[{ body: newSavedSearchSuccess.message }]} isAriaLive />
  </div>
);

SaveNewSearchAlert.propTypes = {
  newSavedSearchSuccess: NEW_SAVED_SEARCH_SUCCESS_OBJECT.isRequired,
};

export default SaveNewSearchAlert;
