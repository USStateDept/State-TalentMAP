import { setupAsyncMocks } from '../testUtilities/testUtilities';
import {
  FAVORITE_POSITIONS_QUERY,
  GET_FEATURED_GRADE_AND_SKILL_POSITIONS_QUERY,
  GET_FEATURED_GRADE_POSITIONS_QUERY,
  GET_FEATURED_POSITIONS_QUERY,
  GET_RECOMMENDED_GRADE_AND_SKILL_CODE_POSITIONS_QUERY,
  GET_RECOMMENDED_GRADE_POSITIONS_QUERY,
  homePageFeaturedPositionsFetchData,
  homePageFeaturedPositionsIsLoading,
  homePageRecommendedPositionsFetchData,
  homePageRecommendedPositionsIsLoading,
} from './homePagePositions';
import resultsObject from '../__mocks__/resultsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

// set test values
const TEST_SKILL_CODES = [{ id: 100 }, { id: 200 }];
const TEST_SKILL_CODES_STRING = TEST_SKILL_CODES.join(',');
const TEST_GRADE_CODE = '03';

// set queries to test against
const queries = [
  GET_RECOMMENDED_GRADE_AND_SKILL_CODE_POSITIONS_QUERY(TEST_SKILL_CODES_STRING, TEST_GRADE_CODE),
  GET_RECOMMENDED_GRADE_POSITIONS_QUERY(TEST_GRADE_CODE),
  FAVORITE_POSITIONS_QUERY,
  GET_FEATURED_GRADE_AND_SKILL_POSITIONS_QUERY(TEST_SKILL_CODES_STRING, TEST_GRADE_CODE),
  GET_FEATURED_GRADE_POSITIONS_QUERY(TEST_GRADE_CODE),
  GET_FEATURED_POSITIONS_QUERY,
];

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`${query}`).reply(200,
        resultsObject,
      ),
    );
  });

  it('fetches positions when skill and grade are not defined', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePageRecommendedPositionsFetchData());
        store.dispatch(homePageRecommendedPositionsIsLoading());
        store.dispatch(homePageFeaturedPositionsFetchData());
        store.dispatch(homePageFeaturedPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('fetches positions when skill and grade exist', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePageRecommendedPositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePageRecommendedPositionsIsLoading());
        store.dispatch(homePageFeaturedPositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePageFeaturedPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors fetching positions when skill and grade are not defined', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`/cycleposition/${query}`).reply(404,
        null,
      ),
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePageRecommendedPositionsFetchData());
        store.dispatch(homePageRecommendedPositionsIsLoading());
        store.dispatch(homePageFeaturedPositionsFetchData());
        store.dispatch(homePageFeaturedPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors fetching positions when skill and grade exist', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    queries.forEach(query =>
      mockAdapter.onGet(`/cycleposition/${query}`).reply(404,
        null,
      ),
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(homePageRecommendedPositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePageRecommendedPositionsIsLoading());
        store.dispatch(homePageFeaturedPositionsFetchData(TEST_SKILL_CODES, TEST_GRADE_CODE));
        store.dispatch(homePageFeaturedPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
