import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { filters, filtersHasErrored, filtersIsLoading } from './filters';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  filters,
  filtersHasErrored,
  filtersIsLoading,
});
