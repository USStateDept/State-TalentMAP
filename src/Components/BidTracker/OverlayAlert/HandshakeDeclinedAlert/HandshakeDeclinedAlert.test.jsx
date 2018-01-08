import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HandshakeDeclinedAlert from './HandshakeDeclinedAlert';

describe('HandshakeDeclinedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeDeclinedAlert userName="test user" bureau="test bureau" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeDeclinedAlert userName="test user" bureau="test bureau" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
