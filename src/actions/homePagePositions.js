import axios from 'axios';
import api from '../api';
import { USER_SKILL_CODE_POSITIONS, USER_GRADE_RECENT_POSITIONS, SERVICE_NEED_POSITIONS } from '../Constants/PropTypes';

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

    // configure queries that mattch with properties in resultsTypes
    const queryTypes = [
      { name: SERVICE_NEED_POSITIONS, query: '?post__has_service_needs_differential&limit=3' },
    ];

    // Search for positions that match the user's skill, if it exists.
    // Otherwise, search for positions with skill code 0060.
    if (skills.length) {
      const ids = skills.map(s => s.id);
      const querySkillCodes = ids.join(',');
      queryTypes.push({ name: USER_SKILL_CODE_POSITIONS, query: `?skill__in=${querySkillCodes}&limit=3` });
    } else {
      // return a generic query
      queryTypes.push({ name: USER_SKILL_CODE_POSITIONS, query: '?skills__in=0060&limit=3' });
    }

    // Do the same thing for grades. Set grade 3 to the default if the user does not have a grade.
    if (grade != null) {
      queryTypes.push({ name: USER_GRADE_RECENT_POSITIONS, query: `?grade__code__in=${grade}&limit=3&ordering=description__date_updated` });
    } else {
      // return a generic query
      queryTypes.push({ name: USER_GRADE_RECENT_POSITIONS, query: '?grade__code__in=3&limit=3&ordering=description__date_updated' });
    }

    // create a promise with all the queries we defined
    const queryProms = queryTypes.map(type => axios.get(`${api}/position/${type.query}`));

    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array...
      .then((results) => {
        // ...and because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        results.forEach((result, i) => {
          resultsTypes[queryTypes[i].name] = result.data.results;
        });
        dispatch(homePagePositionsHasErrored(false));
        dispatch(homePagePositionsIsLoading(false));
        dispatch(homePagePositionsFetchDataSuccess(resultsTypes));
      })
      .catch(() => {
        dispatch(homePagePositionsHasErrored(true));
        dispatch(homePagePositionsIsLoading(false));
      });
  };
}
