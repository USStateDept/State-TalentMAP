import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
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
    userProfile: { skills: ['1', '2'], grade: '03' },
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

  it('matches snapshot', () => {
    const wrapper = shallow(<HomePagePositions {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when position arrays are filled', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{
        isGradeAndRecent: [{ id: 1 }],
        isServiceNeed: [{ id: 2 }],
        isSkillCode: [{ id: 3 }],
      }}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
