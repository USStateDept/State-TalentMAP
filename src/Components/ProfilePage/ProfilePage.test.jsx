import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import resultsObject from '../../__mocks__/resultsObject';
import searchObjectParent from '../../__mocks__/searchObject';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ProfilePageComponent', () => {
  const user = bidderUserObject;
  const props = {
    user: DEFAULT_USER_PROFILE,
    favoritePositions: resultsObject,
    favoritePositionsIsLoading: false,
    favoritePositionsHasErrored: false,
    toggleFavoritePositionIsLoading: false,
    toggleFavoritePositionHasErrored: false,
    savedSearches: searchObjectParent,
    savedSearchesIsLoading: false,
    savedSearchesHasErrored: false,
    goToSavedSearch: () => {},
    deleteSearch: () => {},
    deleteSavedSearchIsLoading: false,
    deleteSavedSearchHasErrored: false,
    deleteSavedSearchSuccess: false,
    cloneSavedSearchIsLoading: false,
    cloneSavedSearchHasErrored: false,
    cloneSavedSearchSuccess: false,
    cloneSavedSearch: () => {},
    bidListHasErrored: false,
    bidListIsLoading: false,
    bidList: { results: [] },
    bidListToggleHasErrored: false,
    bidListToggleIsLoading: false,
    bidListToggleSuccess: false,
    submitBid: () => {},
    submitBidHasErrored: false,
    submitBidIsLoading: false,
    submitBidSuccess: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ProfilePage
          {...props}
        />
      </MemoryRouter>,
    );
    expect(wrapper).toBeDefined();
  });

  it('it can handle showing the full name of the user', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <ProfilePage
          {...Object.assign({}, props, { user })}
        />
      </MemoryRouter>,
    );
    expect(wrapper.find(`${user.user.first_name} ${user.user_last_name}`)).toBeDefined();
  });
});
