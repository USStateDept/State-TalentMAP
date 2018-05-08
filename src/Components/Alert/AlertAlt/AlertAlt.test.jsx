import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import AlertAlt from './AlertAlt';

describe('AlertAltComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <AlertAlt title="title" message="message" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the title', () => {
    const title = 'title';
    const wrapper = shallow(
      <AlertAlt title={title} message="message" />,
    );
    expect(wrapper.find('.tm-alert-heading').text()).toBe(title);
  });

  it('updates with new props', () => {
    const wrapper = shallow(
      <AlertAlt title="test" message="message" />,
    );
    expect(wrapper.instance().shouldComponentUpdate({ prop: 'new' })).toBe(true);
  });

  it('applies "role=alert" when type is "error"', () => {
    const title = 'title';
    const wrapper = shallow(
      <AlertAlt type="error" title={title} message="message" />,
    );
    expect(wrapper.find('.tm-alert').prop('role')).toBe('alert');
  });

  it('renders the message', () => {
    const message = 'message';
    const wrapper = shallow(
      <AlertAlt title="title" message={message} />,
    );
    expect(wrapper.find('.tm-alert-message').text()).toBe(message);
  });

  // test each type
  ['warning', 'info', 'error', 'success'].forEach((type) => {
    it(`applies the correct class when type equals ${type}`, () => {
      const wrapper = shallow(
        <AlertAlt title="title" message="message" type={type} />,
      );
      expect(wrapper.find(`.tm-alert-${type}`).exists()).toBe(true);
    });

    it(`matches snapshot when type equals ${type}`, () => {
      const wrapper = shallow(
        <AlertAlt title="title" message="message" type={type} />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  it('matches snapshot with default props', () => {
    const wrapper = shallow(
      <AlertAlt title="title" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isAriaLive is true', () => {
    const wrapper = shallow(
      <AlertAlt title="title" isAriaLive />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
