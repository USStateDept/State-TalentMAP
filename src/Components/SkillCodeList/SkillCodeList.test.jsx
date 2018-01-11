import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SkillCodeList from './SkillCodeList';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('SkillCodeList', () => {
  const skillCodes = bidderUserObject.skills;
  const extendedSkills = [...skillCodes, {
    id: 100,
    cone: null,
    code: '5111',
    description: 'Test Description',
  }];

  it('is defined', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={skillCodes} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined with an empty array', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[]} />);
    expect(wrapper).toBeDefined();
  });

  it('takes props', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={skillCodes} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('is defined with no props', () => {
    const wrapper = shallow(<SkillCodeList />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot with an array of one item', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[skillCodes[0]]} />);
    expect(wrapper.text()).toBe(`${skillCodes[0].description} (${skillCodes[0].code})`);
  });

  it('renders content correctly with an array of three items', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={extendedSkills} />);
    expect(wrapper.text())
      .toBe(`${extendedSkills[0].description} (${extendedSkills[0].code}), ${extendedSkills[1].description} (${extendedSkills[1].code}), ${extendedSkills[2].description} (${extendedSkills[2].code})`);
  });

  it('renders content correctly with an empty array', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[]} />);
    expect(wrapper.text()).toBe(NO_USER_SKILL_CODE);
  });

  it('renders content correctly with an array of one item', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[skillCodes[0]]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with an array of three items', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={extendedSkills} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with an empty array', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
