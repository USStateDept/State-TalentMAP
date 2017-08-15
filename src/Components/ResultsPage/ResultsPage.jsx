import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ResultsList from '../ResultsList/ResultsList';
import { POSITION_SEARCH_RESULTS } from '../../Constants/PropTypes';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import ResetFiltersConnect from '../ResetFilters/ResetFiltersConnect';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';
import TotalResults from '../TotalResults/TotalResults';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  onChildToggle() {
    const key = Math.random();
    this.setState({ key });
    this.forceUpdate();
  }

  render() {
    const { results, isLoading, hasErrored } = this.props;
    const hasLoaded = !isLoading && results.results && !!results.results.length;
    return (
      <div className="usa-grid-full results">
        <div className="usa-grid-full">
          <div className="usa-width-one-third" style={{ float: 'left', padding: '15px 5px 0 10px' }}>
            <ViewComparisonLink onToggle={() => this.onChildToggle()} />
          </div>
          <div className="usa-width-one-third" style={{ float: 'left', padding: '0px 0px 5px 0px', textAlign: 'center' }}>
            <ResetFiltersConnect />
          </div>
          <div className="usa-width-one-third" style={{ float: 'left', padding: '0px 0px 5px 0px', textAlign: 'right' }}>
            <ResetComparisons onToggle={() => this.onChildToggle()} />
          </div>
        </div>
        <div className="usa-grid-full">
          <div className="usa-width-one-third" style={{ float: 'left', padding: '15px 5px 0 10px' }}>
            {
              // if results have loaded, display the total number of results
              hasLoaded &&
                <TotalResults
                  totalResults={{ count: results.results.length, total: results.count }}
                />
            }
          </div>
        </div>
        <div className="usa-grid-full">
          {
            hasLoaded &&
              <ResultsList
                key={this.state.key}
                onToggle={() => this.onChildToggle()}
                results={results}
              />
          }
          {
            // is not loading, results array exists, but is empty
            !isLoading && results.results && !results.results.length &&
              <div className="usa-grid-full no-results">
                <Alert title="No results found" messages={[{ body: 'Try broadening your search criteria' }]} />
              </div>
          }
          {
            <Loading isLoading={isLoading} hasErrored={hasErrored} />
          }
        </div>
        <div className="react-paginate">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            forcePage={this.state.currentPage.value}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: POSITION_SEARCH_RESULTS,
};

Results.defaultProps = {
  results: { results: [] },
  hasErrored: false,
  isLoading: true,
};

Results.contextTypes = {
  router: PropTypes.object,
};

export default Results;
