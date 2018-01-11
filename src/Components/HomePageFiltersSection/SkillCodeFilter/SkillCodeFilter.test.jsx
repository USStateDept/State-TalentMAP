import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SkillCodeFilter from './SkillCodeFilter';
import filters from '../../../__mocks__/filtersArray';

describe('SkillCodeFilterComponent', () => {
  const props = {
    filters: filters[1].data,
    onFilterSelect: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <SkillCodeFilter {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the handleChange function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SkillCodeFilter {...props} onFilterSelect={spy} />,
    );
    wrapper.instance().handleChange('test');
    expect(wrapper.instance().state.selectedOptions.value).toBe('test');
    sinon.assert.calledOnce(spy);
  });

  it('sets default selected options once when provided a userSkills array with length', () => {
    const testProps = props;
    const wrapper = shallow(
      <SkillCodeFilter {...testProps} />,
    );
    // use the same filters that we pass so we can ensure there should be a match
    const userSkills = testProps.filters;
    // set the same props that already existed
    wrapper.setProps({ ...testProps });
    // selectedOptions should not have been affected since there are no userSkills
    expect(wrapper.instance().state.selectedOptions.value.length).toBe(0);
    // mock a prop update with userSkills with length being provided
    wrapper.setProps({ ...testProps, userSkills });
    // the userSkills should be passed to selectedOptions.value
    expect(wrapper.instance().state.selectedOptions.value.length).toBe(1);
    // userSkills should also have been wrapped with new props, such as label
    expect(wrapper.instance().state.selectedOptions.value[0].label).toBeDefined();
    // providing new userSkills should not update state
    wrapper.setProps({ ...testProps, userSkills: filters[0].data });
    // which we can ensure by checking that selectedOptions.value.length is 1...
    expect(wrapper.instance().state.selectedOptions.value.length).toBe(1);
    // ...and that the one object in that array has the same code as the object in the first
    // array we passed.
    expect(wrapper.instance().state.selectedOptions.value[0].code).toBe(userSkills[0].code);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SkillCodeFilter {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
