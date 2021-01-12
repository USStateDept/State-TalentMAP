import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './logs';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    // limit = 3 is the default param in the function
    mockAdapter.onGet('/logs/').reply(200,
      { data: [
        'permissions.log',
        'test.log',
      ] },
    );
    mockAdapter.onGet('/logs/permissions/').reply(200,
      { data: 'log text' },
    );
    mockAdapter.onGet('/logs/test.log/?').reply(200,
      { data: 'more log text' },
    );
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  it('can fetch logs', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogs());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching logs', (done) => {
    mockAdapter.onGet('/logs/').reply(404,
      null,
    );

    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogs());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch the logs list', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogsList());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching the logs list', (done) => {
    mockAdapter.onGet('/logs/').reply(404,
      null,
    );

    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogsList());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch a log by id', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLog('test.log'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a log by id', (done) => {
    mockAdapter.onGet('/logs/test.log/?').reply(404,
      null,
    );

    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLog('test.log'));
        done();
      }, 0);
    };
    f();
  });

  it('can fetch a log by id, formatted to download', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogToDownload('test.log'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a log by id, formatted to download', (done) => {
    mockAdapter.onGet('/logs/test.log/?').reply(404,
      null,
    );

    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogToDownload('test.log'));
        done();
      }, 0);
    };
    f();
  });
});
