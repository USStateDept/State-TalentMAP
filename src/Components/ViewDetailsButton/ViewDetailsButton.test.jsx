import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ViewDetailsButton from './ViewDetailsButton';

describe('ViewDetailsButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can take props', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(wrapper.instance().props.id).toBe('1');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
