/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Row, Column } from '../Layout';
import DefinitionList, { Definition } from '../DefinitionList';
import Favorite from '../Favorite/Favorite';
import MediaQueryWrapper from '../MediaQuery';
import BidCount from '../BidCount';
import CompareCheck from '../CompareCheck/CompareCheck';

import { formatDate, getBidStatisticsObject, propOrDefault } from '../../utilities';

import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import {
  NO_ASSIGNMENT_USER,
  NO_BID_CYCLE,
  NO_BUREAU,
  NO_END_DATE,
  NO_GRADE,
  NO_LANGUAGES,
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
  const getResult = (path, defaultValue) => {
    let value = _.get(result, path, defaultValue);

    if ((/_date|date_/i).test(path) && value !== defaultValue) {
      value = formatDate(value, dateFormat);
    }

    return value;
  };

  const position = getResult('position_number', NO_POSITION_NUMBER);

  // Wrap result is a lodash wrapper for chaining lodash methods
  // initial() -> slices up to the last item (not included) in an array
  // value() -> returns the final value after everything is processed
  const bidCycle = _.chain(result)
    .get('bid_statistics[0].bidcycle', NO_BID_CYCLE)
    .split(' ')
    .initial()
    .join(' ')
    .value();

  const sections = [
    /* eslint-disable quote-props */
    {
      'Bid Cycle': bidCycle,
    },
    {
      'Grade': getResult('grade', NO_GRADE),
      'Post': getResult('post.location', NO_POST),
      'Skill Code': getResult('skill', NO_SKILL),
      'Language': getResult('languages[0].language', NO_LANGUAGES),
    },
    {
      'Bureau': getResult('bureau', NO_BUREAU),
      'Tour of Duty': getResult('post.tour_of_duty', NO_TOUR_OF_DUTY),
      'Transfer Eligibility Date': getResult('current_assignment.estimated_end_date', NO_END_DATE),
      'Incumbent': getResult('current_assignment.user', NO_ASSIGNMENT_USER),
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
      {(matches) => {
        const columns = matches ? [5, 6] : [5, 6];
        return (
          <div id={result.id} className="results-card">
            <Row className="header" fluid>
              <Column columns={columns[0]}>
                <h3>{result.title}</h3>
                <Link to={`/details/${result.position_number}`} title="View Details">View Details</Link>
              </Column>
              <Column columns={columns[1]}>
                <DefinitionList items={sections[0]} />
              </Column>
            </Row>
            <Row id={result.id} fluid>
              <Column columns={columns[0]}>
                <DefinitionList items={sections[1]} />
              </Column>
              <Column columns={columns[1]}>
                <DefinitionList items={sections[2]} />
              </Column>
            </Row>
            <Row className="footer" fluid>
              <Column>
                <Column className="divider" columns={columns[0]} as="section">
                  {
                    !!favorites &&
                      <Favorite {...options.favorite} />
                  }
                  <CompareCheck className="usa-button usa-button-secondary" {...options.compare} />
                </Column>
                <Column columns={columns[1]} as="section">
                  <div>
                    <DefinitionList items={sections[3]} />
                  </div>
                </Column>
              </Column>
            </Row>
          </div>
        );
      }}
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
