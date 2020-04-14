import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import HomePagePositions from './HomePagePositions';
import bidListObject from '../../__mocks__/bidListObject';
import { USER_SKILL_AND_GRADE_POSITIONS, USER_GRADE_POSITIONS, FAVORITED_POSITIONS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

describe('HomePageComponent', () => {
  const props = {
    homePagePositions: {
      [USER_SKILL_AND_GRADE_POSITIONS]: [{ position: { id: 1, skill: 'skill 1' } }],
      [USER_GRADE_POSITIONS]: [{ position: { id: 2, grade: '03' } }],
      [FAVORITED_POSITIONS]: [],
    },
    bidList: bidListObject.results,
    userProfile: { skills: ['1', '2'], grade: '03' },
  };

  const userSkillAndGradePositions = props.homePagePositions[USER_SKILL_AND_GRADE_POSITIONS];
  const userGradePositions = props.homePagePositions[USER_GRADE_POSITIONS];
  const favoritedPositions = props.homePagePositions[FAVORITED_POSITIONS];


  /*  const fallBackPositions = {
    [SERVICE_NEED_POSITIONS]: [{ position: { id: 3 } }],
    [FAVORITED_POSITIONS]: [{ position: { id: 101 } }],
   }; */

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

  it('displays proper title when userSkillAndGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Relevant Positions');
    expect(wrapper.find('HomePagePositionsSection')).toHaveLength(1);
  });

  it('displays proper title when userGradePositions displayed', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions,
        [USER_SKILL_AND_GRADE_POSITIONS]: [] }}
    />);
    expect(wrapper.find('HomePagePositionsSection').at(0).prop('title')).toBe('Relevant Positions');
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

  it('does not display HomePagePositionsSection component if no positions to show', () => {
    const wrapper = shallow(<HomePagePositions
      {...props}
      homePagePositions={{ ...props.homePagePositions,
        [USER_SKILL_AND_GRADE_POSITIONS]: [],
        [USER_GRADE_POSITIONS]: [],
      }}
    />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('HomePagePositionsSection').exists()).toBeFalsy();
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
