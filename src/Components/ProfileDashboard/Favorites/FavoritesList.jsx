import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FAVORITE_POSITIONS } from 'Constants/PropTypes';
import { DEFAULT_FAVORITES } from 'Constants/DefaultProps';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import FavoriteListResultsCard from './FavoritesListResultsCard';
import NoFavorites from '../../EmptyListAlert/NoFavorites';

const FavoriteList = ({ favoritePositions }) => {
  let favorites = [];
  let isTandem = false;
  if (get(favoritePositions, 'favorites', []).length > 0) {
    favorites = favoritePositions.favorites;
  } else if (get(favoritePositions, 'favoritesPV', []).length > 0) {
    favorites = favoritePositions.favoritesPV;
  } else if (get(favoritePositions, 'favoritesTandem', []).length > 0) {
    favorites = favoritePositions.favoritesTandem;
    isTandem = true;
  } else if (get(favoritePositions, 'favoritesPVTandem', []).length > 0) {
    favorites = favoritePositions.favoritesPVTandem;
    isTandem = true;
  }
  const positionArray = [];
  favorites.slice(0, 2).forEach((pos) => {
    const position = pos.position || pos;
    return (
      positionArray.push(
        <FavoriteListResultsCard
          position={{ ...position, cpId: pos.id }}
          isPV={pos.isPV}
          condensedView
          /* pass a parentClassName that we can use from the BorderedList component */
          parentClassName="parent-list-container"
          isTandem={isTandem}
        />,
      )
    );
  });
  return (
    <div className="usa-grid-full profile-section-container">
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title="Favorites" icon="star" len={favoritePositions.counts.all} />
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
        <Link to="/profile/favorites/">View more</Link>
      </div>
    </div>
  );
};

FavoriteList.propTypes = {
  favoritePositions: FAVORITE_POSITIONS,
};

FavoriteList.defaultProps = {
  favoritePositions: DEFAULT_FAVORITES,
};

const mapStateToProps = state => ({
  favoritePositions: state.favoritePositions,
});

export default connect(mapStateToProps)(withRouter(FavoriteList));
