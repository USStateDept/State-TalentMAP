import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './notifications';
import notificationsObject from '../__mocks__/notificationsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    // limit = 3 is the default param in the function
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=3').reply(200,
      notificationsObject,
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=2').reply(200,
      notificationsObject,
    );
  });

  it('can fetch notifications', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsFetchData());
        store.dispatch(actions.notificationsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch notifications of a custom limit', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsFetchData(2));
        store.dispatch(actions.notificationsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
