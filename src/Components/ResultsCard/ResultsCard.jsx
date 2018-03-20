/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Row, Column } from '../Layout';
import DefinitionList, { Definition } from '../DefinitionList';
import Favorite from '../Favorite/Favorite';
import BidCount from '../BidCount';
import CompareCheck from '../CompareCheck/CompareCheck';

import { formatDate, getBidStatisticsObject } from '../../utilities';

import { POSITION_DETAILS, FAVORITE_POSITIONS_ARRAY } from '../../Constants/PropTypes';
import { NO_LAST_UPDATED_DATE, NO_BID_CYCLE } from '../../Constants/SystemMessages';

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
      'Grade': _.get(result, 'grade', ''),
      'Post': _.get(result, 'post.location', ''),
      'Skill Code': _.get(result, 'skill', ''),
      'Language': _.get(result, 'languages[0].language', ''),
    },
    {
      'Bureau': _.get(result, 'bureau', ''),
      'Tour of Duty': _.get(result, 'post.tour_of_duty'),
      'Transfer Eligibility Date': '',
      'Incumbent': _.get(result, 'current_assignment.user', ''),
    },
    {
      'Posted': formatDate(_.get(result, 'description.date_created', NO_LAST_UPDATED_DATE), 'M.DD.YYYY'),
      'Position Number': _.get(result, 'position_number', ''),
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
  };

  options.compare = {
    as: 'button',
    refKey: result.id,
    onToggle,
  };

  return (
    <div id={result.id} className="results-card">
      <Row className="header" fluid>
        <Column columns="5">
          <h1>{result.title}</h1>
          <Link to={`/details/${result.position_number}`} title="View Details">View Details</Link>
        </Column>
        <Column columns="7">
          <DefinitionList items={sections[0]} />
        </Column>
      </Row>
      <Row id={result.id} fluid>
        <Column columns="5">
          <DefinitionList items={sections[1]} />
        </Column>
        <Column columns="7">
          <DefinitionList items={sections[2]} />
        </Column>
      </Row>
      <Row className="footer" fluid>
        <Column>
          <Column columns="5" as="section">
            {
              !!favorites &&
                <Favorite className="usa-button" {...options.favorite} />
            }
            <CompareCheck className="usa-button usa-button-secondary" {...options.compare} />
          </Column>
          <Column columns="7" as="section">
            <div>
              <DefinitionList items={sections[3]} />
            </div>
          </Column>
        </Column>
      </Row>
    </div>
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
