import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ClientBadgeList from './ClientBadgeList';

describe('ClientBadgeList', () => {
  const props = {
    statuses: {
      handshake: 0,
      sixeight: 1,
      fairshare: 2,
      retirement: 1,
    },
  };
  it('is defined', () => {
    const wrapper = shallow(<ClientBadgeList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ClientBadgeList
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
