import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { COMPARE_LIST } from '../../Constants/PropTypes';
// import COMPARE_LIMIT from '../../Constants/Compare';
// import LanguageList from '../LanguageList/LanguageList';
// import { NO_POST, NO_TOUR_OF_DUTY, NO_POST_DIFFERENTIAL,
// NO_DANGER_PAY, NO_COLA } from '../../Constants/SystemMessages';
import Spinner from '../Spinner';
import LanguageList from '../LanguageList/LanguageList';

// eslint-disable-next-line
const CompareList = ({ compare, isLoading }) => (
  <div className="usa-grid-full">
    <div className="comparison-container" style={{ position: 'relative' }}>
      {
        isLoading ?
          <Spinner type="homepage-position-results" size="big" />
        :
          <table className="tm-table">
            <caption className="usa-sr-only">Position details comparison:</caption>
            <thead>
              <tr>
                <th scope="row">Position</th>
                {
                compare.map(c => (
                  <th>
                    <div className="column-title-main">{c.title}</div>
                    <div className="column-title-sub">{c.post.location || 'None listed'}</div>
                    <div className="column-title-link">Learn more</div>
                  </th>
                ))
              }
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Grade</th>
                {
                compare.map(c => (
                  <td>{c.grade}</td>
                ))
              }
              </tr>
              <tr>
                <th scope="row">Language</th>
                {
                compare.map(c => (
                  <td><LanguageList languages={c.languages} propToUse="representation" /></td>
                ))
              }
              </tr>
              <tr>
                <th scope="row">Skill Code</th>
                {
                compare.map(c => (
                  <td>{c.skill || 'None listed'}</td>
                ))
              }
              </tr>
              <tr>
                <th scope="row">Overseas</th>
                {
                compare.map(c => (
                  <td>{c.is_overseas ? 'Yes' : 'No'}</td>
                ))
              }
              </tr>
            </tbody>
          </table>
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
