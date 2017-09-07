import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultsSearchHeader from '../../Components/ResultsSearchHeader/ResultsSearchHeader';

class Results extends Component {
  constructor(props) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
  }

  render() {
    return (
      <div className="home">
        <div className="results results-search-bar-homepage">
          <ResultsSearchHeader
            onUpdate={this.submitSearch}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
};

Results.defaultProps = {
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
