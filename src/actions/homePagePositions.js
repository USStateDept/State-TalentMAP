import api from '../api';
import { USER_SKILL_CODE_POSITIONS, USER_GRADE_RECENT_POSITIONS, SERVICE_NEED_POSITIONS,
RECENTLY_POSTED_POSITIONS, FAVORITED_POSITIONS } from '../Constants/PropTypes';
import { COMMON_PROPERTIES } from '../Constants/EndpointParams';

// Export our queries so that we can consistently test them.
export const HIGHLIGHTED_POSITIONS_QUERY = 'highlighted/?limit=3';
export const GET_SKILL_CODE_POSITIONS_QUERY = skillCodes => `?skill__in=${skillCodes}&limit=3`;
export const FAVORITE_POSITIONS_QUERY = 'favorites/?limit=3';
export const GET_GRADE_POSITIONS_QUERY = grade => `?grade__code__in=${grade}&limit=3&ordering=-${COMMON_PROPERTIES.posted}`;
export const RECENTLY_POSTED_POSITIONS_QUERY = `?limit=3&ordering=-${COMMON_PROPERTIES.posted}`;

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
export function homePagePositionsFetchData(skills = [], grade = null) {
  return (dispatch) => {
    dispatch(homePagePositionsIsLoading(true));
    dispatch(homePagePositionsHasErrored(false));

    // set the types of results we expect to return from the queries in queryTypes
    const resultsTypes = {
      [SERVICE_NEED_POSITIONS]: [],
      [USER_SKILL_CODE_POSITIONS]: [],
      [USER_GRADE_RECENT_POSITIONS]: [],
    };

    // configure queries that match with properties in resultsTypes
    let queryTypes = [
      { name: SERVICE_NEED_POSITIONS, query: HIGHLIGHTED_POSITIONS_QUERY },
    ];

    // Search for positions that match the user's skill, if it exists.
    // Otherwise, search for positions with Skill code 0060.
    if (skills && skills.length) {
      const ids = skills.map(s => s.id);
      const querySkillCodes = ids.join(',');
      queryTypes.push(
        { name: USER_SKILL_CODE_POSITIONS, query: GET_SKILL_CODE_POSITIONS_QUERY(querySkillCodes) },
      );
    } else {
      // delete the property we're falling back against from resultsTypes and queryTypes
      delete resultsTypes[USER_SKILL_CODE_POSITIONS];
      queryTypes = queryTypes.filter(obj => obj.name !== USER_SKILL_CODE_POSITIONS);
      // return a generic query
      queryTypes.push({ name: FAVORITED_POSITIONS, query: FAVORITE_POSITIONS_QUERY });
    }

    // Do the same thing for grades. Set grade 3 to the default if the user does not have a grade.
    if (grade != null) {
      queryTypes.push(
        { name: USER_GRADE_RECENT_POSITIONS, query: GET_GRADE_POSITIONS_QUERY(grade) },
      );
    } else {
      // delete the property we're falling back against
      delete resultsTypes[USER_GRADE_RECENT_POSITIONS];
      queryTypes = queryTypes.filter(obj => obj.name !== USER_GRADE_RECENT_POSITIONS);
      // return a generic query
      queryTypes.push({ name: RECENTLY_POSTED_POSITIONS, query: RECENTLY_POSTED_POSITIONS_QUERY });
    }

    // create a promise with all the queries we defined
    const queryProms = queryTypes.map(type => api.get(`/position/${type.query}`));

    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array...
      .then((results) => {
        // ...and because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        results.forEach((result, i) => {
          resultsTypes[queryTypes[i].name] = result.data.results;
        });
        dispatch(homePagePositionsFetchDataSuccess(resultsTypes));
        dispatch(homePagePositionsHasErrored(false));
        dispatch(homePagePositionsIsLoading(false));
      })
      .catch(() => {
        dispatch(homePagePositionsHasErrored(true));
        dispatch(homePagePositionsIsLoading(false));
      });
  };
}
