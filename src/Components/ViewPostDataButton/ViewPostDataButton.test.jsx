import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ViewPostDataButton from './ViewPostDataButton';

describe('ViewPostDataButtonComponent', () => {
  const props = {
    id: 1,
    type: 'post',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ViewPostDataButton {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can take props', () => {
    const wrapper = shallow(
      <ViewPostDataButton {...props} />,
    );
    expect(wrapper.instance().props.id).toBe(1);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ViewPostDataButton {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
