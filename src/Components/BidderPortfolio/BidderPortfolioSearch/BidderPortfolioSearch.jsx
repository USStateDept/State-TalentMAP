import { Component } from 'react';
import PropTypes from 'prop-types';
import ResultsSearchHeader from '../../ResultsSearchHeader';

class BidderPortfolioSearch extends Component {
  render() {
    const { onUpdate } = this.props;
    return (
      <div className="bidder-portfolio-search-container">
        <div className="results-search-bar-container">
          <ResultsSearchHeader
            labelSrOnly
            legendSrOnly
            legend="Client search bar"
            placeholder="Client name, skill, grade, and location"
            onUpdate={onUpdate}
            ref={(ref) => { this.searchHeaderRef = ref; }}
          />
        </div>
      </div>
    );
  }
}

BidderPortfolioSearch.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default BidderPortfolioSearch;
