import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './feedback';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  // reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });
  it('can submit request to send email', (done) => {
    const store = mockStore({ share: false });

    mockAdapter.onPost('http://localhost:8000/api/v1/feedback/').reply(200,
      'success',
    );

    const message = {
      comments: 'my feedback',
      is_interested_in_helping: true,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.feedbackSubmitData(message));
        store.dispatch(actions.feedbackIsSending());
        done();
      }, 0);
    };
    f();
  });

  it('can handle a failed submission', (done) => {
    const store = mockStore({ share: false });

    mockAdapter.onPost('http://localhost:8000/api/v1/feedback/').reply(400,
      { comment: ['error'] },
    );

    const message = {
      comments: 'my feedback',
      is_interested_in_helping: true,
    };

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.feedbackSubmitData(message));
        store.dispatch(actions.feedbackIsSending());
        done();
      }, 0);
    };
    f();
  });
});
