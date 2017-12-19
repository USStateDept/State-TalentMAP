import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SkillCodeList from './SkillCodeList';
import { NO_USER_SKILL_CODE } from '../../Constants/SystemMessages';

describe('SkillCodeList', () => {
  const skillCodes = ['skill 1', 'skill 2'];

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
    expect(wrapper.text()).toBe(skillCodes[0]);
  });

  it('renders content correctly with an array of three items', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[...skillCodes, 'skill 3']} />);
    expect(wrapper.text()).toBe(`${skillCodes[0]}, ${skillCodes[1]}, skill 3`);
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
    const wrapper = shallow(<SkillCodeList skillCodes={[...skillCodes, 'skill 3']} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with an empty array', () => {
    const wrapper = shallow(<SkillCodeList skillCodes={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
