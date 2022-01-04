import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import NotificationsSection from './NotificationsSection';
import notificationsObject from '../../../__mocks__/notificationsObject';

notificationsObject.results = notificationsObject.results.sort((a, b) =>
  // Sort by date, most recent first
  new Date(b.date_created) - new Date(a.date_created));

describe('NotificationsSectionComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NotificationsSection
        notifications={notificationsObject}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('displays the correct notification when there is one to display', () => {
    const wrapper = shallow(
      <NotificationsSection
        notifications={notificationsObject}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    // should be the most recent "bid" tag notification IF it is unread, otherwise don't render
    expect(wrapper.find('AlertAlt').prop('message')).toBe(notificationsObject.results[0].message);
  });

  it('displays an empty div when there is no notification to display', () => {
    const wrapper = shallow(
      <NotificationsSection
        notifications={{ results: [] }}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    expect(wrapper.matchesElement(<div />)).toBe(true);
  });

  it('can call the markNotification function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <NotificationsSection
        notifications={{ results: [] }}
        notificationsIsLoading={false}
        markBidTrackerNotification={spy}
      />,
    );
    expect(wrapper.instance().state.markedAsRead.value).toBe(false);
    wrapper.instance().markNotification(1);
    expect(wrapper.instance().state.markedAsRead.value).toBe(true);
    sinon.assert.calledOnce(spy);
  });

  it('can call the markNotification function', () => {
    const wrapper = shallow(
      <NotificationsSection
        notifications={{ results: [{ is_read: false, tags: ['bidding'], id: 1 }] }}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'markNotification');
    wrapper.find('Dismiss').props().onDismiss();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NotificationsSection
        notifications={notificationsObject}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when tags contains "declined"', () => {
    const newNotifications = { ...notificationsObject };
    newNotifications.results[0].tags = ['bidding', 'declined'];
    const wrapper = shallow(
      <NotificationsSection
        notifications={newNotifications}
        notificationsIsLoading={false}
        markBidTrackerNotification={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
