import React from 'react';
import { Link } from 'react-router-dom';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import FavoriteListResultsCard from './FavoritesListResultsCard';
import NoFavorites from '../../EmptyListAlert/NoFavorites';

const FavoriteList = ({ favorites }) => {
  const positionArray = [];
  favorites.slice(0, 2).forEach(position => (
    positionArray.push(
      <FavoriteListResultsCard
        position={position}
        condensedView
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName="parent-list-container"
      />,
    )
  ));
  return (
    <div className="usa-grid-full profile-section-container">
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title="Favorites" icon="star-o" />
        </div>
      </div>
      <div className="favorites-list-container">
        {
          positionArray.length === 0 ?
            <div className="usa-grid-full section-padded-inner-container">
              <NoFavorites />
            </div>
          :
            <BorderedList contentArray={positionArray} />
        }
      </div>
      <div className="section-padded-inner-container small-link-container view-more-link-centered">
        <Link to="/profile/favorites/">View More</Link>
      </div>
    </div>
  );
};

FavoriteList.propTypes = {
  favorites: BID_RESULTS.isRequired,
};

FavoriteList.defaultProps = {
  favorites: [],
};

export default FavoriteList;
