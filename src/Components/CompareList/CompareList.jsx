import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import { COMPARE_LIST } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import { NO_POST, NO_TOUR_OF_DUTY, NO_POST_DIFFERENTIAL, NO_BUREAU, NO_ORG,
NO_DANGER_PAY, NO_COLA, NO_SKILL, NO_GRADE, NO_REST_RELAXATION } from '../../Constants/SystemMessages';
import Spinner from '../Spinner';
import LanguageList from '../LanguageList/LanguageList';

const CompareList = ({ compare, isLoading }) => {
  const compareArray = compare.slice(0, COMPARE_LIMIT);
  return (
    <div className="usa-grid-full">
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
                    <th scope="row">Position</th>
                    {
                      compareArray.map(c => (
                        <th key={shortId.generate()}>
                          <div className="column-title-main">{c.title}</div>
                          <div className="column-title-sub">
                            {c.post && c.post.location ? c.post.location : NO_POST}
                          </div>
                          <div className="column-title-link">
                            <Link to={`/details/${c.position_number}`}>Learn more</Link>
                          </div>
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Grade</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.grade || NO_GRADE}</td>
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
                    <th scope="row">Skill Code</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.skill || NO_SKILL}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Overseas</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.is_overseas ? 'Yes' : 'No'}</td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
              <table className="tm-table">
                <caption className="usa-sr-only">Post details comparison:</caption>
                <thead className="tm-header-no-columns">
                  <tr>
                    <th scope="row">Post</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Organization</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.organization || NO_ORG}</td>
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
                    <th scope="row">Post Differential</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.differential_rate
                            ? c.post.differential_rate : NO_POST_DIFFERENTIAL}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Danger Pay</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.danger_pay ? c.post.danger_pay : NO_DANGER_PAY}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Consumable Allowance</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.post && c.post.has_consumable_allowance ? 'Yes' : 'No'}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Tour of Duty</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.tour_of_duty ? c.post.tour_of_duty : NO_TOUR_OF_DUTY}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Cost of Living Adjustment</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.cost_of_living_adjustment
                            ? c.post.cost_of_living_adjustment : NO_COLA}
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Service Needs Differential</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.post && c.post.has_service_needs_differential ? 'Yes' : 'No'}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Rest & Relaxation Point</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {c.post && c.post.rest_relaxation_point
                            ? c.post.rest_relaxation_point : NO_REST_RELAXATION}
                        </td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
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
