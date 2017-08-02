import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AccountDropdown } from './AccountDropdown';

describe('AccountDropdown', () => {
  it('is defined', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(accountDropdown).toBeDefined();
  });

  it('can click the logout link', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    accountDropdown.find('[to="login"]').simulate('click');
  });

  it('matches snapshot', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(toJSON(accountDropdown)).toMatchSnapshot();
  });
});
