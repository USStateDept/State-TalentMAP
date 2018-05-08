import React from 'react';
import SavedSearchesContainer from '../../../Containers/SavedSearches/SavedSearches';
import SavedSearches from '../SavedSearches';

const SavedSearchesWrapper = () => (
  <SavedSearchesContainer ChildElement={SavedSearches} />
);

export default SavedSearchesWrapper;
