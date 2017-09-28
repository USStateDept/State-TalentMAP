import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfilePage from './ProfilePage';
import { DEFAULT_USER_PROFILE } from '../../Constants/DefaultProps';
import resultsObject from '../../__mocks__/resultsObject';
import searchObjectParent from '../../__mocks__/searchObject';

describe('ProfilePageComponent', () => {
  const user = {
    user: {
      username: 'john',
    },
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ProfilePage
        user={DEFAULT_USER_PROFILE}
        favoritePositions={resultsObject}
        toggleFavorite={() => {}}
        favoritePositionsIsLoading={false}
        favoritePositionsHasErrored={false}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
        savedSearches={searchObjectParent}
        savedSearchesIsLoading={false}
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
        deleteSavedSearchIsLoading={false}
        deleteSavedSearchHasErrored={false}
        deleteSavedSearchSuccess={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it can handle a username', () => {
    const wrapper = shallow(
      <ProfilePage
        user={user}
        favoritePositions={resultsObject}
        toggleFavorite={() => {}}
        favoritePositionsIsLoading={false}
        favoritePositionsHasErrored={false}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
        savedSearches={searchObjectParent}
        savedSearchesIsLoading={false}
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
        deleteSavedSearchIsLoading={false}
        deleteSavedSearchHasErrored={false}
        deleteSavedSearchSuccess={false}
      />,
    );
    expect(wrapper.find(user.user.username)).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfilePage
        user={user}
        favoritePositions={resultsObject}
        toggleFavorite={() => {}}
        favoritePositionsIsLoading={false}
        favoritePositionsHasErrored={false}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
        savedSearches={searchObjectParent}
        savedSearchesIsLoading={false}
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
        deleteSavedSearchIsLoading={false}
        deleteSavedSearchHasErrored={false}
        deleteSavedSearchSuccess={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
