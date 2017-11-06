import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Notifications from './Notifications';
import notificationsObject from '../../../__mocks__/notificationsObject';

describe('NotificationsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Notifications notifications={notificationsObject.results} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<Notifications notifications={notificationsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
