import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import Favorite from '../Favorite/Favorite';
import CompareCheck from '../CompareCheck/CompareCheck';

const ResultsCard = ({ result, onToggle }) => (
  <div id={result.id} className="usa-grid-full results-card">
    <div className="usa-grid-full">
      <div className="usa-width-one-half results-card-title">
        Position Number: {result.position_number}
      </div>
      <div className="results-card-favorite">
        <Favorite refKey={result.position_number} onToggle={onToggle} />
      </div>
    </div>
    <div className="usa-grid-full">
      <div className="usa-width-five-twelfths data-section">
        <div className="data-section-left">
          <div className="section-title">POST INFORMATION</div>
          <div className="section-data-points">
            <strong>Organization:</strong> {result.organization}
            <br />
            <strong>Post:</strong> {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.location}</Link> : SystemMessages.NO_POST }
            <br />
            <strong>Post Differential:</strong> {result.post
              ? result.post.differential_rate : SystemMessages.NO_POST_DIFFERENTIAL}
            <br />
            <strong>Bureau:</strong> {result.bureau}
          </div>
        </div>
      </div>
      <div className="usa-width-five-twelfths data-section">
        <div className="data-section-right">
          <div className="section-title">POSITION INFORMATION</div>
          <div className="section-data-points">
            <strong>Grade:</strong> {result.grade}
            <br />
            <strong>Skill:</strong> {result.skill}
            <br />
            <strong>Description:</strong> Lorem ipsum lorem
          </div>
        </div>
      </div>
    </div>
    <div className="usa-grid-full bottom-section" >
      <div className="button-link details-button">
        <Link
          className="usa-button usa-button-primary"
          style={{ fontSize: '.8em' }}
          type="submit"
          role="button"
          to={`/details/${result.position_number}`}
        >
        View details
        </Link>
      </div>
      <div className="compare-check">
        <CompareCheck refKey={result.position_number} onToggle={onToggle} />
      </div>
    </div>
  </div>
);

ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ResultsCard;
