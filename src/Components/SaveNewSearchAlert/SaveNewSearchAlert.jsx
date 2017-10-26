import React from 'react';
import Alert from '../Alert/Alert';
import { NEW_SAVED_SEARCH_SUCCESS_MESSAGE } from '../../Constants/PropTypes';
import SaveNewSearchAlertBody from './SaveNewSearchAlertBody';

const SaveNewSearchAlert = ({ newSavedSearchSuccess }) => {
  const type = newSavedSearchSuccess.type;
  const text = newSavedSearchSuccess.text;
  const body = (
    <SaveNewSearchAlertBody
      type={type}
      text={text}
    />
  );
  return (
    <div className="usa-grid-full saved-search-alert">
      <Alert type="success" title="Success" messages={[{ body }]} />
    </div>
  );
};

SaveNewSearchAlert.propTypes = {
  newSavedSearchSuccess: NEW_SAVED_SEARCH_SUCCESS_MESSAGE,
};

SaveNewSearchAlert.defaultProps = {
  newSavedSearchSuccess: false,
};

export default SaveNewSearchAlert;
