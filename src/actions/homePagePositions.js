import axios from 'axios';
import api from '../api';

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

    const resultsTypes = {
      isServiceNeed: [], isSkillCode: [], isGradeAndRecent: [],
    };

    const queryTypes = [
      { name: 'isServiceNeed', query: '?post__has_service_needs_differential' },
    ];

    if (skills.length) {
      const ids = skills.map(s => s.id);
      const querySkillCodes = ids.join(',');
      queryTypes.push({ name: 'isSkillCode', query: `?skill__in=${querySkillCodes}&limit=3` });
    } else {
      // return a generic query
      queryTypes.push({ name: 'isSkillCode', query: '?skills__in=0060&limit=3' });
    }

    if (grade != null) {
      queryTypes.push({ name: 'isGradeAndRecent', query: `?grade__code__in=${grade}&limit=3&ordering=description__date_updated` });
    } else {
      // return a generic query
      queryTypes.push({ name: 'isGradeAndRecent', query: '?grade__code__in=3&limit=3&ordering=description__date_updated' });
    }

    const queryProms = queryTypes.map(type => axios.get(`${api}/position/${type.query}`));

    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array...
      .then((results) => {
        // ...and because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        results.forEach((result, i) => {
          resultsTypes[queryTypes[i].name] = result.data.results;
          resultsTypes[queryTypes[i].name] = result.data.results;
          resultsTypes[queryTypes[i].name] = result.data.results;
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
