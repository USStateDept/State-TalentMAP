import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { POSITION_DETAILS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';
import { NO_POST } from '../../Constants/SystemMessages';
import { getPostName } from '../../utilities';

const ResultsCondensedCardTop = ({ position, type }) => {
  let icon = '';
  let cardTopClass = '';
  let useType = false;
  if (type === 'serviceNeed') {
    icon = 'bolt';
    cardTopClass = 'card-top-alternate';
    useType = true;
  }
  return (
    <div className={`usa-grid-full condensed-card-top ${cardTopClass}`}>
      <div className="usa-grid-full condensed-card-top-header-container">
        <div
          className={
            'usa-width-one-whole condensed-card-top-header condensed-card-top-header-left'
          }
        >
          {useType && <span><FontAwesome name={icon} /> </span>}
          <h3>{position.title}</h3> <Link to={`/details/${position.id}`}>View position</Link>
        </div>
      </div>
      <div className="usa-grid-full">
        <div className="usa-width-one-whole">
          <span><span className="title">Post:</span> <span className="data">{getPostName(position.post, NO_POST)}</span></span>
        </div>
      </div>
    </div>
  );
};

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
  type: HOME_PAGE_CARD_TYPE.isRequired,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'default',
};

export default ResultsCondensedCardTop;
