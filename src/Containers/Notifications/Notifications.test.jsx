import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import NotificationsContainer, { mapDispatchToProps } from './Notifications';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('NotificationsContainer', () => {
  const props = {
    fetchData: () => {},
    delete: () => {},
    notifications: {},
    isLoading: false,
    hasErrored: false,
    markNotificationIsLoading: false,
    markNotificationHasErrored: false,
  };
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <NotificationsContainer {...props}>{() => <div /> }</NotificationsContainer>
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls fetchData on this.getNotifications()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        fetchData={spy}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    wrapper.instance().getNotifications();

    // called once on mount
    sinon.assert.calledTwice(spy);
  });

  it('calls delete on this.delete()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        delete={spy}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    wrapper.instance().delete();
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.onPageChange()', () => {
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    wrapper.instance().onPageChange({ page: 5 });
    expect(wrapper.instance().state.page).toBe(5);
  });

  it('updates state on this.onCheck()', () => {
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    wrapper.instance().onCheck(true, { _id: 2 });
    expect(wrapper.instance().state.selectedNotifications.has(2)).toBe(true);
  });

  it('returns the correct value on this.getCheckedValueById()', () => {
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    expect(wrapper.instance().getCheckedValueById(2)).toBe(false);
    wrapper.instance().setState({ selectedNotifications: new Set([2]) });
    expect(wrapper.instance().getCheckedValueById(2)).toBe(true);
  });

  it('returns the correct value on this.getCurrentResults()', () => {
    const notifications = { results: [{ id: 1 }] };
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        notifications={notifications}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    expect(wrapper.instance().getCurrentResults()).toEqual(notifications.results);
  });

  it('sets state correctly on this.selectAll()', () => {
    const notifications = { results: [{ id: 1 }, { id: 2 }] };
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        notifications={notifications}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );
    wrapper.instance().selectAll();
    const { selectedNotifications } = wrapper.instance().state;

    // should add 1 and 2
    expect([...selectedNotifications]).toEqual([1, 2]);

    wrapper.instance().selectAll();
    // should remove 1 and 2
    expect([...selectedNotifications]).toEqual([]);
  });

  it('passes the correct values and config on this.markNotificationsByType() when deleting', () => {
    const notifications = { results: [{ id: 1 }, { id: 2 }] };
    let output = {};
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        notifications={notifications}
        markNotifications={a => output = a} // eslint-disable-line
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );

    // contains id from another page (3)
    wrapper.instance().setState({ selectedNotifications: new Set([1, 2, 3]) });

    wrapper.instance().markNotificationsByType('delete');
    expect(output.ids).toEqual([1, 2]);
    expect(output.shouldDelete).toBe(true);
  });

  it('passes the correct values and config on this.markNotificationsByType() when marking as read', () => {
    const notifications = { results: [{ id: 1 }, { id: 2 }] };
    let output = {};
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        notifications={notifications}
        markNotifications={a => output = a} // eslint-disable-line
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );

    // contains id from another page (3)
    wrapper.instance().setState({ selectedNotifications: new Set([1, 2, 3]) });

    wrapper.instance().markNotificationsByType('read');
    expect(output.ids).toEqual([1, 2]);
    expect(output.shouldDelete).toBe(false);
    expect(output.markAsRead).toBe(true);
  });

  it('passes the correct values and config on this.markNotificationsByType() when marking as unread', () => {
    const notifications = { results: [{ id: 1 }, { id: 2 }] };
    let output = {};
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        notifications={notifications}
        markNotifications={a => output = a} // eslint-disable-line
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );

    // contains id from another page (3)
    wrapper.instance().setState({ selectedNotifications: new Set([1, 2, 3]) });

    wrapper.instance().markNotificationsByType('unread');
    expect(output.ids).toEqual([1, 2]);
    expect(output.shouldDelete).toBe(false);
    expect(output.markAsRead).toBe(false);
  });

  it('returns the correct value for selectionsExist()', () => {
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
      >{() => <div /> }</NotificationsContainer.WrappedComponent>,
    );

    wrapper.instance().setState({ selectedNotifications: new Set([1, 2, 3]) });
    expect(wrapper.instance().selectionsExist()).toBe(true);

    wrapper.instance().setState({ selectedNotifications: new Set([]) });
    expect(wrapper.instance().selectionsExist()).toBe(false);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [10],
    delete: [1],
    markNotifications: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
