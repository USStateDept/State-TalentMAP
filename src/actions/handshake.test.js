import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './handshake';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  let store;

  it('unregisters a handshake', (done) => {
    store = mockStore({ clientView: { client: { perdet_seq_number: 1 } } });

    mockAdapter.onDelete('/fsbid/cdo/position/1/client/2/register/').reply(200,
      { results: [] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unregisterHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when unregistering a handshake', (done) => {
    store = mockStore({});

    mockAdapter.onDelete('/fsbid/cdo/position/1/client/2/register/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unregisterHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('registers a handshake', (done) => {
    store = mockStore({ clientView: { client: { perdet_seq_number: 1 } } });

    mockAdapter.onPut('/fsbid/cdo/position/1/client/2/register/').reply(200,
      { results: [] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.registerHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when registering a handshake', (done) => {
    store = mockStore({});

    mockAdapter.onPut('/fsbid/cdo/position/1/client/2/register/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.registerHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });


  it('offers a handshake', (done) => {
    store = mockStore({ clientView: { client: { perdet_seq_number: 1 } } });
    mockAdapter.onPut('/bidding/handshake/bureau/1/2/').reply(200,
      { results: [] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.offerHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when offering a handshake', (done) => {
    store = mockStore({});

    mockAdapter.onPut('/bidding/handshake/bureau/1/2/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.offerHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('revokes a handshake', (done) => {
    store = mockStore({ clientView: { client: { perdet_seq_number: 1 } } });
    mockAdapter.onDelete('/bidding/handshake/bureau/1/2/').reply(200,
      { results: [] },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.revokeHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when revoking a handshake', (done) => {
    store = mockStore({});

    mockAdapter.onDelete('/bidding/handshake/bureau/1/2/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.revokeHandshake(1, 2));
        done();
      }, 0);
    };
    f();
  });
});
