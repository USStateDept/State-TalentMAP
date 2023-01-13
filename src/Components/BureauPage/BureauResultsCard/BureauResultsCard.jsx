import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import { Tooltip } from 'react-tippy';
import { COMMON_PROPERTIES } from 'Constants/EndpointParams';
import { Row } from 'Components/Layout';
import DefinitionList from 'Components/DefinitionList';
import InteractiveElement from 'Components/InteractiveElement';
import { getBidStatsToUse, getDifferentials, getResult, renderBidCountMobile } from 'Components/ResultsCard/ResultsCard';
import LanguageList from 'Components/LanguageList';
import { HistDiffToStaff, IsHardToFill, ServiceNeedDifferential } from 'Components/Ribbon';
import HandshakeStatus from 'Components/Handshake/HandshakeStatus';
import { getBidStatisticsObject, getPostName, propOrDefault, shortenString } from 'utilities';
import {
  NO_BUREAU, NO_DATE, NO_GRADE,
  NO_POSITION_NUMBER, NO_POST, NO_SKILL, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';
import HandshakeAnimation from '../../BidTracker/BidStep/HandshakeAnimation';
import MediaQuery from '../../MediaQuery';

class BureauResultsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  render() {
    const { showMore } = this.state;
    const { result, isProjectedVacancy, fromPostMenu } = this.props;

    const pos = result.position || result;

    const title = propOrDefault(pos, 'title');
    const position = getResult(pos, 'position_number', NO_POSITION_NUMBER);
    const languages = getResult(pos, 'languages', []);
    const leadHandshake = getResult(result, 'lead_handshake', null);
    const hasShortList = getResult(result, 'has_short_list', false);

    const language = (<LanguageList languages={languages} propToUse="representation" />);

    const postShort = `${getPostName(pos.post, NO_POST)}${pos.organization ? `: ${pos.organization}` : ''}`;

    const bidStatsToUse = getBidStatsToUse(result, pos);
    const stats = getBidStatisticsObject(bidStatsToUse);

    const description = shortenString(get(pos, 'description.content') || 'No description.', 2000);

    const detailsLink = (<Link to={`/profile/${fromPostMenu ? 'post' : 'bureau'}/positionmanager/${isProjectedVacancy ? 'vacancy' : 'available'}/${result.id}`}>
      <h3>{title}</h3></Link>);
    const shortListIndicator = hasShortList ? (<Tooltip
      title="Position has an active short list"
      arrow
      tabIndex="0"
    >
      <FA name="list-ol" />
    </Tooltip>) : '';

    const sections = [
    /* eslint-disable quote-props */
      {
        'Position number': position,
        'Skill': getResult(pos, 'skill_code') || NO_SKILL,
        'Grade': getResult(pos, 'grade') || NO_GRADE,
        'Bureau': getResult(pos, 'bureau_short_desc') || NO_BUREAU,
        'Tour of duty': getResult(pos, 'post.tour_of_duty') || NO_TOUR_OF_DUTY,
        'Language': language,
        'Post differential | Danger Pay': getDifferentials(pos),
        'Bid cycle': getResult(pos, 'latest_bidcycle.name', 'None Listed'),
        'TED': getResult(result, 'ted') || NO_DATE,
        'Incumbent': getResult(pos, 'current_assignment.user') || NO_USER_LISTED,
        'Posted': getResult(result, COMMON_PROPERTIES.posted) || NO_UPDATE_DATE,
      },
      {
        'Last Updated': getResult(pos, 'description.date_updated') || NO_UPDATE_DATE,
      },
      {
        'Location (Org)': postShort,
      },
    /* eslint-enable quote-props */
    ];

    const ribbonClass = 'ribbon-results-card';

    if (isProjectedVacancy) { delete sections[2].Posted; }

    return (
      <Row fluid className="bureau-results-card">
        <Row fluid>
          <Row fluid className="bureau-card--section bureau-card--header">
            <div>{detailsLink}</div>
            <div className="shortlist-icon">{shortListIndicator}</div>
            <MediaQuery breakpoint="screenXlgMin" widthType="min">
              {matches => (
                <>
                  {
                    get(result, 'isDifficultToStaff', false) && <HistDiffToStaff cutSide="both" className={ribbonClass} shortName={!matches} />
                  }
                  {
                    get(result, 'isServiceNeedDifferential', false) && <ServiceNeedDifferential cutSide="both" className={ribbonClass} shortName={!matches} />
                  }
                  {
                    get(result, 'isHardToFill', false) && <IsHardToFill cutSide="both" className={ribbonClass} shortName={!matches} />
                  }
                  {
                    get(stats, 'has_handshake_offered', false) ?
                      <>
                        <HandshakeAnimation isRibbon shortName={!matches} />
                        <HandshakeStatus handshake={leadHandshake} infoIcon />
                      </> :
                      <HandshakeStatus handshake={leadHandshake} />
                  }
                </>
              )}
            </MediaQuery>
            {renderBidCountMobile(stats)}
          </Row>
          <Row fluid className="bureau-card--section bureau-card--header">
            <DefinitionList itemProps={{ excludeColon: false }} items={sections[2]} className="bureau-definition" />
          </Row>
          <Row fluid className="bureau-card--section bureau-card--content">
            <DefinitionList itemProps={{ excludeColon: true }} items={sections[0]} className="bureau-definition" />
          </Row>
          <Row fluid className="bureau-card--section bureau-card--footer">
            <DefinitionList items={sections[1]} className="bureau-definition" />
            <div className="usa-grid-full toggle-more-container">
              <InteractiveElement className="toggle-more" onClick={() => this.setState({ showMore: !showMore })}>
                <span>View {showMore ? 'less' : 'more'} </span>
                <FA name={`chevron-${showMore ? 'up' : 'down'}`} />
              </InteractiveElement>
            </div>
          </Row>
        </Row>
        {
          showMore &&
          <Row fluid className="bureau-card--description">
            <Linkify properties={{ target: '_blank' }}>
              {description}
            </Linkify>
          </Row>
        }
      </Row>
    );
  }
}

BureauResultsCard.propTypes = {
  isProjectedVacancy: PropTypes.bool,
  result: POSITION_DETAILS.isRequired,
  fromPostMenu: PropTypes.bool,
};

BureauResultsCard.defaultProps = {
  isProjectedVacancy: false,
  fromPostMenu: false,
};

export default BureauResultsCard;
