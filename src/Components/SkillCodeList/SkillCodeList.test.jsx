import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SkillCodeList from './SkillCodeList';

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
