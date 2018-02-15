import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: {
      userSkillCodePositions: [{ id: 1 }],
      serviceNeedPositions: [{ id: 2 }],
      userGradeRecentPositions: [{ id: 3 }],
    },
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
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('positions').length).toBeGreaterThan(0);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('positions').length).toBeGreaterThan(0);
    expect(wrapper.find('HomePagePositionsSection').at(2).prop('positions').length).toBeGreaterThan(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HomePagePositions {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when position arrays are filled', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{
        userGradeRecentPositions: [{ id: 1 }],
        serviceNeedPositions: [{ id: 2 }],
        userSkillCodePositions: [{ id: 3 }],
      }}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
