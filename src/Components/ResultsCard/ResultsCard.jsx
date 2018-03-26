/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { get, isArray, isNumber } from 'lodash';
import { Row, Column } from '../Layout';
import DefinitionList, { Definition } from '../DefinitionList';
import Favorite from '../Favorite/Favorite';
import MediaQueryWrapper from '../MediaQuery';
import BidCount from '../BidCount';
import CompareCheck from '../CompareCheck/CompareCheck';

import { formatDate, getBidStatisticsObject, propOrDefault } from '../../utilities';

import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import {
  NO_BUREAU,
  NO_BID_CYCLE,
  NO_COLA,
  NO_DANGER_PAY,
  NO_END_DATE,
  NO_GRADE,
  NO_LANGUAGES,
  NO_POST_DIFFERENTIAL,
  NO_POSITION_NUMBER,
  NO_POST,
  NO_SKILL,
  NO_TOUR_OF_DUTY,
  NO_CREATE_DATE,
  NO_UPDATE_DATE,
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

  const dateFormat = 'M.DD.YYYY';
  const getResult = (path, defaultValue, isRate = false) => {
    let value = get(result, path, defaultValue);

    if ((/_date|date_/i).test(path) && value !== defaultValue) {
      value = formatDate(value, dateFormat);
    }

    if (isRate && isNumber(value)) {
      value = `${value}%`;
    }

    return value;
  };

  const position = getResult('position_number', NO_POSITION_NUMBER);
  const languages = getResult('languages', []);

  const language = (isArray(languages) && languages.length) ?
    `${getResult('languages[0].language', NO_LANGUAGES)} (1/${languages.length})` :
    NO_LANGUAGES;

  const sections = [
    /* eslint-disable quote-props */
    {
      'Skill Code': getResult('skill', NO_SKILL),
      'Grade': getResult('grade', NO_GRADE),
      'Post': getResult('post.location', NO_POST),
      'Bureau': getResult('bureau', NO_BUREAU),
    },
    {
      'Tour of Duty': getResult('post.tour_of_duty', NO_TOUR_OF_DUTY),
      'Language': language,
      'Post Differential': getResult('post.differential_rate', NO_POST_DIFFERENTIAL, true),
      'COLA': getResult('post.cost_of_living_adjustment', NO_COLA, true),
      'Danger Pay': getResult('post.danger_pay', NO_DANGER_PAY, true),
    },
    {
      'Posted': getResult('description.date_created', NO_UPDATE_DATE),
      'Position Number': position,
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
    as: 'button',
    refKey: position,
    onToggle,
  };

  return (
    <MediaQueryWrapper breakpoint="screenMdMax" widthType="max">
      {matches => (
        <div id={result.id} className="results-card">
          <Row className="header" fluid>
            <Column columns="6">
              <h3>{result.title}</h3>
              <Link to={`/details/${result.position_number}`} title="View Details">View Details</Link>
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
                <CompareCheck className="usa-button usa-button-secondary" {...options.compare} />
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
