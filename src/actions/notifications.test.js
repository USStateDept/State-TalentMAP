import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './notifications';
import notificationsObject from '../__mocks__/notificationsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    // limit = 3 is the default param in the function
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=3&ordering=-date_updated').reply(200,
      notificationsObject,
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=2&ordering=-date_updated').reply(200,
      notificationsObject,
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=2&ordering=date_updated').reply(200,
      notificationsObject,
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=1&is_read=false').reply(200,
      notificationsObject,
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=1&ordering=-date_created&tags=bidding').reply(200,
      notificationsObject,
    );
    mockAdapter.onPatch('http://localhost:8000/api/v1/notification/1/').reply(200,
      notificationsObject,
    );
    mockAdapter.onPatch('http://localhost:8000/api/v1/notification/2/').reply(404,
      null,
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

  it('can fetch notifications of a custom ordering', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsFetchData(null, 'date_updated'));
        store.dispatch(actions.notificationsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch notifications in order to determine the count', (done) => {
    const store = mockStore({ notificationsCount: 0 });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsCountFetchData());
        store.dispatch(actions.notificationsCountIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can call the unsetNotificationsCount function', (done) => {
    const store = mockStore({ notificationsCount: 0 });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unsetNotificationsCount());
        done();
      }, 0);
    };
    f();
  });

  it('can call the bidTrackerNotificationsFetchData function', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidTrackerNotificationsFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can call the markNotification function', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.markNotification(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when calling the markNotification function', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.markNotification(2));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when calling the notificationsCountFetchData function', (done) => {
    const store = mockStore({ notifications: {} });

    // check that it can handle errors
    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=1&is_read=false').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsCountFetchData());
        done();
      }, 0);
    };
    f();
  });
});
