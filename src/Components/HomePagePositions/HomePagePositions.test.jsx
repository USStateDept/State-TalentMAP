import { shallow } from 'enzyme';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';
import bidListObject from '../../__mocks__/bidListObject';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
    toggleFavorite: () => {},
    userProfileFavoritePositionIsLoading: false,
    userProfileFavoritePositionHasErrored: false,
    toggleBid: () => {},
    bidList: bidListObject.results,
  };

  it('is defined', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(wrapper.instance().props.bidList).toBe(props.bidList);
  });
});
