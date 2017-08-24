import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import FavoritesButton from '../../Components/FavoritesButton/FavoritesButton';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import * as SystemMessages from '../../Constants/SystemMessages';
import Favorite from '../Favorite/Favorite';

const ResultsCard = ({ result }) => ( // onToggle
  <div id={result.id} className="usa-grid-full results-card" style={{ backgroundColor: '#fff', margin: '1em 1em', marginBottom: '1em', padding: '1em 1.2em 1em 1.2em' }}>
    <div className="usa-grid-full">
      <div className="usa-width-one-half" style={{ float: 'left' }}>
        Position Number: {result.position_number}
      </div>
      <div style={{ float: 'right', fontSize: '.8em' }}>
        <Favorite refKey={result.position_number} />
      </div>
    </div>
    <div className="usa-grid-full">
      <div className="usa-width-five-twelfths data-section" style={{ marginTop: '1em', borderRight: 'solid', borderWidth: '1px' }}>
        <div className="data-section-left" style={{ marginRight: '40px' }}>
          <div className="section-title" style={{ marginBottom: '.6em', fontSize: '.8em' }}>POST INFORMATION</div>
          <div className="section-data-points" style={{ fontSize: '.8em' }}>
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
      <div className="usa-width-five-twelfths data-section" style={{ marginTop: '1em' }}>
        <div className="data-section-right" style={{ marginLeft: '40px' }}>
          <div className="section-title" style={{ marginBottom: '.6em', fontSize: '.8em' }}>POSITION INFORMATION</div>
          <div className="section-data-points" style={{ fontSize: '.8em' }}>
            <strong>Grade:</strong> {result.grade}
            <br />
            <strong>Skill:</strong> {result.skill}
            <br />
            <strong>Description:</strong> Lorem ipsum lorem
          </div>
        </div>
      </div>
    </div>
    <div className="usa-grid-full" style={{ marginTop: '1em', float: 'left' }}>
      <span className="button-link">
        <Link
          class="usa-button usa-button-primary"
          style={{ fontSize: '.8em' }}
          type="submit"
          role="button"
          to={`/details/${result.position_number}`}
        >
        View details
        </Link>
      </span>
      {/* <FavoritesButton refKey={result.position_number} type="fav" />
      <FavoritesButton
        refKey={result.position_number}
        type="compare"
        onToggle={onToggle}
        limit={2}
      /> */}
    </div>
  </div>
);

ResultsCard.propTypes = {
  result: POSITION_DETAILS.isRequired,
  // onToggle: PropTypes.func.isRequired,
};

export default ResultsCard;
