import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPARE_LIST } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import LanguageList from '../LanguageList/LanguageList';
import { NO_POST, NO_TOUR_OF_DUTY, NO_POST_DIFFERENTIAL, NO_DANGER_PAY, NO_COLA } from '../../Constants/SystemMessages';
import Spinner from '../Spinner';

const CompareList = ({ compare, isLoading }) => (
  <div className="usa-grid-full">
    <div className="comparison-container">
      { isLoading ?
        <Spinner size="big" type="homepage-position-results" />
        :
        compare.map((result, i) => {
          if (i < COMPARE_LIMIT) {
            return (
              <div
                key={result.id}
                id={result.id}
                className={`usa-width-one-third ${(i + 1) % 3 === 0 ? 'usa-end-row' : ''} compare-card`}
              >
                <div className="usa-grid-full">
                  <Link to={`/details/${result.position_number}`}>
                    <h3> Position Number: {result.position_number} </h3>
                  </Link>
                  <p>
                  Grade: {result.grade}
                    <br />
                  Skill Code: {result.skill}
                    <br />
                  Post: {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.location}</Link> : NO_POST }
                    <br />
                  Bureau: {result.bureau}
                    <br />
                  Tour of Duty: {result.post && result.post.tour_of_duty ?
                    result.post.tour_of_duty : NO_TOUR_OF_DUTY}
                    <br />
                  Language: <LanguageList languages={result.languages} />
                    <br />
                  Post Differential: {result.post ?
                    result.post.differential_rate : NO_POST_DIFFERENTIAL}
                    <br />
                  Danger Pay: {result.post ? result.post.danger_pay : NO_DANGER_PAY}
                    <br />
                  COLA: {result.post ?
                    result.post.cost_of_living_adjustment : NO_COLA}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })
      }
    </div>
  </div>
);

CompareList.propTypes = {
  compare: COMPARE_LIST,
  isLoading: PropTypes.bool,
};

CompareList.defaultProps = {
  compare: [],
  isLoading: false,
};

export default CompareList;
