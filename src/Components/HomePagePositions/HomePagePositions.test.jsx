import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';
import { USER_SKILL_CODE_POSITIONS, USER_GRADE_RECENT_POSITIONS, SERVICE_NEED_POSITIONS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: {
      [USER_SKILL_CODE_POSITIONS]: [{ id: 1, skill: 'skill 1' }],
      [USER_GRADE_RECENT_POSITIONS]: [{ id: 2, grade: '03' }],
      [SERVICE_NEED_POSITIONS]: [{ id: 3 }],
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

  it('can set position section titles correctly', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Positions in skill 1');
    expect(wrapper.find('HomePagePositionsSection').at(2).prop('title')).toBe('Recently Posted Positions in Grade 03');
  });

  it('matches snapshot when the positions arrays are empty', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when position arrays are filled', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
