import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritesButton from '../FavoritesButton/FavoritesButton';

class ResultsList extends Component {

  componentWillMount() {
  }

  render() {
    const { details } = this.props;
    const languageList = (details.languages && details.languages.length)
      ? details.languages.map(choice => (
        <span key={`${choice}-choice`}> {choice.language} </span>
      )) : <span key="no-languages"> None listed </span>;
    return (
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
            Language: <span>{languageList}</span>
            <br />
            Danger Pay: {details.post ? details.post.danger_pay : 'None listed'}
            <br />
            Region: 5 {/* TODO replace hard-coded value with API value */}
            <br />
            Post: {details.post ? <Link to={`/post/${details.post.id}`}>{details.post.description}</Link> : 'None listed' }
            <br />
            Post Differential: {details.post ? details.post.differential_rate : 'None Listed'}
            <br />
            Created: {details.create_date}
            <br />
            Updated: {details.update_date}
          </p>
          <FavoritesButton refKey={details.position_number} type="fav" />
        </div>
      </div>
    );
  }
}

ResultsList.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number,
    grade: PropTypes.string,
    skill: PropTypes.string,
    bureau: PropTypes.string,
    organization: PropTypes.string,
    position_number: PropTypes.string,
    is_overseas: PropTypes.boolean,
    create_date: PropTypes.string,
    update_date: PropTypes.string,
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        language: PropTypes.string,
        written_proficiency: PropTypes.string,
        spoken_proficiency: PropTypes.string,
        representation: PropTypes.string,
      }),
    ),
  }),
};

ResultsList.defaultProps = {
  details: null,
};

export default ResultsList;
