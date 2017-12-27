import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { subMonths } from 'date-fns';
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

  it('matches snapshot', () => {
    // Use subMonths so that snapshot doesn't go out of date every month.
    // Using "2" means that our snapshot should always render "2 months ago"
    // as its title.
    const notificationTime = subMonths(new Date(), 2).toString();
    const wrapper = shallow(
      <NotificationItem
        content="content"
        notificationTime={notificationTime}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
