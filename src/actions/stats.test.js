import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './stats';

const { mockStore, mockAdapter } = setupAsyncMocks();

const MOCK_DATE = new Date('January 20, 2010 12:00:00');

describe('async actions', () => {
  beforeEach(() => {
    [
      '/stats/logins/?date_of_login__gt=2010-01-19T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/logins/?date_of_login__gt=2010-01-17T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/logins/?date_of_login__gt=2010-01-13T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/logins/?date_of_login__gt=2009-12-21T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/distinctlogins/?date_of_login__gt=2010-01-19T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/distinctlogins/?date_of_login__gt=2010-01-17T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/distinctlogins/?date_of_login__gt=2010-01-13T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
      '/stats/distinctlogins/?date_of_login__gt=2009-12-21T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1',
    ].map(m => (
      mockAdapter.onGet(`${m}`).reply(200,
        {
          count: 1,
          results: [
            {
              id: 1,
              date_of_login: '2019-08-20T13:53:39.673162Z',
            },
          ],
        },
      )
    ));
  });

  it('fetches stats', (done) => {
    const store = mockStore({ comparisons: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLoginStats(MOCK_DATE));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when fetching stats', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('/stats/distinctlogins/?date_of_login__gt=2009-12-21T17%3A00%3A00.000Z&date_of_login__lte=2010-01-20T17%3A00%3A00.000Z&limit=1').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLoginStats(MOCK_DATE));
        done();
      }, 0);
    };
    f();
  });
});
