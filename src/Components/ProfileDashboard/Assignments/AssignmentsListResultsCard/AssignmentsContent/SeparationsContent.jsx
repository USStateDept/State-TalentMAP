import PropTypes from 'prop-types';
import { get } from 'lodash';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { formatDate } from 'utilities';

const SeparationsContent = ({ separation }) => {
  const getDutyStation = () => {
    const city = get(separation, 'sepd_city', null);
    const state = get(separation, 'sepd_country_state', null);
    if (state && city) {
      return `${city}, ${state}`;
    }
    return DEFAULT_TEXT;
  };

  return (
    <div className="usa-grid-full bid-content-container">
      <div className="bid-list-card-title-lg bid-list-card-title-post">Separation</div>
      <div>
        <span className="bid-list-card-title-post">Status: </span>
        {get(separation, 'asgs_code') || DEFAULT_TEXT}
      </div>
      <div>
        <span className="bid-list-card-title-post">Duty Station: </span>
        {getDutyStation()}
      </div>
      <div>
        <span className="bid-list-card-title-post">Travel: </span>
        {get(separation, 'travel') || DEFAULT_TEXT}
      </div>
      <div>
        <span className="bid-list-card-title-post">Separation Date: </span>
        {formatDate(get(separation, 'sepd_separation_date')) || DEFAULT_TEXT}
      </div>
    </div>
  );
};

SeparationsContent.propTypes = {
  separation: PropTypes.shape({
    asgs_code: PropTypes.string,
    sepd_dsccd: PropTypes.string,
    sepd_separation_date: PropTypes.string,
  }).isRequired,
};

export default SeparationsContent;
