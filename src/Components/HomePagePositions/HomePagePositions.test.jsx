import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';

describe('HomePageComponent', () => {
  const props = {
    homePageFeaturedPositions: {
      positions: [{ position: { id: 1,
        grade: '03',
        skill: 'skill 5',
        skill_code: '0020',
      } }],
      name: 'featuredGradeAndSkillPositions',
    },
    homePageRecommendedPositions: {
      positions: [{ position: { id: 1,
        grade: '00',
        skill: 'skill 1',
        skill_code: '0020',
      } }],
      name: 'recommendedGradeAndSkillPositions',
    },
    bidList: bidListObject.results,
    userProfile: {
      employee_info: {
        grade: '03',
        skills: [{
          code: '3001',
          description: 'CONSULAR AFFAIRS',
        }, {
          code: '2881',
          description: 'INFORMATION PROGRAMS ADMIN',
        }],
      },
    },
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
  });

  it('displays proper title and icon when featuredGradeAndSkillPositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageFeaturedPositions={props.homePageFeaturedPositions}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Featured Positions That Match Your Grade And Skill(s)');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('bolt');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays proper title and icon when recommendedGradeAndSkillPositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageRecommendedPositions={props.homePageRecommendedPositions}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Positions That Match Your Grade And Skill(s)');
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('icon')).toBe('briefcase');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays proper title and icon when featuredGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageFeaturedPositions={{ ...props.homePageFeaturedPositions,
        name: 'featuredGradePositions',
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Featured Positions That Match Your Grade');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('bolt');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays proper title and icon when recommendedGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageRecommendedPositions={{ ...props.homePageRecommendedPositions,
        name: 'recommendedGradePositions',
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Positions That Match Your Grade');
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('icon')).toBe('briefcase');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays proper title and icon when featuredPositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageFeaturedPositions={{ ...props.homePageFeaturedPositions,
        name: 'featuredPositions',
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Featured Positions');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('bolt');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays proper title and icon when favoritedPositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageRecommendedPositions={{ ...props.homePageRecommendedPositions,
        name: 'favoritedPositions',
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('title')).toBe('Favorited Positions');
    expect(wrapper.find('HomePagePositionsSection').at(1).prop('icon')).toBe('star');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
  });

  it('displays alert when featuredPositions empty', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageFeaturedPositions={{
        positions: [],
        name: 'featuredGradePositions',
      }}
    />);
    expect(wrapper.find('Alert')).toBeDefined();
  });

  it('displays alert when favoritedPositions empty', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageRecommendedPositions={{ positions: [],
        name: 'favoritedPositions',
      }}
    />);
    expect(wrapper.find('Alert')).toBeDefined();
  });

  it('matches snapshot when featuredPositions and favoritedPositions empty', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePageFeaturedPositions={{ positions: [],
        name: 'featuredPositions',
      }}
      homePageRecommendedPositions={{ positions: [],
        name: 'favoritedPositions',
      }}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when featuredPositions and favoritedPositions are filled', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
