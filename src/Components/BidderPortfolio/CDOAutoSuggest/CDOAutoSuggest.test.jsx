import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CDOAutoSuggest, { getDisplayProperty } from './CDOAutoSuggest';

describe('CDOAutoSuggest', () => {
  it('is defined', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    expect(wrapper).toBeDefined();
  });

  it('sets state on onSuggestionSelected()', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    global.document.getElementById = () => ({ focus: () => {} });
    wrapper.instance().onSuggestionSelected({ id: 1 });
    expect(wrapper.instance().state.isActive).toBe(false);
  });

  it('sets state on getFilteredUsers()', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.instance().getFilteredUsers('daniels');
    expect(wrapper.instance().state.suggestions.length).toBe(1);
  });

  it('sets state on hideDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.instance().hideDropdown();
    expect(wrapper.instance().state.isActive).toBe(false);
  });

  it('sets state on showDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.instance().showDropdown();
    expect(wrapper.instance().state.isActive).toBe(true);
  });

  it('toggles state on toggleDropdown()', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
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

  it('calls this.hideDropdown on this.handleOutsideClick when !!isActive and element does not contain target', () => {
    window.document.getElementById = () => ({
      contains: () => false,
    });
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.instance().setState({ isActive: true });
    wrapper.update();
    wrapper.instance().handleOutsideClick({ target: 1 });
    expect(wrapper.instance().state.isActive).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot after toggling', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
