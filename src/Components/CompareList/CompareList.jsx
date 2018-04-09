import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import FontAwesome from 'react-fontawesome';
import { COMPARE_LIST, GO_BACK_TO_LINK } from '../../Constants/PropTypes';
import COMPARE_LIMIT from '../../Constants/Compare';
import { NO_POST, NO_TOUR_OF_DUTY, NO_BUREAU, NO_SKILL, NO_USER_LISTED, NO_DATE } from '../../Constants/SystemMessages';
import Spinner from '../Spinner';
import LanguageList from '../LanguageList/LanguageList';
import { propOrDefault, formatDate } from '../../utilities';
import ViewPostDataButton from '../ViewPostDataButton';
import OBCUrl from '../OBCUrl';

const CompareList = ({ compare, isLoading, goBackLink }) => {
  const compareArray = compare.slice(0, COMPARE_LIMIT);
  return (
    <div className="usa-grid-full content-container">
      {
        goBackLink.text && // if goBackLink.text is defined, render...
        <div>
          <button
            className="button-back-link"
            tabIndex="0"
            role="link"
            onClick={() => window.history.back()}
          >
            <FontAwesome name="arrow-left" />
            {goBackLink.text}
          </button>
        </div>
      }
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
                            <Link to={`/details/${c.position_number}`}>View Position Details</Link>
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
                      Post
                      <div className="border-extension-layer-2 border-visible-layer-2" />
                    </th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {propOrDefault(c, 'post.location', NO_POST)}
                          {
                            propOrDefault(c, 'post.obc_id') ?
                              <ViewPostDataButton id={c.post.obc_id} />
                            :
                            null
                          }
                          <div className="border-extension-layer-2" />
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
                    <th scope="row">Position Number</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>{c.position_number}</td>
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
                    <th scope="row">Transfer Eligibility Date</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {propOrDefault(c, 'current_assignment.estimated_end_date') ? formatDate(c.current_assignment.estimated_end_date) : NO_DATE }
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">Incumbent</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          {propOrDefault(c, 'current_assignment.user', NO_USER_LISTED)}
                        </td>
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
                    <th scope="row">Post Differential</th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          N/A {propOrDefault(c, 'post.obc_id') ? <span> | <OBCUrl id={c.post.obc_id} label="Details" /></span> : null }
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <th scope="row">
                      Danger Pay
                    </th>
                    {
                      compareArray.map(c => (
                        <td key={shortId.generate()}>
                          N/A {propOrDefault(c, 'post.obc_id') ? <span> | <OBCUrl id={c.post.obc_id} label="Details" /></span> : null }
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
  goBackLink: GO_BACK_TO_LINK.isRequired,
};

CompareList.defaultProps = {
  compare: [],
  isLoading: false,
};

export default CompareList;
