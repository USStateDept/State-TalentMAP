import { batch } from 'react-redux';
import { SPECIAL_NEEDS } from 'Constants/EndpointParams';
import { isEmpty } from 'lodash';
import api from '../api';
import { FAVORITED_POSITIONS,
  FEATURED_GRADE_AND_SKILL_CONE_POSITIONS,
  FEATURED_GRADE_AND_SKILL_POSITIONS,
  FEATURED_GRADE_POSITIONS,
  FEATURED_POSITIONS,
  RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS,
  RECOMMENDED_GRADE_AND_SKILL_POSITIONS,
  RECOMMENDED_GRADE_POSITIONS } from '../Constants/PropTypes';

const specialNeedsParams = SPECIAL_NEEDS.join(',');

// Export our queries so that we can consistently test them.
export const GET_RECOMMENDED_GRADE_AND_SKILL_CODE_POSITIONS_QUERY = (skillCodes, grade) => `/fsbid/available_positions/?cps_codes=OP&position__skill__code__in=${skillCodes}&position__grade__code__in=${grade}&limit=3`;
export const GET_RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS_QUERY = (skillCodes, grade) => `/fsbid/available_positions/?cps_codes=OP&position__skill__code__in=${skillCodes}&position__grade__code__in=${grade}&limit=3`;
export const GET_RECOMMENDED_GRADE_POSITIONS_QUERY = grade => `/fsbid/available_positions/?cps_codes=OP&position__grade__code__in=${grade}&limit=3`;
export const FAVORITE_POSITIONS_QUERY = () => '/available_position/favorites/?limit=3';

export const GET_FEATURED_GRADE_AND_SKILL_POSITIONS_QUERY = (skillCodes, grade) =>
  `/fsbid/available_positions/featuredPositions/?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__skill__code__in=${skillCodes}&position__grade__code__in=${grade}&limit=3`;
export const GET_FEATURED_GRADE_AND_SKILL_CONE_POSITIONS_QUERY = (skillCodes, grade) =>
  `/fsbid/available_positions/featuredPositions/?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__skill__code__in=${skillCodes}&position__grade__code__in=${grade}&limit=3`;
export const GET_FEATURED_GRADE_POSITIONS_QUERY = (grade) =>
  `/fsbid/available_positions/featuredPositions/?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&position__grade__code__in=${grade}&limit=3`;
export const GET_FEATURED_POSITIONS_QUERY = () =>
  `/fsbid/available_positions/featuredPositions/?cps_codes=OP&position__post_indicator__in=${specialNeedsParams}&limit=3`;

