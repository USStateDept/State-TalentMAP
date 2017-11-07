import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Notification from './Notification';

describe('NotificationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Notification
        content="content"
        notificationTime="10-10-2017"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(
      <Notification
        content="content"
        notificationTime="10-10-2017"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
