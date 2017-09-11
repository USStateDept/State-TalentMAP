import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ResultsNewFlag from '../ResultsNewFlag';
import Favorite from '../Favorite/Favorite';

const ResultsCondensedCardTop = ({ type, position }) => (
  <div className="usa-grid-full condensed-card-top">
    <div className="usa-grid-full condensed-card-top-header-container">
      <div className="condensed-card-top-header condensed-card-top-header-left">
        <ResultsNewFlag />
      </div>
      <div className="condensed-card-top-header condensed-card-top-header-right">
        {/* TODO use real favorite identifier instead of random number */}
        <Favorite type="fav" refKey={Math.random().toString()} hideText />
      </div>
    </div>
    <FontAwesome className="condensed-top-background-image" name={type === 'popular' ? 'building' : 'flag'} size="3x" />
    <div className="usa-width-one-whole condensed-card-last-updated">
      Last Updated: {position.update_date || 'Unknown'}
    </div>
  </div>
);

ResultsCondensedCardTop.propTypes = {
  type: PropTypes.string,
  position: PropTypes.shape({}).isRequired,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'new',
  position: {},
};

export default ResultsCondensedCardTop;
