import { setupAsyncMocks } from '../testUtilities/testUtilities';
import { fetchAllClientData, fetchClient, fetchClientBids, fetchClientWaivers } from './client';
import { clientBids, clientObject, clientWaivers } from '../__mocks__/client';

const { mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('can fetch a client', (done) => {
    mockAdapter.onGet('/fsbid/client/1/').reply(200,
      clientObject,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClient(1);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.id).toBeDefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a client', (done) => {
    mockAdapter.onGet('/fsbid/client/2/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClient(2);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.id).toBeUndefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can fetch client waivers', (done) => {
    mockAdapter.onGet('/fsbid/client/1/waivers/').reply(200,
      clientWaivers,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClientWaivers(1);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.results).toBeDefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching client waivers', (done) => {
    mockAdapter.onGet('/fsbid/client/2/waivers/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClientWaivers(2);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.results).toBeUndefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can fetch client bids', (done) => {
    mockAdapter.onGet('/fsbid/client/1/bids/').reply(200,
      clientBids,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClientBids(1);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.results).toBeDefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching client bids', (done) => {
    mockAdapter.onGet('/fsbid/client/2/bids/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchClientBids(2);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.results).toBeUndefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can perform fetchAllClientData', (done) => {
    mockAdapter.onGet('/fsbid/client/1/bids/').reply(200,
      clientBids,
    );
    mockAdapter.onGet('/fsbid/client/1/waivers/').reply(200,
      clientWaivers,
    );
    mockAdapter.onGet('/fsbid/client/1/').reply(200,
      clientObject,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchAllClientData(1);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.id).toBeDefined();
            expect(client.waivers).toBeDefined();
            expect(client.bids).toBeDefined();
            done();
          });
      }, 0);
    };
    f();
  });

  it('can handle errors when performing fetchAllClientData', (done) => {
    mockAdapter.onGet('/fsbid/client/1/bids/').reply(200,
      clientBids,
    );
    mockAdapter.onGet('/fsbid/client/1/waivers/').reply(404,
      null,
    );
    mockAdapter.onGet('/fsbid/client/1/').reply(200,
      clientObject,
    );

    const f = () => {
      setTimeout(() => {
        const clientPromise = fetchAllClientData(1);
        Promise.resolve(clientPromise)
          .then((client) => {
            expect(client.id).toBeUndefined();
            done();
          });
      }, 0);
    };
    f();
  });
});
