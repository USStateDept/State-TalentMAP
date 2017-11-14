// This file is used by tests, so we can ignore no-extraneous-dependencies
/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default function setupAsyncMocks() {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mockAdapter = new MockAdapter(axios);

  return { mockStore, mockAdapter };
}
