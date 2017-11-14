import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './notifications';
import notificationsObject from '../__mocks__/notificationsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=3').reply(200,
      notificationsObject,
    );
  });

  it('can fetch notificationss', (done) => {
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
});
