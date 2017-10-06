import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './bidList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  const bidList = {
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        id: 4,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00003026] OMS (COM) (Freetown, Sierra Leone)',
        status: 'draft',
        submission_date: null,
      },
      {
        id: 5,
        bidcycle: 'Test bid cycle (1988-01-01 - 2088-01-01)',
        user: 'admin',
        position: '[00004013] OMS (COM) (Maseru, Lesotho)',
        status: 'draft',
        submission_date: null,
      },
    ],
  };

  it('can fetch a bid list', (done) => {
    const store = mockStore({ });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/bidlist/').reply(200,
      bidList,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a bid list', (done) => {
    const store = mockStore({ });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/bidlist/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.bidListFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can remove a position from the bid list', (done) => {
    const store = mockStore({ profile: {} });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onDelete('http://localhost:8000/api/v1/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1', true));
        done();
      }, 0);
    };
    f();
  });

  it('can add a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/position/1/').reply(204,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when adding a position to the bid list', (done) => {
    const store = mockStore({ profile: {} });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPut('http://localhost:8000/api/v1/bidlist/position/1/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.toggleBidPosition('1'));
        done();
      }, 0);
    };
    f();
  });
});
