import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';
import { USER_SKILL_CODE_POSITIONS, SERVICE_NEED_POSITIONS, FAVORITED_POSITIONS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: {
      [USER_SKILL_CODE_POSITIONS]: [{ position: { id: 1, skill: 'skill 1' } }],
      [SERVICE_NEED_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
    },
    bidList: bidListObject.results,
    userProfile: { skills: ['1', '2'], grade: '03' },
  };

  const fallBackPositions = {
    [SERVICE_NEED_POSITIONS]: [{ position: { id: 3 } }],
    [FAVORITED_POSITIONS]: [{ position: { id: 101 } }],
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
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('positions').length).toBeGreaterThan(0);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('positions').length).toBeGreaterThan(0);
  });

  it('does not display the Featured positions section when there are no featured positions', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions, [SERVICE_NEED_POSITIONS]: [] }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Positions in skill 1');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(1);
  });

  it('sets fallback positions', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={fallBackPositions}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('positions')[0].position.id).toBe(101);
  });

  it('sets titles correctly for fallback positions', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={fallBackPositions}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Favorited Positions');
  });

  it('sets links correctly for fallback positions', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={fallBackPositions}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('viewMoreLink')).toBe('/profile/favorites/');
  });

  it('can set position section titles correctly', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Positions in skill 1');
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
