import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessageComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper).toBeDefined();
  });

  it('displays an empty string error', () => {
    const wrapper = shallow(<ErrorMessage showEmptyWarning />);
    expect(wrapper.find('.usa-input-error-message').text()).toBe('Title and definition cannot be blank.');
  });

  it('displays a response error', () => {
    const wrapper = shallow(<ErrorMessage showResponseError />);
    expect(wrapper.find('.usa-input-error-message').text()).toBe('Error updating term.');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ErrorMessage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showEmptyWarning is true', () => {
    const wrapper = shallow(<ErrorMessage showEmptyWarning />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showResponseError is true', () => {
    const wrapper = shallow(<ErrorMessage showResponseError />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showResponseError and showEmptyWarning are true', () => {
    const wrapper = shallow(<ErrorMessage showEmptyWarning showResponseError />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
