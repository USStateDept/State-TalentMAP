import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, isNumber } from 'lodash';
import { Flag } from 'flag';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import { Row, Column } from '../Layout';
import DefinitionList from '../DefinitionList';
import Favorite from '../../Containers/Favorite';
import MediaQueryWrapper from '../MediaQuery';
import CompareCheck from '../CompareCheck/CompareCheck';
import LanguageList from '../LanguageList';
import BidCount from '../BidCount';
import BoxShadow from '../BoxShadow';
import { Featured, Handshake } from '../Ribbon';
import HoverDescription from './HoverDescription';
import OBCUrl from '../OBCUrl';

import { formatDate, propOrDefault, getPostName, getBidStatisticsObject, shortenString,
getDifferentialPercentage } from '../../utilities';

import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import {
  NO_BUREAU, NO_BID_CYCLE, NO_DANGER_PAY, NO_GRADE, NO_POST_DIFFERENTIAL, NO_POSITION_NUMBER,
  NO_POST, NO_SKILL, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_DATE, NO_USER_LISTED,
} from '../../Constants/SystemMessages';

const getResult = (result, path, defaultValue, isRate = false) => {
  let value = get(result, path, defaultValue);

  if ((/_date|date_|ted/i).test(path) && value !== defaultValue) {
    value = formatDate(value);
  }

  if (path === 'post.differential_rate' || path === 'post.danger_pay') {
    const value$ = getDifferentialPercentage(value);

    const OBCUrl$ = get(result, 'post.post_bidding_considerations_url');
    if (OBCUrl$) {
      return (<span> {value$} | <OBCUrl url={OBCUrl$} type="post-data" label="View OBC Data" /></span>);
    }

    return value$;
  }

  if (isRate && isNumber(value)) {
    value = `${value}%`;
  }

  if (!value) {
    value = defaultValue;
  }

  return value;
};

export const renderBidCount = stats => (
  <Column columns="4">
    <BidCount bidStatistics={stats} altStyle />
  </Column>
);

export const renderBidCountMobile = stats => (
  <BidCount bidStatistics={stats} altStyle />
);

class ResultsCard extends Component {
  constructor(props) {
    super(props);
    this.getOffsetPx = this.getOffsetPx.bind(this);
    this.getInnerId = this.getInnerId.bind(this);
  }

  getInnerId() {
    const { id } = this.props;
    return `${id}-inner`;
  }

  getOffsetPx() {
    const { id } = this.props;
    const innerId = this.getInnerId();
    const maxHeightOffset = document.getElementById(innerId).offsetTop;
    const cardHeight = document.getElementById(id).offsetHeight;

    const offset = cardHeight - maxHeightOffset;

    return `${offset}px`;
  }

