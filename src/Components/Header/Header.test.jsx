import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from './Header';

describe('Header', () => {
  const loginObject = {
    requesting: false,
    successful: true,
  };

  const client = {
    token: '1234',
  };

  it('is defined', () => {
    const header = shallow(
      <Header client={client} login={loginObject} fetchData={() => {}} isAuthorized={() => true} />,
    );
    expect(header).toBeDefined();
  });

  it('matches snapshot', () => {
    const header = shallow(
      <Header client={client} login={loginObject} fetchData={() => {}} isAuthorized={() => true} />,
    );
    expect(toJSON(header)).toMatchSnapshot();
  });
});
