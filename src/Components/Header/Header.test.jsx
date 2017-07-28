import React from 'react';
import { shallow } from 'enzyme';
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

  it('can click the logout link', () => {
    const header = shallow(<Header client={client} login={loginObject} />);
    header.find('[to="login"]').simulate('click');
  });
});
