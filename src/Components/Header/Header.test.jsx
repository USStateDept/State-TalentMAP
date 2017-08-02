import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from './Header';

describe('Main', () => {
  const loginObject = {
    requesting: false,
    successful: true,
  };

  const client = {
    token: '1234',
  };

  it('is defined', () => {
    const header = shallow(<Header client={client} login={loginObject} />);
    expect(header).toBeDefined();
  });

  it('matches snapshot', () => {
    const header = shallow(<Header client={client} login={loginObject} />);
    expect(toJSON(header)).toMatchSnapshot();
  });
});
