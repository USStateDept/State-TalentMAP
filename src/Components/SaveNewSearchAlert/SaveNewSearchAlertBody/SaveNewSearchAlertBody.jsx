import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ResponseMessages from '../../../Constants/ResponseMessages';
import * as SystemMessages from '../../../Constants/SystemMessages';

// We need to piece together the data we receive from the savedSearch action with
// a SystemMessage. The saved search name is dynamic, and then we combine that
// with a link to the user's profile. We render this conditionally based on
// whether the search was new or updated, given by a check against "ResponseMessages",
// i.e. NEW_SAVED_SEARCH_SUCCESS or UPDATED_SAVED_SEARCH_SUCCESS.
const SaveNewSearchAlertBody = ({ type, text }) => {
  const linkToSavedSearches = t => (<Link to="/profile/searches/">{t}</Link>);
  let one = null;
  const two = text;
  let three = null;
  let four = null;
  let five = null;
  switch (type) {
    case ResponseMessages.NEW_SAVED_SEARCH_SUCCESS:
      one = SystemMessages.NEW_SAVED_SEARCH_SUCCESS.one;
      three = SystemMessages.NEW_SAVED_SEARCH_SUCCESS.three;
      four = linkToSavedSearches(SystemMessages.NEW_SAVED_SEARCH_SUCCESS.four);
      five = SystemMessages.NEW_SAVED_SEARCH_SUCCESS.five;
      break;
    case ResponseMessages.UPDATED_SAVED_SEARCH_SUCCESS:
      one = SystemMessages.UPDATED_SAVED_SEARCH_SUCCESS.one;
      three = SystemMessages.UPDATED_SAVED_SEARCH_SUCCESS.three;
      four = linkToSavedSearches(SystemMessages.UPDATED_SAVED_SEARCH_SUCCESS.four);
      five = SystemMessages.UPDATED_SAVED_SEARCH_SUCCESS.five;
      break;
    default:
  }
  return (
    <span>
      {one}{two}{three}{four}{five}
    </span>
  );
};

SaveNewSearchAlertBody.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SaveNewSearchAlertBody;
