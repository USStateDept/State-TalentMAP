import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Inbox from './Inbox';

describe('InboxComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Inbox />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Inbox />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
