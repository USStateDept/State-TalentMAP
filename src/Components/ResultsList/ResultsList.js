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
          <div key={result.id} id={result.id} className="usa-grid-full" style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
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
                  Post: <Link to={'/post/100'}>100</Link>
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
