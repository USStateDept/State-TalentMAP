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
    if (!this.props.results) { // eslint-disable-line react/prop-types
      this.getPosts(window.location.search); // eslint-disable-line react/prop-types
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
};

export default Results;
