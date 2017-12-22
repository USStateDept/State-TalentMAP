import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ActionsLink from './ActionsLink';

describe('ActionsLinkComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ActionsLink />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ActionsLink />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
