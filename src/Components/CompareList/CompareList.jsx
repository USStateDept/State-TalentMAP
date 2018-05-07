import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import BackButton from '../BackButton';
import { COMPARE_LIST } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import { NO_POST, NO_TOUR_OF_DUTY, NO_BUREAU, NO_SKILL, NO_DATE, NO_POST_DIFFERENTIAL, NO_DANGER_PAY } from '../../Constants/SystemMessages';
import Spinner from '../Spinner';
import LanguageList from '../LanguageList/LanguageList';
import { propOrDefault, formatDate, getPostName, getDifferentialPercentage, getAccessiblePositionNumber } from '../../utilities';
import OBCUrl from '../OBCUrl';

const CompareList = ({ compare, isLoading }) => {
  const compareArray = compare.slice(0, COMPARE_LIMIT);
  return (
    <div className="usa-grid-full content-container">
      <div>
        <BackButton />
      </div>
      <div className="comparison-container">
        {
          isLoading ?
            <Spinner type="homepage-position-results" size="big" />
          :
            <div className="comparison-table-container">
              <table className="tm-table">
                <caption className="usa-sr-only">Position details comparison:</caption>
                <thead>
                  <tr>
                    <th scope="row">
                      Position
                      <div className="border-extension border-visible" />
                    </th>
                    {
                      compareArray.map(c => (
                        <th key={shortId.generate()}>
                          <div className="column-title-main">{c.title}</div>
                          <div className="column-title-link">
                            <Link to={`/details/${c.position_number}`}>View position</Link>
                          </div>
                          <div className="border-extension" />
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Position number
                      {/* border-extension-layer-2 border-visible-layer-2 should be inside
                        of first data point's <tr> in the <tbody> */}
                      <div className="border-extension-layer-2 border-visible-layer-2" />
                    </th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          <span aria-labelledby={getAccessiblePositionNumber(c.position_number)}>
                            {c.position_number}
                          </span>
                          {/* border-extension-layer-2 should be inside
                            of first data point's <td> in the <tbody> */}
                          <div className="border-extension-layer-2" />
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Skill code</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.skill || NO_SKILL}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Bureau</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.bureau || NO_BUREAU}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">
                      Post
                    </th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {getPostName(c.post, NO_POST)}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Tour of duty</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.tour_of_duty ? c.post.tour_of_duty : NO_TOUR_OF_DUTY}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Language</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          <LanguageList languages={c.languages} propToUse="representation" />
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Post differential</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {getDifferentialPercentage(propOrDefault(c, 'post.differential_rate'), NO_POST_DIFFERENTIAL)}
                          {propOrDefault(c, 'post.obc_id') ? <span> | <OBCUrl type="post-data" id={c.post.obc_id} label="View OBC Data" /></span> : null }
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">
                      Danger pay
                    </th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {getDifferentialPercentage(propOrDefault(c, 'post.danger_pay'), NO_DANGER_PAY)}
                          {propOrDefault(c, 'post.obc_id') ? <span> | <OBCUrl id={c.post.obc_id} label="View OBC Data" /></span> : null }
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">TED</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {propOrDefault(c, 'current_assignment.estimated_end_date') ? formatDate(c.current_assignment.estimated_end_date) : NO_DATE }
                        </td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
              <div className="border-bottom-extension" />
            </div>
        }
      </div>
    </div>
  );
};

CompareList.propTypes = {
  compare: COMPARE_LIST,
  isLoading: PropTypes.bool,
};

CompareList.defaultProps = {
  compare: [],
  isLoading: false,
};

export default CompareList;
