import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bidderPortfolioFetchData, bidderPortfolioCountsFetchData,
  bidderPortfolioCDOsFetchData } from '../../actions/bidderPortfolio';
import { BIDDER_LIST, EMPTY_FUNCTION, BIDDER_PORTFOLIO_COUNTS } from '../../Constants/PropTypes';
import { BIDDER_PORTFOLIO_PARAM_OBJECTS } from '../../Constants/EndpointParams';
import queryParamUpdate from '../queryParams';
import BidderPortfolioPage from '../../Components/BidderPortfolio/BidderPortfolioPage';
import { checkFlag } from '../../flags';

const getUseClientCounts = () => checkFlag('flags.client_counts');

class BidderPortfolio extends Component {
  constructor(props) {
    super(props);
    this.onQueryParamUpdate = this.onQueryParamUpdate.bind(this);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      defaultPageSize: { value: 24 },
      defaultPageNumber: { value: 1 },
      defaultKeyword: { value: '' },
    };
  }

  // Fetch bidder list and bidder statistics.
  componentWillMount() {
    if (get(this.props, 'cdos', []).length) {
      this.getBidderPortfolio();
      if (getUseClientCounts()) {
        this.props.fetchBidderPortfolioCounts();
      }
    }
    this.props.fetchBidderPortfolioCDOs();
  }

  componentWillReceiveProps(nextProps) {
    if ((!isEqual(nextProps.cdos, this.props.cdos)) ||
    !isEqual(nextProps.selectedSeasons, this.props.selectedSeasons)) {
      this.getBidderPortfolio();
      this.props.fetchBidderPortfolioCounts();
    }
  }

  // For when we need to UPDATE the ENTIRE value of a filter.
  // Much of the logic is abstracted to a helper, but we need to set state within
  // the instance.
  onQueryParamUpdate(q) {
    // returns the new query string
    const newQuery = queryParamUpdate(q, this.state.query.value);
    // returns the new query object
    const newQueryObject = queryParamUpdate(q, this.state.query.value, true);
    // and update the query state
    this.state.query.value = newQuery;
    // convert to a number, if it exists
    const newQueryObjectPage = parseInt(newQueryObject.page, 10);
    this.state.defaultPageNumber.value = newQueryObjectPage || this.state.defaultPageNumber.value;
    this.getBidderPortfolio();
  }

  // Form our query and then retrieve bidders.
  getBidderPortfolio() {
    const query = this.createSearchQuery();
    this.props.fetchBidderPortfolio(query);
  }

  // We use a human-readable "type" query param for navigation that isn't actually
  // passed to the API query. So we map it against a real query param here.
  // We pass any other params in the query, but aren't passing those to the URL currently.
  mapTypeToQuery() {
    const { query } = this.state;
    let parsedQuery = queryString.parse(query.value);
    if ((Object.keys(BIDDER_PORTFOLIO_PARAM_OBJECTS)).includes(parsedQuery.type)) {
      parsedQuery = Object.assign(
        parsedQuery, { ...BIDDER_PORTFOLIO_PARAM_OBJECTS[parsedQuery.type] },
      );
      delete parsedQuery.type;
    }
    this.state.query.value = queryString.stringify(parsedQuery);
  }

  // When we trigger a new search, we reset the page number and limit.
  createSearchQuery() {
    this.mapTypeToQuery();
    const query = {
      page: this.state.defaultPageNumber.value,
      limit: this.state.defaultPageSize.value,
    };
    const queryState = queryString.parse(this.state.query.value);
    const newQuery = { ...query, ...queryState };
    return newQuery;
  }

  render() {
    const { bidderPortfolio, bidderPortfolioIsLoading, bidderPortfolioHasErrored,
    bidderPortfolioCounts, bidderPortfolioCountsIsLoading,
    bidderPortfolioCountsHasErrored, cdos, bidderPortfolioCDOsIsLoading } = this.props;
    const { defaultPageSize, defaultPageNumber } = this.state;
    const isLoading = bidderPortfolioCDOsIsLoading || bidderPortfolioIsLoading;
    return (
      <BidderPortfolioPage
        bidderPortfolio={bidderPortfolio}
        bidderPortfolioIsLoading={isLoading}
        bidderPortfolioHasErrored={bidderPortfolioHasErrored}
        pageSize={defaultPageSize.value}
        queryParamUpdate={this.onQueryParamUpdate}
        pageNumber={defaultPageNumber.value}
        bidderPortfolioCounts={bidderPortfolioCounts}
        bidderPortfolioCountsIsLoading={bidderPortfolioCountsIsLoading}
        bidderPortfolioCountsHasErrored={bidderPortfolioCountsHasErrored}
        cdosLength={cdos.length}
      />
    );
  }
}

BidderPortfolio.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  bidderPortfolioIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioHasErrored: PropTypes.bool.isRequired,
  fetchBidderPortfolio: PropTypes.func.isRequired,
  bidderPortfolioCounts: BIDDER_PORTFOLIO_COUNTS.isRequired,
  bidderPortfolioCountsIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioCountsHasErrored: PropTypes.bool.isRequired,
  fetchBidderPortfolioCounts: PropTypes.func.isRequired,
  fetchBidderPortfolioCDOs: PropTypes.func.isRequired,
  cdos: PropTypes.arrayOf(PropTypes.shape({})),
  selectedSeasons: PropTypes.arrayOf(PropTypes.string),
  bidderPortfolioCDOsIsLoading: PropTypes.bool,
};

BidderPortfolio.defaultProps = {
  bidderPortfolio: { results: [] },
  bidderPortfolioIsLoading: false,
  bidderPortfolioHasErrored: false,
  fetchBidderPortfolio: EMPTY_FUNCTION,
  bidderPortfolioCounts: {},
  bidderPortfolioCountsIsLoading: false,
  bidderPortfolioCountsHasErrored: false,
  fetchBidderPortfolioCDOs: EMPTY_FUNCTION,
  cdos: [],
  selectedSeasons: [],
  bidderPortfolioCDOsIsLoading: false,
};

const mapStateToProps = state => ({
  bidderPortfolio: state.bidderPortfolio,
  bidderPortfolioIsLoading: state.bidderPortfolioIsLoading,
  bidderPortfolioHasErrored: state.bidderPortfolioHasErrored,
  bidderPortfolioCounts: state.bidderPortfolioCounts,
  bidderPortfolioCountsIsLoading: state.bidderPortfolioCountsIsLoading,
  bidderPortfolioCountsHasErrored: state.bidderPortfolioCountsHasErrored,
  bidderPortfolioCDOs: state.bidderPortfolioCDOs,
  bidderPortfolioCDOsIsLoading: state.bidderPortfolioCDOsIsLoading,
  bidderPortfolioCDOsHasErrored: state.bidderPortfolioCDOsHasErrored,
  cdos: state.bidderPortfolioSelectedCDOsToSearchBy,
  selectedSeasons: state.bidderPortfolioSelectedSeasons,
});

export const mapDispatchToProps = dispatch => ({
  fetchBidderPortfolio: query => dispatch(bidderPortfolioFetchData(query)),
  fetchBidderPortfolioCounts: () => dispatch(bidderPortfolioCountsFetchData()),
  fetchBidderPortfolioCDOs: () => dispatch(bidderPortfolioCDOsFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidderPortfolio));
