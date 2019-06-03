import React from 'react';
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
      <NotificationsContainer {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls fetchData on this.getNotifications()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
        fetchData={spy}
      />,
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
      />,
    );
    wrapper.instance().delete();
    sinon.assert.calledOnce(spy);
  });

  it('updates state on this.onPageChange()', () => {
    const wrapper = shallow(
      <NotificationsContainer.WrappedComponent
        {...props}
      />,
    );
    wrapper.instance().onPageChange({ page: 5 });
    expect(wrapper.instance().state.page).toBe(5);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [10],
    delete: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
