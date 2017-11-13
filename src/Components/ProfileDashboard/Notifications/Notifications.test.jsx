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

  it('can render with one notification', () => {
    const wrapper = shallow(
      <Notifications notifications={notificationsObject.results.slice(0, 1)} />);
    expect(wrapper).toBeDefined();
  });

  it('can render with zero notifications', () => {
    const wrapper = shallow(
      <Notifications notifications={[]} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Notifications notifications={notificationsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are zero notifications', () => {
    const wrapper = shallow(<Notifications notifications={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