export function homePageRecommendedPositionsHasErrored(bool) {
  return {
    type: 'HOME_PAGE_RECOMMENDED_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function homePageRecommendedPositionsIsLoading(bool) {
  return {
    type: 'HOME_PAGE_RECOMMENDED_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function homePageRecommendedPositionsFetchDataSuccess(results) {
  return {
    type: 'HOME_PAGE_RECOMMENDED_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function homePageFeaturedPositionsHasErrored(bool) {
  return {
    type: 'HOME_PAGE_FEATURED_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function homePageFeaturedPositionsIsLoading(bool) {
  return {
    type: 'HOME_PAGE_FEATURED_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function homePageFeaturedPositionsFetchDataSuccess(results) {
  return {
    type: 'HOME_PAGE_FEATURED_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function homePageFeaturedPositionsFetchData(skills = [], grade, skillCones = []) {
  return (dispatch) => {
    batch(() => {
      dispatch(homePageFeaturedPositionsIsLoading(true));
      dispatch(homePageFeaturedPositionsHasErrored(false));
    });
    const queryType = {};
    // Logic:
    // 1: featuredGradeAndSkillPositions
    // 2: featuredGradePositions
    // 3: featuredPositions
    const ids = skills.map(s => s.code);
    const querySkillCodes = ids.join(',');
    const querySkillCones = skillCones.join(',');

    if (grade && skills && skills.length) {
      queryType.name = FEATURED_GRADE_AND_SKILL_POSITIONS;
      queryType.query = GET_FEATURED_GRADE_AND_SKILL_POSITIONS_QUERY(querySkillCodes, grade);
    } else if (grade && skillCones && skillCones.length) {
      queryType.name = FEATURED_GRADE_AND_SKILL_CONE_POSITIONS;
      queryType.query = GET_FEATURED_GRADE_AND_SKILL_CONE_POSITIONS_QUERY(querySkillCones, grade);
    } else if (grade) {
      queryType.name = FEATURED_GRADE_POSITIONS;
      queryType.query = GET_FEATURED_GRADE_POSITIONS_QUERY(grade);
    } else {
      queryType.name = FEATURED_POSITIONS;
      queryType.query = GET_FEATURED_POSITIONS_QUERY();
    }
    api().get(queryType.query)
      .then((results) => {
        let shouldSkip = false;
        // if our query returned no results, we will want to fall to the next arrangement
        if (isEmpty(results.data) && queryType.name !== FEATURED_POSITIONS) {
          shouldSkip = true;
          if (queryType.name === FEATURED_GRADE_AND_SKILL_POSITIONS) {
            dispatch(homePageFeaturedPositionsFetchData([], grade, skillCones));
          } else if (queryType.name === FEATURED_GRADE_AND_SKILL_CONE_POSITIONS) {
            dispatch(homePageFeaturedPositionsFetchData([], grade));
          } else if (queryType.name === FEATURED_GRADE_POSITIONS) {
            dispatch(homePageFeaturedPositionsFetchData([], null));
          }
        }
        if (!shouldSkip) {
          batch(() => {
            dispatch(homePageFeaturedPositionsFetchDataSuccess(
              { positions: results.data.results, name: queryType.name }));
            dispatch(homePageFeaturedPositionsHasErrored(false));
            dispatch(homePageFeaturedPositionsIsLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(homePageFeaturedPositionsHasErrored(true));
          dispatch(homePageFeaturedPositionsIsLoading(false));
        });
      });
  };
}

export function homePageRecommendedPositionsFetchData(skills = [], grade, skillCones = []) {
  return (dispatch) => {
    batch(() => {
      dispatch(homePageRecommendedPositionsIsLoading(true));
      dispatch(homePageRecommendedPositionsHasErrored(false));
    });
    const queryType = {};
    // Logic:
    // 1. recommendedGradeAndSkillPositions
    // 2. recommendedGradePositions
    // 3. favoritedPositions
    if (grade && skills && skills.length) {
      const ids = skills.map(s => s.code);
      const querySkillCodes = ids.join(',');
      queryType.name = RECOMMENDED_GRADE_AND_SKILL_POSITIONS;
      queryType.query = GET_RECOMMENDED_GRADE_AND_SKILL_CODE_POSITIONS_QUERY(
        querySkillCodes, grade);
    } else if (grade && skillCones && skillCones.length) {
      const querySkillCones = skillCones.join(',');
      queryType.name = RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS;
      queryType.query = GET_RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS_QUERY(
        querySkillCones, grade);
    } else if (grade) {
      queryType.name = RECOMMENDED_GRADE_POSITIONS;
      queryType.query = GET_RECOMMENDED_GRADE_POSITIONS_QUERY(grade);
    } else {
      queryType.name = FAVORITED_POSITIONS;
      queryType.query = FAVORITE_POSITIONS_QUERY();
    }

    api().get(queryType.query)
      .then((results) => {
        let shouldSkip = false;
        // if our query returned no results, we will want to fall to the next arrangement
        if (results.data.count === 0 && queryType.name !== FAVORITED_POSITIONS) {
          shouldSkip = true;
          if (queryType.name === RECOMMENDED_GRADE_AND_SKILL_POSITIONS) {
            dispatch(homePageRecommendedPositionsFetchData([], grade, skillCones));
          } else if (queryType.name === RECOMMENDED_GRADE_AND_SKILL_CONE_POSITIONS) {
            dispatch(homePageRecommendedPositionsFetchData([], grade));
          } else if (queryType.name === RECOMMENDED_GRADE_POSITIONS) {
            dispatch(homePageRecommendedPositionsFetchData([], null));
          }
        }
        if (!shouldSkip) {
          batch(() => {
            dispatch(homePageRecommendedPositionsFetchDataSuccess(
              { positions: results.data.results, name: queryType.name }));
            dispatch(homePageRecommendedPositionsHasErrored(false));
            dispatch(homePageRecommendedPositionsIsLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(homePageRecommendedPositionsHasErrored(true));
          dispatch(homePageRecommendedPositionsIsLoading(false));
        });
      });
  };
}
