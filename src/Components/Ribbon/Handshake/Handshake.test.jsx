import { shallow } from 'enzyme';
import React from 'react';
import Handshake from './Handshake';

describe('HandshakeComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Handshake />);

    expect(wrapper).toBeDefined();
  });
});
