import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';
import { USER_SKILL_AND_GRADE_POSITIONS, USER_GRADE_POSITIONS, FAVORITED_POSITIONS, HIGHLIGHTED_POSITIONS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: {
      [USER_SKILL_AND_GRADE_POSITIONS]: [{ position: { id: 1, skill: 'skill 1' } }],
      [USER_GRADE_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
      [FAVORITED_POSITIONS]: [],
      [HIGHLIGHTED_POSITIONS]: [],
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

  it('displays proper title and icon when userSkillAndGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Positions That Match Your Grade And Skill(s)');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('briefcase');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(1);
  });

  it('displays proper title adn icon when userGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions,
        [USER_SKILL_AND_GRADE_POSITIONS]: [] }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Positions That Match Your Grade');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('briefcase');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(1);
  });

  it('displays proper title when favoritedPositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions,
        [USER_SKILL_AND_GRADE_POSITIONS]: [],
        [USER_GRADE_POSITIONS]: [],
        [FAVORITED_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Favorited Positions');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(1);
  });

  it('displays alert when favoritedPositions empty', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={DEFAULT_HOME_PAGE_POSITIONS}
    />);
    expect(wrapper.find('Alert')).toBeDefined();
  });

  it('displays proper title and icon when highlighted positions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions,
        [USER_SKILL_AND_GRADE_POSITIONS]: [],
        [USER_GRADE_POSITIONS]: [],
        [FAVORITED_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
        [HIGHLIGHTED_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
      }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Featured Positions');
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('icon')).toBe('bolt');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(2);
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
