import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './share';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testEmail = 'test@email.com';

describe('async actions', () => {
  it('can submit request to send email', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    const response = { email: { to: testEmail, subject: '[TalentMAP] Shared position', body: 'Shared' } };

    mockAdapter.onPost('http://localhost:8000/api/v1/share/').reply(200,
      response,
    );

    const message = {
      type: 'position',
      mode: 'email',
      id: 1,
      email: testEmail,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.shareSendData(message));
        store.dispatch(actions.shareIsSending());
        done();
      }, 0);
    };
    f();
  });

  it('can handle a failed submission', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPost('http://localhost:8000/api/v1/share/').reply(404,
      {},
    );

    const message = {
      type: 'position',
      mode: 'email',
      id: 1,
      email: testEmail,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.shareSendData(message));
        store.dispatch(actions.shareIsSending());
        done();
      }, 0);
    };
    f();
  });
});
