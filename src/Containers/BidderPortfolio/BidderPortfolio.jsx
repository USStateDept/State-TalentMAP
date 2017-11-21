import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bidderPortfolioFetchData } from '../../actions/bidderPortfolio';
import { BIDDER_LIST, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import BidderPortfolioPage from '../../Components/BidderPortfolio/BidderPortfolioPage';

class BidderPortfolio extends Component {

  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.state = {
      key: 0,
      query: { value: '' },
      defaultPageSize: { value: 8 },
      defaultPageNumber: { value: 1 },
      defaultKeyword: { value: '' },
    };
  }

  componentWillMount() {
    this.getBidderPortfolio();
  }

  // for when we need to UPDATE the ENTIRE value of a filter
  onQueryParamUpdate(q) {
    const parsedQuery = queryString.parse(this.state.query.value);
    // unless we're changing the page number, go back to page 1
    if (Object.keys(q).indexOf('page') <= -1) {
      if (parsedQuery.page) {
        // deleting the key does the same thing as going back to page 1
        // and also makes our query params cleaner
        delete parsedQuery.page;
      }
    }
    // combine our old and new query objects, overwriting any diffs with new
    const newQuery = Object.assign({}, parsedQuery, q);
    // remove any params with no value
    Object.keys(newQuery).forEach((key) => {
      if (!(newQuery[key].toString().length)) {
        delete newQuery[key];
      }
    });
    // convert the object to a string
    const newQueryString = queryString.stringify(newQuery);
    // and update the query state
    this.state.query.value = newQueryString;
    this.state.defaultPageNumber.value = newQuery.page || this.state.defaultPageNumber.value;
    this.getBidderPortfolio();
  }

  getBidderPortfolio() {
    const query = this.createSearchQuery();
    this.props.fetchBidderPortfolio(query);
  }

  createSearchQuery() {
    const query = {
      page: this.state.defaultPageNumber.value,
      limit: this.state.defaultPageSize.value,
    };
    const queryState = queryString.parse(this.state.query.value);
    const newQueryString = queryString.stringify(Object.assign(query, queryState));
    return newQueryString;
  }

  render() {
    const { bidderPortfolio, bidderPortfolioIsLoading, bidderPortfolioHasErrored } = this.props;
    const { defaultPageSize, defaultPageNumber } = this.state;
    return (
      <BidderPortfolioPage
        bidderPortfolio={bidderPortfolio}
        bidderPortfolioIsLoading={bidderPortfolioIsLoading}
        bidderPortfolioHasErrored={bidderPortfolioHasErrored}
        pageSize={defaultPageSize.value}
        queryParamUpdate={this.onQueryParamUpdate}
        pageNumber={defaultPageNumber.value}
      />
    );
  }
}

BidderPortfolio.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  bidderPortfolioIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioHasErrored: PropTypes.bool.isRequired,
  fetchBidderPortfolio: PropTypes.func.isRequired,
};

BidderPortfolio.defaultProps = {
  bidderPortfolio: { results: [] },
  bidderPortfolioIsLoading: false,
  bidderPortfolioHasErrored: false,
  fetchBidderPortfolio: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  bidderPortfolio: state.bidderPortfolio,
  bidderPortfolioIsLoading: state.bidderPortfolioIsLoading,
  bidderPortfolioHasErrored: state.bidderPortfolioHasErrored,
});

const mapDispatchToProps = dispatch => ({
  fetchBidderPortfolio: query => dispatch(bidderPortfolioFetchData(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidderPortfolio));
