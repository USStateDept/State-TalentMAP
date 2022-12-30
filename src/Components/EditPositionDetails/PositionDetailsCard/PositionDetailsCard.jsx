import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import { COMMON_PROPERTIES } from 'Constants/EndpointParams';
import { Row } from 'Components/Layout';
import DefinitionList from 'Components/DefinitionList';
import InteractiveElement from 'Components/InteractiveElement';
import { getDifferentials, getResult } from 'Components/ResultsCard/ResultsCard';
import LanguageList from 'Components/LanguageList';
import { getPostName, propOrDefault, shortenString } from 'utilities';
import {
  NO_BUREAU, NO_DATE, NO_GRADE,
  NO_POSITION_NUMBER, NO_POST, NO_SKILL, NO_TOUR_OF_DUTY, NO_UPDATE_DATE, NO_USER_LISTED,
} from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';

const PositionDetailsCard = ({ result, isProjectedVacancy }) => {
  const [showMore, setShowMore] = useState(false);


  const pos = get(result, 'position') || result;

  const title = propOrDefault(pos, 'title');
  const position = getResult(pos, 'position_number', NO_POSITION_NUMBER);
  const languages = getResult(pos, 'languages', []);

  const language = (<LanguageList languages={languages} propToUse="representation" />);

  const postShort = `${getPostName(get(pos, 'post') || NO_POST)}`;
  const description = shortenString(get(pos, 'description.content') || 'No description.', 2000);
  const id = get(result, 'id') || '';

  const detailsLink = (<Link to={`/profile/bureau/positionmanager/${isProjectedVacancy ? 'vacancy' : 'available'}/${id}`}>
    <h3>{title}</h3></Link>);

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
      'Location': postShort,
    },
    /* eslint-enable quote-props */
  ];

  return (
    <Row fluid className="bureau-results-card">
      <Row fluid>
        <Row fluid className="bureau-card--section bureau-card--header">
          <div>{detailsLink}</div>
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
            <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
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
};

PositionDetailsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  isProjectedVacancy: PropTypes.bool,
};

PositionDetailsCard.defaultProps = {
  isProjectedVacancy: false,
};

export default PositionDetailsCard;
