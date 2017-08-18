import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritesButton from '../../Components/FavoritesButton/FavoritesButton';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';

const ResultsCard = ({ result, onToggle }) => (
  <div id={result.id} className="usa-grid-full" style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
    <div className="usa-width-one-half">
      <Link to={`/details/${result.position_number}`}>
        <h3> Position Number: {result.position_number} </h3>
      </Link>
      <p>
          Grade: {result.grade}
        <br />
          Skill: {result.skill}
        <br />
          Bureau: {result.bureau}
        <br />
          Organization: {result.organization}
        <br />
          Post: {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.location}</Link> : SystemMessages.NO_POST }
        <br />
          Post Differential: {result.post
            ? result.post.differential_rate : SystemMessages.NO_POST_DIFFERENTIAL}
      </p>
    </div>
    <div className="usa-width-one-half" style={{ textAlign: 'right', paddingTop: '25px' }}>
      <FavoritesButton refKey={result.position_number} type="fav" />
      <FavoritesButton
        refKey={result.position_number}
        type="compare"
        onToggle={onToggle}
        limit={2}
      />
    </div>
  </div>
);

ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ResultsCard;
