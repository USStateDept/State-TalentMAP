import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './selectedSearchbarFilters';

const { mockStore } = setupAsyncMocks();

const searchBarFilters = {};

describe('selected searchbar filters', () => {
  it('can fetch selected searchbar filters', () => {
    const store = mockStore({ filters: searchBarFilters });
    store.dispatch(actions.setSelectedSearchbarFilters(searchBarFilters));
  });
});
