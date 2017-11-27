import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ActionsButton from './ActionsButton';

describe('ActionsButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ActionsButton />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ActionsButton />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
