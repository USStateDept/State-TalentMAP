import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './filters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const item = {
  title: 'Skill code',
  sort: 100,
  description: 'skill',
  endpoint: 'position/skills',
  selectionRef: 'skill__code__in',
  text: 'Choose skill codes',
};

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const skills = [{ id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
    { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' }];

    mockAdapter.onGet('http://localhost:8000/api/v1/position/skills/').reply(200,
      skills,
    );
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ position: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData([{ url: 'http://localhost:8000/api/v1/position/skills/', item }]));
    // .then(do something)
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
