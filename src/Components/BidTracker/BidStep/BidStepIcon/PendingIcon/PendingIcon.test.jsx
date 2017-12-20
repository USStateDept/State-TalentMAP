import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PendingIcon from './PendingIcon';

describe('PendingIconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PendingIcon />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PendingIcon />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
