import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { BID_RESULTS, FAVORITE_POSITIONS_ARRAY, HOME_PAGE_CARD_TYPE, POSITION_DETAILS_ARRAY } from 'Constants/PropTypes';
import PositionsSectionTitle from '../PositionsSectionTitle';
import HomePagePositionsList from '../HomePagePositionsList';
import Alert from '../Alert';
import Spinner from '../Spinner';

const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  viewMoreLink: PropTypes.string,
  positions: POSITION_DETAILS_ARRAY,
  favorites: FAVORITE_POSITIONS_ARRAY,
  isLoading: PropTypes.bool,
  bidList: BID_RESULTS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  useSpinner: PropTypes.bool,
  hasErrored: PropTypes.bool,
  wrapInLink: PropTypes.bool,
};

const defaultProps = {
  icon: '', // empty string to not display icon
  viewMoreLink: '',
  positions: undefined,
  favorites: [],
  isLoading: false,
  type: 'default',
  useSpinner: false,
  hasErrored: false,
  wrapInLink: true,
};

const HomePagePositionsSection = ({ title, icon, viewMoreLink, positions,
  favorites, isLoading, hasErrored, bidList, type, useSpinner, wrapInLink }) => {
  const listIsReady = !!(positions && Object.keys(positions).length);
  const shouldShowAlert = !hasErrored && positions && !positions.length;
  const shouldShowErrorAlert = hasErrored && !isLoading;
  const shouldDisplaySpinner = useSpinner && isLoading;
  const isFavorites = title === 'Favorited Positions';

  const wrappedInLink = wrapInLink ?
    (
      <Link to={viewMoreLink} title={`View more ${title}`}>
        <h2 className="positions-section-title">
          { !!icon.length && <FontAwesome name={icon} /> }
          {title}
          <FontAwesome name="angle-right" />
        </h2>
      </Link>
    )
    :
    (
      <h2 className="positions-section-title">
        { !!icon.length && <FontAwesome name={icon} /> }
        {title}
      </h2>
    );
  return (
    <div className="usa-grid-full positions-section">
      <PositionsSectionTitle
        title={wrappedInLink}
      />
      {
        shouldDisplaySpinner && <Spinner size="small" type="homepage-positions-results" />
      }
      {
        listIsReady &&
          <HomePagePositionsList
            favorites={favorites}
            positions={positions}
            isLoading={isLoading}
            bidList={bidList}
            type={type}
            title={title}
          />
      }
      {
        shouldShowAlert && isFavorites && <Alert title="No available positions added to Favorites" />
      }
      {
        shouldShowAlert && !isFavorites && <Alert title="No results match this criteria" />
      }
      {
        shouldShowErrorAlert && <Alert title="An error occurred loading positions" type="error" />
      }
    </div>
  );
};

HomePagePositionsSection.propTypes = propTypes;

HomePagePositionsSection.defaultProps = defaultProps;

export default HomePagePositionsSection;
