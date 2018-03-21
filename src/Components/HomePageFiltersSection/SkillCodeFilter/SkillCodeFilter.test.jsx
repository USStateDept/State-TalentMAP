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
    userSkills: [{ label: 'label', code: '1' }], // this matches with filters[1] code
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

  it('sets default selected options once and not after a user change', () => {
    const testProps = props;
    const wrapper = shallow(
      <SkillCodeFilter {...testProps} />,
    );
    // the userSkills should be passed to selectedOptions.value
    expect(wrapper.instance().state.selectedOptions.value.length).toBe(1);
    // userSkills should also have been wrapped with new props, such as label
    expect(wrapper.instance().state.selectedOptions.value[0].label).toBeDefined();
    // simulate a user change where they have two filters
    wrapper.instance().handleChange([{ code: '100', label: '100' }, { code: '200', label: '200' }]);
    // Then provide some external prop changes.
    // Providing new userSkills should not update state.
    wrapper.setProps({ ...testProps });
    // which we can ensure by checking that selectedOptions.value.length is 2...
    expect(wrapper.instance().state.selectedOptions.value.length).toBe(2);
    // ...and that the two object in that array have the same codes as the objects in the first
    // array we passed.
    expect(wrapper.instance().state.selectedOptions.value[0].code)
      .toBe('100');
    expect(wrapper.instance().state.selectedOptions.value[1].code)
      .toBe('200');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SkillCodeFilter {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
