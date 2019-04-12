import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ClientBadge from './ClientBadge';

describe('ClientBadge', () => {
  const props = {
    type: 'handshake',
    status: 1,
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
