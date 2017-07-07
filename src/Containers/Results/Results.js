import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ajax } from '../../utilities';
import ResultsList from '../../Components/ResultsList/ResultsList';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentWillMount() {
    if (!this.props.results) {
      this.getPosts(window.location.search);
    }
  }

  getPosts(q) {
    const query = q;
    const api = this.props.api;
    ajax(`${api}/position/${query}`)
      .then((res) => {
        const results = res.data;
        this.setState({ results });
      });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.length ?
          <ResultsList results={results} />
          :
          <div className="usa-grid-full">
            <center>
              Loading...
            </center>
          </div>
        }
      </div>
    );
  }
}

Results.propTypes = {
  api: PropTypes.string.isRequired,
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

Results.defaultProps = {
  results: [],
};

export default Results;
