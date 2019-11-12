import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import CDOAutoSuggest, { getDisplayProperty } from './CDOAutoSuggest';

describe('CDOAutoSuggest', () => {
  it('is defined', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });

  it('sets calls the prop on onSuggestionSelected()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent setCDO={spy} />);
    global.document.getElementById = () => ({ focus: () => {} });
    wrapper.instance().onSuggestionSelected({ id: 1 });
    sinon.assert.calledOnce(spy);
  });

  it('sets state on getFilteredUsers()', () => {
    const cdos = [
      { first_name: 'John', last_name: 'Daniels', id: 3 },
      { first_name: 'Mary', last_name: 'Brown', id: 4 },
    ];
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent cdos={cdos} />);
    wrapper.instance().getFilteredUsers('daniels');
    expect(wrapper.instance().state.suggestions.length).toBe(1);
  });

  it('sets state on hideDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    wrapper.instance().hideDropdown();
    expect(wrapper.instance().state.isActive).toBe(false);
  });

  it('sets state on showDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    wrapper.instance().showDropdown();
    expect(wrapper.instance().state.isActive).toBe(true);
  });

  it('toggles state on toggleDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    wrapper.instance().toggleDropdown();
    expect(wrapper.instance().state.isActive).toBe(true);
    wrapper.instance().toggleDropdown();
    expect(wrapper.instance().state.isActive).toBe(false);
    wrapper.instance().toggleDropdown();
    expect(wrapper.instance().state.isActive).toBe(true);
  });

  it('toggles state on toggleDropdown()', () => {
    const output = 'John Smith';
    expect(getDisplayProperty({ first_name: 'John', last_name: 'Smith' })).toBe(output);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot after toggling', () => {
    const wrapper = shallow(<CDOAutoSuggest.WrappedComponent />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
