import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Featured, Handshake } from '../Ribbon';
import { POSITION_DETAILS, HOME_PAGE_CARD_TYPE } from '../../Constants/PropTypes';
import { NO_POST } from '../../Constants/SystemMessages';
import { getPostName, getBidStatisticsObject } from '../../utilities';
import { checkFlag } from '../../flags';

const useProjectedVacancy = () => checkFlag('flags.projected_vacancy');

const ResultsCondensedCardTop = ({ position, isProjectedVacancy, isRecentlyAvailable }) => {
  let cardTopClass = '';
  let vacancyClass;
  let vacancyText;

  if (isProjectedVacancy && useProjectedVacancy()) {
    vacancyClass = 'vacancy--projected';
    vacancyText = 'Projected Vacancy';
    cardTopClass = 'card-top-vacancy';
  } else if (isRecentlyAvailable && useProjectedVacancy()) {
    vacancyClass = 'vacancy--recent';
    vacancyText = 'Now available';
  }
  const p = position.position || position;
  const stats = getBidStatisticsObject(position.bid_statistics);
  const hasHandshake = get(stats, 'has_handshake_offered', false);

  const title = get(position, 'position.title', '');

  const titleHeader = <h3>{title}</h3>;

  const link = `/${isProjectedVacancy ? 'vacancy' : 'details'}/${position.id}`;

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
          { titleHeader }
        </div>
      </div>
      <div className="usa-grid-full post-ribbon-container">
        <div className="post-container">
          <span><span className="title">Location:</span> <span className="data">
            {
              isProjectedVacancy ?
                (p.organization || NO_POST) : getPostName(p.post, NO_POST)
            }
          </span></span>
        </div>
        <div className="ribbon-container">
          {
            hasHandshake && <Handshake className="ribbon-condensed-card" />
          }
          {
            get(position, 'position.is_highlighted') && <Featured className="ribbon-results-card" />
          }
        </div>
      </div>
    </div>
  );

  const containerProps = {
    className: `usa-grid-full condensed-card-top ${cardTopClass} condensed-card-top--clickable`,
  };

  return (
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