  render() {
    const options = {};
    const {
      id,
      result,
      favorites,
      favoritesPV,
    } = this.props;
    const { isProjectedVacancy } = this.context;

    const pos = result.position || result;

    const title = propOrDefault(pos, 'title');
    const position = getResult(pos, 'position_number', NO_POSITION_NUMBER);
    const languages = getResult(pos, 'languages', []);

    const language = (<LanguageList languages={languages} propToUse="representation" />);

    const post = `${getPostName(pos.post, NO_POST)}${pos.organization ? `: ${pos.organization}` : ''}`;

    const stats = getBidStatisticsObject(pos.bid_statistics);

    const description = shortenString(get(pos, 'description.content') || 'No description.', 750);
    const descriptionMobile = shortenString(get(pos, 'description.content') || 'No description.', 500);

    const innerId = this.getInnerId();

  // TODO - update this to a real property once API is updateds
    const recentlyAvailable = pos.recently_available;

    const bidTypeTitle = isProjectedVacancy ? 'Bid season' : 'Bid cycle';

    const sections = [
    /* eslint-disable quote-props */
      {
        'TED': getResult(result, 'ted', NO_DATE),
        [bidTypeTitle]: getResult(result, 'bidcycle.name', NO_BID_CYCLE),
        'Skill': getResult(pos, 'skill', NO_SKILL),
        'Grade': getResult(pos, 'grade', NO_GRADE),
        'Bureau': getResult(pos, 'bureau', NO_BUREAU),
      },
      {
        'Tour of duty': getResult(pos, 'post.tour_of_duty', NO_TOUR_OF_DUTY),
        'Language': language,
        'Post differential': getResult(pos, 'post.differential_rate', NO_POST_DIFFERENTIAL, true),
        'Danger pay': getResult(pos, 'post.danger_pay', NO_DANGER_PAY, true),
        'Incumbent': getResult(pos, 'current_assignment.user', NO_USER_LISTED),
      },
      {
        'Posted': getResult(result, COMMON_PROPERTIES.posted, NO_UPDATE_DATE),
        'Position number': position,
      },
    /* eslint-enable quote-props */
    ];

    if (isProjectedVacancy) { delete sections[2].Posted; }

    options.favorite = {
      compareArray: isProjectedVacancy ? favoritesPV : favorites,
      refKey: result.id,
      hasBorder: true,
      useButtonClass: true,
      useLongText: true,
      isPV: isProjectedVacancy,
    };

    options.compare = {
      as: 'div',
      refKey: result.id,
    };

    const detailsLink = <Link to={`/${isProjectedVacancy ? 'vacancy' : 'details'}/${result.id}`}>View position</Link>;

    return (
      <MediaQueryWrapper breakpoint="screenSmMax" widthType="max">
        {matches => (
          <BoxShadow>
            <div
              id={id}
              style={{ position: 'relative', overflow: 'hidden' }}
              className={`results-card ${isProjectedVacancy ? 'results-card--secondary' : ''}`}
              onMouseOver={() => this.hover.toggleCardHovered(true)}
              onMouseLeave={() => this.hover.toggleCardHovered(false)}
            >
              {
                matches ?
                  <Row className="header" fluid>
                    <h3>{title}</h3>: {post}
                    {detailsLink}
                    {
                      !isProjectedVacancy &&
                      <Flag
                        name="flags.bidding"
                        render={() => renderBidCountMobile(stats)}
                      />
                    }
                  </Row>
                  :
                  <Row className="header" fluid>
                    <Column columns="8">
                      <Column columns="12" className="results-card-title-link">
                        <h3>{title}</h3>
                        {detailsLink}
                        {recentlyAvailable && <span className="available-alert">Now available!</span>}
                      </Column>
                      <Column columns="12" className="results-card-title-link">
                        <dt>Location:</dt><dd>{post}</dd>
                      </Column>
                    </Column>
                    {
                      !isProjectedVacancy &&
                      <Flag
                        name="flags.bidding"
                        render={() => renderBidCount(stats)}
                      />
                    }
                  </Row>
              }
              <Flag
                name="flags.bidding"
                render={() =>
                (<Row id={innerId} fluid>
                  <Column columns="6">
                    <DefinitionList items={sections[0]} />
                  </Column>
                  {
                    !matches &&
                    <Column columns="4">
                      <DefinitionList items={sections[1]} />
                    </Column>
                  }
                  <Column columns="2">
                    <div className="ribbon-container">
                      {
                        get(stats, 'has_handshake_offered', false) && <Handshake isWide className="ribbon-results-card" />
                      }
                      {
                        get(result, 'position.is_highlighted') && <Featured isWide className="ribbon-results-card" />
                      }
                    </div>
                  </Column>
                </Row>)
              }
                fallbackRender={() =>
                (<Row id={`${id}-inner`} fluid>
                  <Column columns="6">
                    <DefinitionList items={sections[0]} />
                  </Column>
                  <Column columns="6">
                    <DefinitionList items={sections[1]} />
                  </Column>
                </Row>)
              }
              />
              <Row className="footer results-card-padded-section" fluid>
                <Column columns={matches ? 8 : 6} as="section">
                  {
                    !!favorites &&
                      <Favorite {...options.favorite} />
                  }
                  {!isProjectedVacancy && <CompareCheck {...options.compare} />}
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
};

ResultsCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: POSITION_DETAILS.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  favoritesPV: FAVORITE_POSITIONS_ARRAY,
};

ResultsCard.defaultProps = {
  favorites: [],
  favoritesPV: [],
};

export default ResultsCard;
