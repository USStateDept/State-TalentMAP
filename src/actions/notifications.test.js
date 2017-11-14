import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './notifications';
import notificationsObject from '../__mocks__/notificationsObject';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/notification/?limit=3').reply(200,
      notificationsObject,
    );
  });

  it('can fetch notificationss', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.notificationsFetchData(3));
        store.dispatch(actions.notificationsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
