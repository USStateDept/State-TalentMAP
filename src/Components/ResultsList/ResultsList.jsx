import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoritesButton from '../../Components/FavoritesButton/FavoritesButton';

class ResultsList extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <div>
        { this.props.results.map((result, i) => (
          <div key={result.id} id={result.id} className="usa-grid-full" style={{ backgroundColor: '#F2F2F2', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
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
                  Post: {result.post ? <Link to={`/post/${result.post.id}`}>{result.post.description}</Link> : 'None listed' }
                <br />
                  Post Differential: {result.post ? result.post.differential_rate : 'None listed'}
              </p>
            </div>
            <div className="usa-width-one-half" style={{ textAlign: 'right', paddingTop: '25px' }}>
              <FavoritesButton refKey={result.position_number} type="fav" iterator={i} />
              <FavoritesButton refKey={result.position_number} type="compare" iterator={i} />
            </div>
          </div>
          ))}
      </div>
    );
  }
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      grade: PropTypes.string,
      skill: PropTypes.string,
      bureau: PropTypes.string,
      organization: PropTypes.string,
      position_number: PropTypes.string.isRequired,
      is_overseas: PropTypes.boolean,
      create_date: PropTypes.string,
      update_date: PropTypes.string,
      post: PropTypes.shape({
        id: PropTypes.number,
        tour_of_duty: PropTypes.string,
        code: PropTypes.string,
        description: PropTypes.string,
        cost_of_living_adjustment: PropTypes.number,
        differential_rate: PropTypes.number,
        danger_pay: PropTypes.number,
        rest_relaxation_point: PropTypes.string,
        has_consumable_allowance: PropTypes.boolean,
        has_service_needs_differential: PropTypes.boolean,
      }),
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
  ),
};

ResultsList.defaultProps = {
  results: [],
};

export default ResultsList;
