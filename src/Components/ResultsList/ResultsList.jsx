import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { get } from 'lodash';
import ResultsCard from 'Components/ResultsCard/ResultsCard';
import { POSITION_SEARCH_RESULTS, FAVORITE_POSITIONS_ARRAY, BID_RESULTS } from 'Constants/PropTypes';

export const getIsGroupEnd = (results, i) => {
  const nextIndex = i + 1;
  const nextResult = get(results, `[${nextIndex}]`);
  const currentCommuterPost = get(results, `[${i}].position.commuterPost.description`);
  const nextCommuterPost = get(nextResult, 'position.commuterPost.description');
  const currentCity = get(results, `[${i}].position.post.location.city`);
  const nextCity = get(nextResult, 'position.post.location.city');
  let isGroupEnd = false;
  if (currentCommuterPost && nextCommuterPost && currentCommuterPost !== nextCommuterPost) {
    isGroupEnd = true;
  } else if (currentCity && nextCity && currentCity !== nextCity) {
    isGroupEnd = true;
  }
  return isGroupEnd;
};

const ResultsList = ({ results, isLoading, favorites, favoritesPV,
  favoritesTandem, favoritesPVTandem, bidList }, { isTandemSearch }) => {
  const mapResults = results.results || [];
  return (
    <div className={isLoading ? 'results-loading' : null}>
      { mapResults.map((result, i) => {
        const key = shortid.generate();
        const useGroupEnd = getIsGroupEnd(mapResults, i) && isTandemSearch;
        return (
          <ResultsCard
            id={key}
            favorites={favorites}
            favoritesPV={favoritesPV}
            favoritesTandem={favoritesTandem}
            favoritesPVTandem={favoritesPVTandem}
            key={key}
            result={result}
            bidList={bidList}
            isGroupEnd={useGroupEnd}
          />
        );
      })}
    </div>
  );
};

ResultsList.contextTypes = {
  isTandemSearch: PropTypes.bool,
};

ResultsList.propTypes = {
  results: POSITION_SEARCH_RESULTS,
  isLoading: PropTypes.bool,
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  favoritesTandem: FAVORITE_POSITIONS_ARRAY,
  favoritesPVTandem: FAVORITE_POSITIONS_ARRAY,
  bidList: BID_RESULTS.isRequired,
};

ResultsList.defaultProps = {
  results: { results: [] },
  isLoading: false,
  favorites: [],
  favoritesPV: [],
  favoritesTandem: [],
  favoritesPVTandem: [],
};

export default ResultsList;
