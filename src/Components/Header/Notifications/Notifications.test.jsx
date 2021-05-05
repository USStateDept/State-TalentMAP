import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import Notifications, { mapDispatchToProps } from './Notifications';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const history = createBrowserHistory();

describe('NotificationsComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Notifications history={history} fetchNotifications={() => {}} notificationsCount={4} fetchNotificationsCount={() => {}} fetchHandshakeNotifications={() => {}} location={{ pathname: '/results' }} />
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
        location={{ pathname: '/results' }}
        fetchNotifications={() => {}}
        fetchHandshakeNotifications={() => {}}
      />,
    );
    wrapper.instance().props.history.push('/home');
    wrapper.setProps({ location: { pathname: '/home' } });
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
