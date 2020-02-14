import { shallow } from 'enzyme';
import React from 'react';
import NotificationsList from './NotificationsList';

describe('NotificationsList', () => {
  const props = {
    notifications: { results: [
      { id: 1, is_read: false, message: 'a' },
      { id: 2, is_read: true, message: 'b' },
    ] },
    isLoading: false,
    hasErrored: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <NotificationsList {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading === true', () => {
    const wrapper = shallow(
      <NotificationsList {...props} isLoading />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading === false and hasErrored === true', () => {
    const wrapper = shallow(
      <NotificationsList {...props} isLoading={false} hasErrored />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading === false and hasErrored === false and there are 0 notifications', () => {
    const wrapper = shallow(
      <NotificationsList
        {...props}
        isLoading={false}
        hasErrored={false}
        notifications={{ results: [] }}
      />,
    );
    expect(wrapper).toBeDefined();
  });
});
