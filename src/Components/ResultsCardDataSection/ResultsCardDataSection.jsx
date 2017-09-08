import React from 'react';
import { Link } from 'react-router-dom';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import ResultsCardDataItem from '../ResultsCardDataItem/ResultsCardDataItem';

const ResultsCardDataSection = ({ result }) => (
  <div>
    <div className="usa-width-five-twelfths data-section-left-container">
      <div className="data-section-left">
        <ResultsCardDataItem
          title="POST INFORMATION"
          items={
          [
            { description: 'Post', text: result.post ? <Link to={`/post/${result.post.id}`}>{result.post.location}</Link> : SystemMessages.NO_POST },
            { description: 'Bureau', text: result.bureau },
            { description: 'Post Differential',
              text: result.post
                ? result.post.differential_rate : SystemMessages.NO_POST_DIFFERENTIAL },
          ]
          }
        />
      </div>
    </div>
    <div className="usa-width-five-twelfths data-section-right-container">
      <div className="data-section-right">
        <ResultsCardDataItem
          title="POSITION INFORMATION"
          items={
          [
            { description: 'Skill', text: result.skill },
            { description: 'Grade', text: result.grade },
            { description: 'Description',
              text: 'Lorem ipsum lorem' },
          ]
          }
        />
      </div>
    </div>
  </div>
);

ResultsCardDataSection.propTypes = {
  result: POSITION_DETAILS.isRequired,
};

export default ResultsCardDataSection;
