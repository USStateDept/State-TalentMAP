import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './missionAutocomplete';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const results = [
      {
        id: 1,
        code: 'AFG',
        short_code: 'AF',
        location_prefix: 'AF',
        name: 'Islamic Republic of Afghanistan',
        short_name: 'Afghanistan',
      },
    ];

    mockAdapter.onGet('http://localhost:8000/api/v1/country/?short_name__icontains=Afgh&limit=3').reply(200,
      results,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/country/?short_name__icontains=fake&limit=3').reply(404,
      null,
    );
  });

  it('can fetch post reuslts', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.missionSearchFetchData('Afgh'));
        store.dispatch(actions.missionSearchIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failed requests', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.missionSearchFetchData('fake'));
        store.dispatch(actions.missionSearchIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
