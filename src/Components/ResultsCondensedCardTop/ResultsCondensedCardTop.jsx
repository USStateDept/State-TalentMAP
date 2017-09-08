import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ResultsNewFlag from '../ResultsNewFlag';
import Favorite from '../Favorite/Favorite';

const ResultsCondensedCardTop = ({ type }) => (
  <div className="usa-grid-full condensed-card-top" style={{ borderBottom: '1px solid gray' }}>
    <div className="usa-grid-full" style={{ marginBottom: '20px' }}>
      <div style={{ width: '48%', margin: '3px 0 0 1%', float: 'left' }}>
        <ResultsNewFlag />
      </div>
      <div style={{ width: '48%', margin: '3px 1% 0 0', float: 'left', textAlign: 'right' }}>
        <Favorite hideText />
      </div>
    </div>
    <FontAwesome className="condensed-top-background-image" name={type === 'popular' ? 'building' : 'flag'} size="3x" />
    <div className="usa-width-one-whole condensed-card-last-updated">
      Last Updated: 2017-06-08
    </div>
  </div>
);

ResultsCondensedCardTop.propTypes = {
  type: PropTypes.string,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'new',
};

export default ResultsCondensedCardTop;
