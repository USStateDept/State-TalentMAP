import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultsList extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <div className="usa-grid-full">
        { this.props.results.map(result => (
          <div key={result.id} id={result.id} style={{ backgroundColor: '#DFDFDF', marginTop: '10px', marginBottom: '10px', padding: '15px 30px' }}>
            <a href={`/#/details/${result.position_number}`}>
              <h3> Position Number: {result.position_number} </h3>
            </a>
            <p>
                Grade: {result.grade}
              <br />
                Skill: {result.skill}
              <br />
                Bureau: {result.bureau}
              <br />
                Organization: {result.organization}
            </p>
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
