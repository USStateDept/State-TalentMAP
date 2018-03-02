import { setupAsyncMocks } from '../testUtilities/testUtilities';
import { HIGHLIGHTED_POSITIONS_QUERY, GET_SKILL_CODE_POSITIONS_QUERY, FAVORITE_POSITIONS_QUERY,
  GET_GRADE_POSITIONS_QUERY, RECENTLY_POSTED_POSITIONS_QUERY,
  homePagePositionsFetchData, homePagePositionsIsLoading } from './homePagePositions';
import resultsObject from '../__mocks__/resultsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

// set test values
const TEST_SKILL_CODES = [{ id: 100 }, { id: 200 }];
const TEST_SKILL_CODES_STRING = TEST_SKILL_CODES.join(',');
const TEST_GRADE_CODE = '03';

// set queries to test against
const queries = [
  HIGHLIGHTED_POSITIONS_QUERY,
  GET_SKILL_CODE_POSITIONS_QUERY(TEST_SKILL_CODES_STRING),
  FAVORITE_POSITIONS_QUERY,
  GET_GRADE_POSITIONS_QUERY('03'),
  RECENTLY_POSTED_POSITIONS_QUERY,
];

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`http://localhost:8000/api/v1/position/${query}`).reply(200,
        resultsObject,
      ),
    );
  });

  it('fetches positions when skill and grade are not defined', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePagePositionsFetchData());
        store.dispatch(homePagePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('fetches positions when skill and grade exist', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePagePositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePagePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors fetching positions when skill and grade are not defined', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`http://localhost:8000/api/v1/position/${query}`).reply(404,
        null,
      ),
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePagePositionsFetchData());
        store.dispatch(homePagePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors fetching positions when skill and grade exist', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`http://localhost:8000/api/v1/position/${query}`).reply(404,
        null,
      ),
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePagePositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePagePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
