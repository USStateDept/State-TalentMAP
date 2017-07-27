import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './filters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const items = [
  {
    item: {
      title: 'Skill code',
      sort: 100,
      description: 'skill',
      endpoint: 'position/skills/',
      selectionRef: 'skill__code__in',
      text: 'Choose skill codes',
    },
    data: [
    ],
  },
  {
    item: {
      title: 'Grade',
      sort: 300,
      description: 'grade',
      endpoint: 'position/grades/',
      selectionRef: 'grade__code__in',
      text: 'Choose grades',
    },
    data: [
    ],
  },
  {
    item: {
      title: 'COLA',
      sort: 600,
      bool: true, // use bool: true to share a common HTML template
      description: 'COLA',
      selectionRef: 'post__cost_of_living_adjustment__gt',
      text: 'Include only positions with COLA',
      choices: [
      ],
    },
    data: [
      { code: '0', description: 'Yes' }, // use a code of 0 to specify we want to return results where COLA > 0
    ],
  },
];

const api = 'http://localhost:8000/api/v1';

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const skills = [{ id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
    { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' }];

    const grades = [{ id: 2, code: '00' }, { id: 3, code: '01' }];

    mockAdapter.onGet('http://localhost:8000/api/v1/position/skills/').reply(200,
      skills,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/grades/').reply(200,
      grades,
    );
  });

  it('can fetch filters', (done) => {
    const store = mockStore({ items: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(api, items, 't'));
    // .then(do something)
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
