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

  xit('matches snapshot', () => {
    // Use subMonths so that snapshot doesn't go out of date every month.
    // Using "2" means that our snapshot will some times render "about 2 months ago"
    // and some times "2 months ago" as its title, since it's technically exact.
    // We subtract 2.1 so that it's not exactly 2 months ago, which
    // should always render "about 2 months ago".
    // https://date-fns.org/v1.29.0/docs/distanceInWords
    const notificationTime = subMonths(new Date(), 2.1).toString();
    const wrapper = shallow(
      <NotificationItem
        content="content"
        notificationTime={notificationTime}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
