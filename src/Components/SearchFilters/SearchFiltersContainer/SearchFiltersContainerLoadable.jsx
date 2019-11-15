import React from 'react';
import createLoader from '../../Loadable';

export const path = () => import('./SearchFiltersContainer');

const SearchFiltersContainer = createLoader({ path, usePlaceholder: false, timeout: 1000 });

const SearchFiltersContainerLoadable = ({ ...rest }) => (
  <SearchFiltersContainer {...rest} />
);

export default SearchFiltersContainerLoadable;
