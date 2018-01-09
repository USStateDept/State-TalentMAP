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
    expect(wrapper.instance().state.selectedOption.value).toBe('test');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SkillCodeFilter {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
