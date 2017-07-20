import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import * as AlertMessages from '../../Constants/AlertMessages';
import { POSITION_DETAILS } from '../../Constants/PropTypes';
import Share from '../Share/Share';
import LanguageList from '../LanguageList/LanguageList';

const PositionDetails = ({ details, api }) => (
  <div className="usa-grid-full">
    <div style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
      <h3> Position Number: {details.position_number} </h3>
      <p>
            Grade: {details.grade}
        <br />
            Skill: {details.skill}
        <br />
            Bureau: {details.bureau}
        <br />
            Organization: {details.organization}
        <br />
            Overseas: {details.is_overseas ? 'Yes' : 'No'}
        <br />
            Language: <LanguageList languages={details.languages} />
        <br />
            Danger Pay: {details.post ? details.post.danger_pay : AlertMessages.NO_DANGER_PAY}
        <br />
            Region: 5 {/* TODO replace hard-coded value with API value */}
        <br />
            Post: {details.post ? <Link to={`/post/${details.post.id}`}>{details.post.description}</Link> : AlertMessages.NO_POST }
        <br />
            Post Differential: {
              details.post ?
              details.post.differential_rate
              : AlertMessages.NO_POST_DIFFERENTIAL
            }
        <br />
            Created: {details.create_date}
        <br />
            Updated: {details.update_date}
      </p>
      <FavoritesButton refKey={details.position_number} type="fav" />
      <Share api={api} identifier={details.id} />
    </div>
  </div>
  );

PositionDetails.propTypes = {
  details: POSITION_DETAILS,
  api: PropTypes.string.isRequired,
};

PositionDetails.defaultProps = {
  details: null,
};

export default PositionDetails;
