import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FontAwesome from 'react-fontawesome';
import { Flag } from 'flag';
import { Link } from 'react-router-dom';
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
  const p = position.position || position;
  const stats = getBidStatisticsObject(p.bid_statistics);
  const hasHandshake = get(stats, 'has_handshake_offered', false);

  const titleHeader = <h3>{position.title}</h3>;

  const link = `/details/${position.id}`;

  const innerContent = (
    <div>
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
          { titleHeader }
        </div>
      </div>
      <div className="usa-grid-full post-ribbon-container">
        <div className="post-container">
          <span><span className="title">Location:</span> <span className="data">{getPostName(p.post, NO_POST)}</span></span>
        </div>
        <Flag
          name="flags.bidding"
          render={() => (
            hasHandshake &&
              <div className="ribbon-container">
                <Handshake className="ribbon-condensed-card" />
              </div>
          )}
        />
      </div>
    </div>
  );

  const containerProps = {
    className: `usa-grid-full condensed-card-top ${cardTopClass} ${isProjectedVacancy ? '' : 'condensed-card-top--clickable'}`,
  };

  return (
    isProjectedVacancy ?
      <div {...containerProps} >
        {innerContent}
      </div>
    :
      <Link to={link} {...containerProps} title="View details for this position">
        {innerContent}
      </Link>
  );
};

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  isProjectedVacancy: PropTypes.bool,
  isRecentlyAvailable: PropTypes.bool,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'default',
  isProjectedVacancy: false,
  isRecentlyAvailable: false,
};

export default ResultsCondensedCardTop;
