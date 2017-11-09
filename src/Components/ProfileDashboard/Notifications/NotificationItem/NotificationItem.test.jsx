import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NotificationItem from './NotificationItem';

describe('NotificationItemComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NotificationItem
        content="content"
        notificationTime="10-10-2017"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(
      <NotificationItem
        content="content"
        notificationTime="10-10-2017"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
