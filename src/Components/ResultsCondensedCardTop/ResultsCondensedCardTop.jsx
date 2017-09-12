import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ResultsNewFlag from '../ResultsNewFlag';
import Favorite from '../Favorite/Favorite';
import * as SystemMessages from '../../Constants/SystemMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';

const ResultsCondensedCardTop = ({ type, position }) => (
  <div className="usa-grid-full condensed-card-top">
    <div className="usa-grid-full condensed-card-top-header-container">
      <div className="condensed-card-top-header condensed-card-top-header-left">
        <ResultsNewFlag />
      </div>
      <div className="condensed-card-top-header condensed-card-top-header-right">
        <Favorite type="fav" refKey={position.position_number} hideText />
      </div>
    </div>
    <FontAwesome className="condensed-top-background-image" name={type === 'popular' ? 'building' : 'flag'} size="3x" />
    <div className="usa-width-one-whole condensed-card-last-updated">
      Last Updated: {position.update_date || SystemMessages.NO_LAST_UPDATED_DATE}
    </div>
  </div>
);

ResultsCondensedCardTop.propTypes = {
  type: PropTypes.string,
  position: POSITION_DETAILS.isRequired,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardTop;
