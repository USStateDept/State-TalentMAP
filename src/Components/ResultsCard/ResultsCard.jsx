import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, isNumber } from 'lodash';
import { COMMON_PROPERTIES } from '../../Constants/EndpointParams';
import { Row, Column } from '../Layout';
import DefinitionList from '../DefinitionList';
import Favorite from '../Favorite/Favorite';
import MediaQueryWrapper from '../MediaQuery';
import CompareCheck from '../CompareCheck/CompareCheck';
import LanguageList from '../LanguageList';

import { formatDate, propOrDefault, getPostName } from '../../utilities';

import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import {
  NO_BUREAU,
  NO_BID_CYCLE,
  NO_DANGER_PAY,
  NO_GRADE,
  NO_POST_DIFFERENTIAL,
  NO_POSITION_NUMBER,
  NO_POST,
  NO_SKILL,
  NO_TOUR_OF_DUTY,
  NO_UPDATE_DATE,
  NO_DATE,
} from '../../Constants/SystemMessages';

const ResultsCard = (props) => {
  const options = {};
  const {
    result,
    onToggle,
    favorites,
    toggleFavorite,
    userProfileFavoritePositionIsLoading,
    userProfileFavoritePositionHasErrored,
  } = props;

  const getResult = (path, defaultValue, isRate = false) => {
    let value = get(result, path, defaultValue);

    if ((/_date|date_/i).test(path) && value !== defaultValue) {
      value = formatDate(value);
    }

    if (isRate && isNumber(value)) {
      value = `${value}%`;
    }

    if (!value) {
      value = defaultValue;
    }

    return value;
  };

  const title = propOrDefault(result, 'title');
  const position = getResult('position_number', NO_POSITION_NUMBER);
  const languages = getResult('languages', []);

  const language = (<LanguageList languages={languages} propToUse="representation" />);

  const post = getPostName(result.post, NO_POST);

  const sections = [
    /* eslint-disable quote-props */
    {
      'Bid cycle': getResult('latest_bidcycle.name', NO_BID_CYCLE),
      'Skill code': getResult('skill', NO_SKILL),
      'Grade': getResult('grade', NO_GRADE),
      'Bureau': getResult('bureau', NO_BUREAU),
      'Post': post,
    },
    {
      'Tour of duty': getResult('post.tour_of_duty', NO_TOUR_OF_DUTY),
      'Language': language,
      'Post differential': getResult('post.differential_rate', NO_POST_DIFFERENTIAL, true),
      'Danger pay': getResult('post.danger_pay', NO_DANGER_PAY, true),
      'Transfer eligibility date': getResult('current_assignment.estimated_end_date', NO_DATE),
    },
    {
      'Posted': getResult(COMMON_PROPERTIES.posted, NO_UPDATE_DATE),
      'Position number': position,
    },
    /* eslint-enable quote-props */
  ];

  options.favorite = {
    as: 'button',
    isLoading: userProfileFavoritePositionIsLoading,
    hasErrored: userProfileFavoritePositionHasErrored,
    compareArray: favorites,
    refKey: result.id,
    onToggle: toggleFavorite,
    useLongText: true,
    useButtonClass: true,
  };

  options.compare = {
    as: 'div',
    refKey: position,
    onToggle,
  };

  return (
    <MediaQueryWrapper breakpoint="screenMdMax" widthType="max">
      {() => (
        <div id={result.id} className="results-card">
          <Row className="header" fluid>
            <Column columns="6">
              <h3>{title}</h3>
              <Link to={`/details/${result.position_number}`}>View position</Link>
            </Column>
          </Row>
          <Row id={result.id} fluid>
            <Column columns="6">
              <DefinitionList items={sections[0]} />
            </Column>
            <Column columns="6">
              <DefinitionList items={sections[1]} />
            </Column>
          </Row>
          <Row className="footer" fluid>
            <Column>
              <Column className="divider" columns="6" as="section">
                {
                  !!favorites &&
                    <Favorite {...options.favorite} />
                }
                <CompareCheck {...options.compare} />
              </Column>
              <Column columns="6" as="section">
                <div>
                  <DefinitionList items={sections[2]} />
                </div>
              </Column>
            </Column>
          </Row>
        </div>
      )}
    </MediaQueryWrapper>
  );
};


ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  onToggle: PropTypes.func.isRequired,
  favorites: FAVORITE_POSITIONS_ARRAY,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

ResultsCard.defaultProps = {
  favorites: [],
};

export default ResultsCard;
