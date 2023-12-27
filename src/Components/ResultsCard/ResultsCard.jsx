import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, isNull } from 'lodash';
import PositionSkillCodeList from 'Components/PositionSkillCodeList';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import { Column, Row } from '../Layout';
import DefinitionList from '../DefinitionList';
import Favorite from '../../Containers/Favorite';
import MediaQueryWrapper from '../MediaQuery';
import CompareCheck from '../CompareCheck/CompareCheck';
import LanguageList from '../LanguageList';
import BoxShadow from '../BoxShadow';
import { Handshake, HistDiffToStaff, IsHardToFill, ServiceNeedDifferential } from '../Ribbon';
import InBidListContainer from './InBidList';
import HoverDescription from './HoverDescription';
import BidListButton from '../../Containers/BidListButton';
import bannerImg from '../../assets/svg/card-flag.svg';
import {
  getBidStatisticsObject, getBidStatsToUse, getDifferentials, getPostName, getPostNameText,
  getResult, propOrDefault, renderBidCount, renderBidCountMobile, shortenString,
} from '../../utilities';

import { FAVORITE_POSITIONS_ARRAY, POSITION_DETAILS } from '../../Constants/PropTypes';
import {
  NO_BID_CYCLE, NO_BUREAU, NO_DATE, NO_GRADE,
  NO_POSITION_NUMBER, NO_POST, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from '../../Constants/SystemMessages';

class ResultsCard extends Component {
  getInnerId = () => {
    const { id } = this.props;
    return `${id}-inner`;
  };

  getOffsetPx = () => {
    const { id } = this.props;
    const innerId = this.getInnerId();
    const maxHeightOffset = document.getElementById(innerId).offsetTop;
    const cardHeight = document.getElementById(id).offsetHeight;

    const offset = cardHeight - maxHeightOffset;

    return `${offset}px`;
  };

  render() {
    const options = {};
    const {
      id,
      result,
      favorites,
      favoritesPV,
      favoritesTandem,
      favoritesPVTandem,
      isGroupEnd,
      isNew,
    } = this.props;
    const { isProjectedVacancy, isClient } = this.context;

    const pos = result.position || result;

    const title = propOrDefault(pos, 'title');
    const position = getResult(pos, 'position_number', NO_POSITION_NUMBER);
    const languages = getResult(pos, 'languages', []);

    const language = (<LanguageList languages={languages} propToUse="representation" />);

    const post = getPostNameText(pos);
    const postShort = getPostName(pos.post, NO_POST);

    const bidStatsToUse = getBidStatsToUse(result, pos);
    const stats = getBidStatisticsObject(bidStatsToUse);

    const description = shortenString(get(pos, 'description.content') || 'No description.', 750);
    const descriptionMobile = shortenString(get(pos, 'description.content') || 'No description.', 500);

    const innerId = this.getInnerId();

    const bidTypeTitle = isProjectedVacancy ? 'Bid Season' : 'Bid Cycle';

    const isTandem1 = result.tandem_nbr === 1;
    const isTandem2 = result.tandem_nbr === 2;
    const isTandem = isTandem1 || isTandem2;

    const commuterPost = get(pos, 'commuterPost.description');
    const commuterPostFreq = get(pos, 'commuterPost.frequency');

    const sections = [
      /* eslint-disable quote-props */
      {
        'TED': getResult(result, 'ted', NO_DATE),
        [bidTypeTitle]: getResult(result, 'bidcycle.name', NO_BID_CYCLE),
        'Skill': <PositionSkillCodeList primarySkill={get(pos, 'skill')} secondarySkill={get(pos, 'skill_secondary')} />,
        'Grade': getResult(pos, 'grade', NO_GRADE),
        'Bureau': getResult(pos, 'bureau', NO_BUREAU),
      },
      {
        'Tour of Duty': getResult(pos, 'post.tour_of_duty', NO_TOUR_OF_DUTY),
        'Language': language,
        'Post Differential | Danger Pay': getDifferentials(pos),
        'Incumbent': getResult(pos, 'current_assignment.user', NO_USER_LISTED),
        'RWA/DETO Eligible': pos?.deto_rwa ? 'Eligible' : 'Not Eligible',
      },
      {
        'Posted': getResult(result, COMMON_PROPERTIES.posted, NO_UPDATE_DATE),
        'Position Number': position,
      },
      /* eslint-enable quote-props */
    ];

    if (isProjectedVacancy) {
      delete sections[2].Posted;
      sections[1] = {
        ...sections[1],
        Assignee: getResult(pos, 'assignee', NO_USER_LISTED),
      };
    }

    options.favorite = {
      compareArray: [],
      refKey: result.id,
      hasBorder: true,
      useButtonClass: true,
      useLongText: true,
      isPV: isProjectedVacancy,
      isTandem: isTandem2,
    };

    options.compare = {
      as: 'div',
      refKey: result.id,
    };

    if (isProjectedVacancy && isTandem2) {
      options.favorite.compareArray = favoritesPVTandem;
    } else if (isProjectedVacancy) {
      options.favorite.compareArray = favoritesPV;
    } else if (isTandem2) {
      options.favorite.compareArray = favoritesTandem;
    } else {
      options.favorite.compareArray = favorites;
    }

    const detailsLink = <Link to={`/${isProjectedVacancy ? 'vacancy' : 'details'}/${result.id}${isTandem2 ? '?tandem=true' : ''}`}>View position</Link>;

    const availability = get(result, 'availability.availability');
    const availableToBid = isNull(availability) || !!availability;

    const renderBidListButton = () => (
      <BidListButton
        id={result.id}
        disabled={!availableToBid}
      />
    );

    const cardClassArray = ['results-card'];
    if (isProjectedVacancy) cardClassArray.push('results-card--secondary');
    if (isTandem) cardClassArray.push('results-card--tandem');
    if (isTandem2) cardClassArray.push('results-card--tandem-two');
    if (isGroupEnd) cardClassArray.push('results-card--group-end');
    if (isNew) cardClassArray.push('results-card--new');
    const cardClass = cardClassArray.join(' ');

    const ribbonClass = 'ribbon-results-card';

    const headingTop =
      !isTandem ?
        (<>
          <h3>{title}</h3>
          {detailsLink}
        </>)
        :
        (
          <Row className="usa-grid-full commuter-header">
            <Column columns={commuterPostFreq ? 7 : 12}><h3>Post: {postShort}</h3></Column>
            {!!commuterPostFreq && <Column className="commute-frequency" columns={5}>Commute Frequency: {commuterPostFreq}</Column>}
          </Row>
        );

    const headingBottom = !isTandem ?
      <><dt className="location-label">Location (Org):</dt><dd className="location-text">{post}</dd></>
      :
      (<>
        <div>{title}</div>
        <div className="tandem-details-link">{detailsLink}</div>
      </>);

    return (
      <MediaQueryWrapper breakpoint="screenSmMax" widthType="max">
        {matches => (
          <BoxShadow>
            <div
              id={id}
              style={{ position: 'relative', overflow: 'hidden' }}
              className={cardClass}
              onMouseOver={() => this.hover.toggleCardHovered(true)}
              onMouseLeave={() => this.hover.toggleCardHovered(false)}
            >
              {
                !!commuterPost &&
                <img
                  src={bannerImg}
                  alt="banner"
                  className="commuter-banner"
                />
              }
              {
                matches ?
                  <Row className="header" fluid>
                    <h3>{title}</h3>: {post}
                    {detailsLink}
                    {
                      !isProjectedVacancy && renderBidCountMobile(stats)
                    }
                  </Row>
                  :
                  <Row className="header" fluid>
                    <Column columns="8">
                      <Column columns="12" className="results-card-title-link">
                        {headingTop}
                      </Column>
                      <Column columns="12" className="results-card-title-link">
                        {headingBottom}
                      </Column>
                    </Column>
                    {
                      !isProjectedVacancy && renderBidCount(stats)
                    }
                  </Row>
              }
              <Row id={innerId} fluid>
                <Column columns="5">
                  {
                    !!isTandem &&
                    <div className="tandem-identifier">
                      <div>{`Tandem User ${isTandem1 ? 1 : 2}`}</div>
                    </div>
                  }
                  <DefinitionList items={sections[0]} />
                </Column>
                {
                  !matches &&
                  <Column columns="5">
                    <DefinitionList items={sections[1]} />
                  </Column>
                }
                <Column columns="2">
                  <div className="ribbon-container">
                    {
                      get(stats, 'has_handshake_offered', false) && <Handshake isWideResults className={ribbonClass} />
                    }
                    {
                      get(result, 'isDifficultToStaff', false) && <HistDiffToStaff isWideResults className={ribbonClass} />
                    }
                    {
                      get(result, 'isServiceNeedDifferential', false) && <ServiceNeedDifferential isWideResults className={ribbonClass} />
                    }
                    {
                      get(result, 'isHardToFill', false) && <IsHardToFill isWideResults className={ribbonClass} />
                    }
                    {
                      // conditional rendering occurs inside the container
                      <InBidListContainer id={result.id} isWideResults className={ribbonClass} />
                    }
                  </div>
                </Column>
              </Row>
              <Row className="footer results-card-padded-section" fluid>
                <Column columns={matches ? 8 : 6} as="section">
                  {
                    !!favorites && !isClient &&
                    <Favorite {...options.favorite} />
                  }
                  {
                    isClient && !isProjectedVacancy && renderBidListButton()
                  }
                  {!isProjectedVacancy && !isClient && <CompareCheck {...options.compare} />}
                </Column>
                <Column columns={matches ? 4 : 6} as="section">
                  <div>
                    <DefinitionList items={sections[2]} />
                  </div>
                </Column>
              </Row>
              <HoverDescription
                ref={(x) => { this.hover = x; }}
                text={matches ? descriptionMobile : description}
                getOffsetPx={this.getOffsetPx}
                id={result.id}
              />
            </div>
          </BoxShadow>
        )}
      </MediaQueryWrapper>
    );
  }
}

ResultsCard.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
  isClient: PropTypes.bool,
};

ResultsCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
  favoritesTandem: FAVORITE_POSITIONS_ARRAY,
  favoritesPVTandem: FAVORITE_POSITIONS_ARRAY,
  isGroupEnd: PropTypes.bool,
  isNew: PropTypes.bool,
};

ResultsCard.defaultProps = {
  favorites: [],
  favoritesPV: [],
  favoritesTandem: [],
  favoritesPVTandem: [],
  isGroupEnd: false,
  isNew: false,
};

export default ResultsCard;
