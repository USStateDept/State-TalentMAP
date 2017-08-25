import React from 'react';
import { Link } from 'react-router-dom';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';

const ResultsCard = ({ result }) => (
  <div>
    <div className="usa-width-five-twelfths data-section-left-container">
      <div className="data-section-left">
        <div>
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
    </div>
    <div className="usa-width-five-twelfths data-section-right-container">
      <div className="data-section-right">
        <div>
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
  </div>
);

ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
};

export default ResultsCard;
