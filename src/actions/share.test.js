import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './share';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testEmail = 'test@email.com';

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const response = { email: { to: testEmail, subject: '[TalentMAP] Shared position', body: 'Shared' } };

    mockAdapter.onPost('http://localhost:8000/api/v1/share/').reply(200,
      response,
    );

    mockAdapter.onPost('http://localhost:8000/api/v1/share/failure').reply(404,
      response,
    );
  });

  it('can submit request to send email', (done) => {
    const store = mockStore({ share: false });

    const message = {
      type: 'position', // TODO - pass in as a prop if we allow sharing of other pages
      mode: 'email',
      id: 1,
      email: testEmail,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.shareSendData('http://localhost:8000/api/v1/share/', message));
    // .then(do something)
        store.dispatch(actions.shareIsSending());
        done();
      }, 0);
    };
    f();
  });

  it('can handle a failed submission', (done) => {
    const store = mockStore({ share: false });

    const message = {
      type: 'position', // TODO - pass in as a prop if we allow sharing of other pages
      mode: 'email',
      id: 1,
      email: testEmail,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.shareSendData('http://localhost:8000/api/v1/share/failure', message));
    // .then(do something)
        store.dispatch(actions.shareIsSending());
        done();
      }, 0);
    };
    f();
  });
});
