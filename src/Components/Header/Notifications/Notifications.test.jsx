import React from 'react';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import testDispatchFunctions from '../../../testUtilities/testUtilities';
import Notifications, { mapDispatchToProps } from './Notifications';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const history = createHistory();

describe('NotificationsComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Notifications history={history} notificationsCount={4} fetchNotificationsCount={() => {}} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('refreshes data on history change', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Notifications.WrappedComponent
        history={history}
        notificationsCount={4}
        fetchNotificationsCount={spy}
      />,
    );
    wrapper.instance().props.history.push('/home');
    sinon.assert.calledTwice(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Notifications.WrappedComponent
        history={history}
        notificationsCount={4}
        fetchNotificationsCount={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
