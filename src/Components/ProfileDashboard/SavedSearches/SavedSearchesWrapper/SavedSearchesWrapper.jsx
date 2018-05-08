import React from 'react';
import SavedSearchesContainer from '../../../../Containers/SavedSearches/SavedSearches';
import SavedSearchesList from '../SavedSearchesList';

const SavedSearchesWrapper = () => (
  <SavedSearchesContainer ChildElement={SavedSearchesList} />
);

export default SavedSearchesWrapper;
