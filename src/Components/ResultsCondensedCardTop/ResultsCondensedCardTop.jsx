import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Flag } from 'flag';
import Handshake from '../Ribbon/Handshake';
import { POSITION_DETAILS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';
import { NO_POST } from '../../Constants/SystemMessages';
import { getPostName, getBidStatisticsObject } from '../../utilities';
import { checkFlag } from '../../flags';

const useProjectedVacancy = () => checkFlag('flags.projected_vacancy');

const ResultsCondensedCardTop = ({ position, type, isProjectedVacancy, isRecentlyAvailable }) => {
  let icon = '';
  let cardTopClass = '';
  let useType = false;
  let vacancyClass;
  let vacancyText;
  if (type === 'serviceNeed') {
    icon = 'bolt';
    cardTopClass = 'card-top-alternate';
    useType = true;
  }
  if (isProjectedVacancy && useProjectedVacancy()) {
    vacancyClass = 'vacancy--projected';
    vacancyText = 'Projected Vacancy';
    cardTopClass = 'card-top-vacancy';
  } else if (isRecentlyAvailable && useProjectedVacancy()) {
    vacancyClass = 'vacancy--recent';
    vacancyText = 'Now available';
  }
  const stats = getBidStatisticsObject(position.bid_statistics);
  const hasHandshake = get(stats, 'has_handshake_offered', false);

  return (
    <div className={`usa-grid-full condensed-card-top ${cardTopClass}`}>
      {
        vacancyText &&
        <div className={`usa-grid-full condensed-card-top-header-container vacancy-text-container ${vacancyClass}`}>
          {vacancyText}
        </div>
      }
      <div className="usa-grid-full condensed-card-top-header-container">
        <div
          className={
            'usa-width-one-whole condensed-card-top-header condensed-card-top-header-left'
          }
        >
          {useType && <span><FontAwesome name={icon} /> </span>}
          <h3>{position.title}</h3> {!isProjectedVacancy && <Link to={`/details/${position.id}`}>View position</Link>}
        </div>
      </div>
      <div className="usa-grid-full post-ribbon-container">
        <div>
          <span><span className="title">Post:</span> <span className="data">{getPostName(position.post, NO_POST)}</span></span>
        </div>
        <Flag
          name="flags.bidding"
          render={() => (
            hasHandshake &&
              <div>
                <Handshake className="ribbon-condensed-card" />
              </div>
          )}
        />
      </div>
    </div>
  );
};

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
  type: HOME_PAGE_CARD_TYPE.isRequired,
  isProjectedVacancy: PropTypes.bool,
  isRecentlyAvailable: PropTypes.bool,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'default',
  isProjectedVacancy: false,
  isRecentlyAvailable: false,
};

export default ResultsCondensedCardTop;
