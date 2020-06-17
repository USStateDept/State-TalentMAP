import api from '../api';
import { USER_SKILL_AND_GRADE_POSITIONS, USER_GRADE_POSITIONS, FAVORITED_POSITIONS, HIGHLIGHTED_POSITIONS } from '../Constants/PropTypes';
import { COMMON_PROPERTIES } from '../Constants/EndpointParams';

// Export our queries so that we can consistently test them.
export const GET_GRADE_AND_SKILL_CODE_POSITIONS_QUERY = (skillCodes, grade) => `/fsbid/available_positions/?position__skill__code__in=${skillCodes}&position__grade__code__in=${grade}&limit=3`;
export const GET_GRADE_POSITIONS_QUERY_NEW = grade => `/fsbid/available_positions/?position__grade__code__in=${grade}&limit=3`;
export const FAVORITE_POSITIONS_QUERY = () => '/available_position/favorites/?limit=3';
export const HIGHLIGHTED_POSITIONS_QUERY = () => '/available_position/highlight/?limit=3';

export const GET_SKILL_CODE_POSITIONS_QUERY = skillCodes => `/fsbid/available_positions/?position__skill__in=${skillCodes}&limit=3`;
export const GET_GRADE_POSITIONS_QUERY = grade => `/fsbid/available_positions/?position__grade__code__in=${grade}&limit=3&ordering=-${COMMON_PROPERTIES.posted}`;
export const RECENTLY_POSTED_POSITIONS_QUERY = () => `/fsbid/available_positions/?limit=3&ordering=-${COMMON_PROPERTIES.posted}`;

export function homePagePositionsHasErrored(bool) {
  return {
    type: 'HOME_PAGE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function homePagePositionsIsLoading(bool) {
  return {
    type: 'HOME_PAGE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function homePagePositionsFetchDataSuccess(results) {
  return {
    type: 'HOME_PAGE_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

// general positions search results
export function homePagePositionsFetchData(skills = [], grade) {
  return (dispatch) => {
    dispatch(homePagePositionsIsLoading(true));
    dispatch(homePagePositionsHasErrored(false));

    const resultsTypes = {
      [USER_SKILL_AND_GRADE_POSITIONS]: [],
      [USER_GRADE_POSITIONS]: [],
      [FAVORITED_POSITIONS]: [],
      [HIGHLIGHTED_POSITIONS]: [],
    };
    const queryTypes = [];
    // arrangement:
    // 1: userSkillAndGradePositions
    // 2: userGradePositions
    // 3: favoritedPositions
    if (grade && skills && skills.length) {
      const ids = skills.map(s => s.code);
      const querySkillCodes = ids.join(',');
      queryTypes.push(
        {
          name: USER_SKILL_AND_GRADE_POSITIONS,
          query: GET_GRADE_AND_SKILL_CODE_POSITIONS_QUERY(querySkillCodes, grade),
        },
      );
    } else if (grade) {
      queryTypes.push(
        { name: USER_GRADE_POSITIONS, query: GET_GRADE_POSITIONS_QUERY_NEW(grade) },
      );
    } else queryTypes.push({ name: FAVORITED_POSITIONS, query: FAVORITE_POSITIONS_QUERY() });
    // uncomment when being used in production
    /*    queryTypes.push(
      { name: HIGHLIGHTED_POSITIONS, query: HIGHLIGHTED_POSITIONS_QUERY() },
    ); */

    const queryProms = queryTypes.map(type => api().get(type.query));
    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array...
      .then((results) => {
        // ...and because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        let shouldSkip = false;
        results.forEach((result, i) => {
          // if our query returned no results, we will want to fall to the next arrangement
          if (!result.data.results.length && queryTypes[i].name !== 'favoritedPositions') {
            shouldSkip = true;
            if (queryTypes[i].name === 'userSkillAndGradePositions') {
              dispatch(homePagePositionsFetchData([], grade));
            } else if (queryTypes[i].name === 'userGradePositions') {
              dispatch(homePagePositionsFetchData([], null));
            }
          }
          resultsTypes[queryTypes[i].name] = result.data.results;
        });
        if (!shouldSkip) {
          dispatch(homePagePositionsFetchDataSuccess(resultsTypes));
          dispatch(homePagePositionsHasErrored(false));
          dispatch(homePagePositionsIsLoading(false));
        }
      })
      .catch(() => {
        dispatch(homePagePositionsHasErrored(true));
        dispatch(homePagePositionsIsLoading(false));
      });
  };
}
