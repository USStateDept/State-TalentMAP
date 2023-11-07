import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import { NO_UPDATE_DATE } from '../../Constants/SystemMessages';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import { formatDate } from '../../utilities';

const ResultsCondensedCardFooter = ({ position, isProjectedVacancy, isTandem }) => {
  const pos = position.position || position;
  const date = position[COMMON_PROPERTIES.posted] ?
    formatDate(position[COMMON_PROPERTIES.posted]) : NO_UPDATE_DATE;
  return (
    <div className="condensed-card-footer-wrapper">
      <div className={`condensed-card-footer ${isTandem ? 'condensed-card-footer-tandem' : ''}`}>
        <div className="usa-grid-full condensed-card-footer-container">
          <div className="condensed-card-footer-left">
            <strong>Position Number: </strong>
            {pos.position_number}
          </div>
          {!isProjectedVacancy &&
            <div className="condensed-card-footer-right">
              <strong>Posted: </strong>
              {date}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

ResultsCondensedCardFooter.propTypes = {
  position: PropTypes.shape({
    position: POSITION_DETAILS.isRequired,
  }).isRequired,
  isProjectedVacancy: PropTypes.bool,
  isTandem: PropTypes.bool,
};

ResultsCondensedCardFooter.defaultProps = {
  isProjectedVacancy: false,
  isTandem: false,
};

export default ResultsCondensedCardFooter;
