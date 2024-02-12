import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { Handshake, HistDiffToStaff, IsHardToFill, ServiceNeedDifferential } from '../Ribbon';
import { HOME_PAGE_CARD_TYPE, POSITION_DETAILS } from '../../Constants/PropTypes';
import { getBidStatisticsObject } from '../../utilities';

const ResultsCondensedCardTop = ({
  position,
  isProjectedVacancy,
  isRecentlyAvailable,
  isTandem,
}) => {
  let cardTopClass = '';
  let vacancyClass;
  let vacancyText;

  if (isProjectedVacancy) {
    vacancyClass = 'vacancy--projected';
    vacancyText = 'Projected Vacancy';
    cardTopClass = 'card-top-vacancy';
  } else if (isRecentlyAvailable) {
    vacancyClass = 'vacancy--recent';
    vacancyText = 'Now available';
  }
  const stats = getBidStatisticsObject(position.bid_statistics);
  const hasHandshake = get(stats, 'has_handshake_offered', false);
  const isDifficultToStaff = get(position, 'isDifficultToStaff', false);
  const isServiceNeedDifferential = get(position, 'isServiceNeedDifferential', false);
  const isHardToFill = get(position, 'isHardToFill', false);

  const title = get(position, 'position.title', '');

  const titleHeader = <h3>{title}</h3>;
  const ribbonClass = 'ribbon-condensed-card';

  const link = `/${isProjectedVacancy ? 'vacancy' : 'details'}/${position.id}${isTandem ? '?tandem=true' : ''}`;

  const ribbons = (
    <div className="post-ribbon-container">
      <div className="ribbon-container-condensed">
        {
          hasHandshake &&
          <Tooltip
            title="Handshake"
            arrow
            offset={-60}
          >
            <Handshake showText={false} className={ribbonClass} />
          </Tooltip>
        }
        {
          isDifficultToStaff &&
          <Tooltip
            title="Hist. Diff. to Staff"
            arrow
            offset={-60}
          >
            <HistDiffToStaff showText={false} className={ribbonClass} />
          </Tooltip>
        }
        {
          isServiceNeedDifferential &&
          <Tooltip
            title="Service Need Differential"
            arrow
            offset={-100}
          >
            <ServiceNeedDifferential showText={false} className={ribbonClass} />
          </Tooltip>
        }
        {
          isHardToFill &&
          <Tooltip
            title="Hard to Fill"
            arrow
            offset={-150}
          >
            <IsHardToFill showText={false} className={ribbonClass} />
          </Tooltip>
        }
      </div>

    </div>
  );

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
    </div>
  );

  const containerProps = {
    className: `usa-grid-full ${cardTopClass} condensed-card-top--clickable`,
  };

  return (
    <div className="condensed-card-top">
      {ribbons}
      <Link to={link} {...containerProps} title="View details for this position">
        {innerContent}
      </Link>
    </div>
  );
};

ResultsCondensedCardTop.propTypes = {
  position: POSITION_DETAILS.isRequired,
  type: HOME_PAGE_CARD_TYPE,
  isProjectedVacancy: PropTypes.bool,
  isRecentlyAvailable: PropTypes.bool,
  isTandem: PropTypes.bool,
};

ResultsCondensedCardTop.defaultProps = {
  type: 'default',
  isProjectedVacancy: false,
  isRecentlyAvailable: false,
  isTandem: false,
};

export default ResultsCondensedCardTop;
