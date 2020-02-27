import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ClientBadge from './ClientBadge';

describe('ClientBadge', () => {
  const props = {
    type: 3,
    status: true,
  };
  it('is defined', () => {
    const wrapper = shallow(<ClientBadge
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ClientBadge
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
