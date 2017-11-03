import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Notifications from './Notifications';

describe('NotificationsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<Notifications />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
