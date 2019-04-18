import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Updates from './Updates';

describe('UpdatesComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Updates />);
    expect(wrapper).toBeDefined();
  });

  it('renders one button on mount', () => {
    const wrapper = shallow(<Updates />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('EditButtons').exists()).toBe(false);
  });

  it('renders two buttons when the Edit button is clicked', () => {
    const wrapper = shallow(<Updates />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.find('EditButtons').exists()).toBe(true);
  });

  it('renders one button when enableEdit() is called and then disableEdit() is called', () => {
    const wrapper = shallow(<Updates />);
    const instance = wrapper.instance();
    instance.enableEdit();
    instance.disableEdit();
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('EditButtons').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Updates />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
