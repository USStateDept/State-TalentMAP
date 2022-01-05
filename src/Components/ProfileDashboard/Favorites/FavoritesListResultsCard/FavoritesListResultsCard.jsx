import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../../../Constants/PropTypes';
import InformationDataPoint from '../../../ProfileDashboard/InformationDataPoint';
import FavoriteContent from './FavoriteContent';
import LinkButton from '../../../LinkButton';

const FavoritesListResultsCard = ({ position, isPV, isTandem }) => (
  <div className="usa-grid-full saved-search-card favorites-card" key={position.id}>
    <div className="usa-grid-full">
      <div className="usa-width-two-thirds favorites-card-section">
        <InformationDataPoint
          titleOnBottom
          content={
            <FavoriteContent position={position} />
          }
        />
      </div>
      <div className="usa-width-one-third favorites-card-section">
        <LinkButton toLink={`/${isPV ? 'vacancy' : 'details'}/${position.cpId}${isTandem ? '?tandem=true' : ''}`}>View Position</LinkButton>
      </div>
    </div>
  </div>
);

FavoritesListResultsCard.propTypes = {
  position: POSITION_DETAILS.isRequired,
  isPV: PropTypes.bool,
  isTandem: PropTypes.bool,
};

FavoritesListResultsCard.defaultProps = {
  isPV: false,
  isTandem: false,
};

export default FavoritesListResultsCard;
