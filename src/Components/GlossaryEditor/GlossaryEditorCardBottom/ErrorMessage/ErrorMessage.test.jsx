import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessageComponent', () => {
  const errorProp = {
    id: 1,
    message: 'error',
    hasErrored: true,
  };

  it('is defined', () => {
    const wrapper = shallow(<ErrorMessage />);
    expect(wrapper).toBeDefined();
  });

  it('displays an empty string error', () => {
    const wrapper = shallow(<ErrorMessage showEmptyWarning />);
    expect(wrapper.find('.usa-input-error-message').text()).toBe('Title and definition cannot be blank.');
  });

  it('displays a response error', () => {
    const wrapper = shallow(<ErrorMessage error={errorProp} />);
    expect(wrapper.find('.usa-input-error-message').text()).toBe(errorProp.message);
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
    const wrapper = shallow(<ErrorMessage error={errorProp} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showResponseError and showEmptyWarning are true', () => {
    const wrapper = shallow(<ErrorMessage showResponseError showEmptyWarning />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
