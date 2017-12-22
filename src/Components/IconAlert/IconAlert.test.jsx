import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import IconAlert from './IconAlert';

describe('IconAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <IconAlert type="message-o" number={4} link="/profile/" alt="text" title="title" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when no number is provided', () => {
    const wrapper = shallow(
      <IconAlert type="message-o" link="/profile/" alt="text" title="title" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can render the disabled class', () => {
    const wrapper = shallow(
      <IconAlert type="message-o" number={4} link="/profile/" alt="text" title="title" disabled />,
    );
    expect(wrapper.find('.icon-alert-disabled').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <IconAlert type="message-o" number={4} link="/profile/" alt="text" title="title" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with a number greater than the limit', () => {
    const wrapper = shallow(
      <IconAlert
        type="message-o"
        number={6}
        limit={5}
        useLimit
        link="/profile/"
        alt="text"
        title="title"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when number = 0', () => {
    const wrapper = shallow(
      <IconAlert type="message-o" number={0} link="/profile/" alt="text" title="title" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
