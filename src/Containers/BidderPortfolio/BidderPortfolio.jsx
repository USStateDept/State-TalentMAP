import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual, omit, pick } from 'lodash';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchClassifications } from 'actions/classifications';
import { BID_PORTFOLIO_FILTERS_TYPE, BID_PORTFOLIO_SORTS_TYPE, CLIENTS_PAGE_SIZES } from 'Constants/Sort';
import { bidderPortfolioCDOsFetchData, bidderPortfolioCountsFetchData,
  bidderPortfolioFetchData } from 'actions/bidderPortfolio';
import { availableBiddersIds } from 'actions/availableBidders';
import { BIDDER_LIST, BIDDER_PORTFOLIO_COUNTS, CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { BIDDER_PORTFOLIO_PARAM_OBJECTS } from 'Constants/EndpointParams';
import queryParamUpdate from '../queryParams';
import BidderPortfolioPage from '../../Components/BidderPortfolio/BidderPortfolioPage';
import { checkFlag } from '../../flags';

const getUseClientCounts = () => checkFlag('flags.client_counts');

class BidderPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      query: { value: window.location.search.replace('?', '') || '' },
      limit: { value: CLIENTS_PAGE_SIZES.defaultSort },
      page: { value: 1 },
      defaultKeyword: { value: '' },
      hasHandshake: { value: props.defaultHandshakeFilter },
      ordering: { value: props.defaultSort },
      bidderIdsHasLoaded: false,
    };
  }
  // Fetch bidder list and bidder statistics.
  UNSAFE_componentWillMount() {
    if (get(this.props, 'cdos', []).length) {
      this.getBidderPortfolio();
      if (getUseClientCounts()) {
        this.props.fetchBidderPortfolioCounts();
      }
    }
    this.props.fetchBidderPortfolioCDOs();
    this.props.fetchClassifications();
    this.props.fetchAvailableBidders();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const props = ['cdos', 'selectedSeasons', 'selectedUnassigned'];
    if (!isEqual(pick(this.props, props), pick(nextProps, props))) {
      this.setState({
        // Reset page number, since these filters are
        // captured outside the normal query param lifecycle.
        page: { value: 1 },
      }, () => {
        this.getBidderPortfolio();
        this.props.fetchBidderPortfolioCounts();
      });
    }
    if (this.props.availableBiddersIdsLoading && !nextProps.availableBiddersIdsLoading) {
      this.setState({
        bidderIdsHasLoaded: true,
      });
    }
  }

  // For when we need to UPDATE the ENTIRE value of a filter.
  // Much of the logic is abstracted to a helper, but we need to set state within
  // the instance.
  onQueryParamUpdate = q => {
    const { query, page } = this.state;
    this.setState({ [Object.keys(q)[0]]: { value: Object.values(q)[0] } });
    const newQuery = queryParamUpdate(q, query.value);
    const newQueryObject = queryParamUpdate(q, query.value, true);

    // and update the query state
    query.value = newQuery;
    // convert to a number, if it exists
    const newQueryObjectPage = parseInt(newQueryObject.page, 10);
    page.value = newQueryObjectPage || 1;
    this.setState({ query, page }, () => {
      this.getBidderPortfolio();
    });
  };

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
      parsedQuery = omit(parsedQuery, ['type']);
    }
    query.value = queryString.stringify(parsedQuery);
    this.setState({ query });
  }

  // When we trigger a new search, we reset the page number and limit.
  createSearchQuery() {
    const { page, limit, hasHandshake, ordering } = this.state;
    this.mapTypeToQuery();
    const query = {
      page: page.value,
      limit: limit.value,
      hasHandshake: hasHandshake.value,
      ordering: ordering.value,
    };
    const queryState = queryString.parse(this.state.query.value);
    let newQuery = { ...queryState, ...query };
    newQuery = queryParamUpdate(
      {},
      queryString.stringify(newQuery),
      true,
      false,
    ); // filter undefined values
    return newQuery;
  }

  render() {
    const { bidderPortfolio, bidderPortfolioIsLoading, bidderPortfolioHasErrored,
      bidderPortfolioCounts, bidderPortfolioCountsIsLoading, availableBiddersIdsLoading,
      bidderPortfolioCountsHasErrored, cdos, bidderPortfolioCDOsIsLoading,
      classifications, classificationsIsLoading, classificationsHasErrored } = this.props;
    const { limit, page, hasHandshake, ordering, bidderIdsHasLoaded } = this.state;
    const isLoading = (bidderPortfolioCDOsIsLoading || bidderPortfolioIsLoading
      || (availableBiddersIdsLoading && !bidderIdsHasLoaded)) && cdos.length;
    return (
      <div>
        <BidderPortfolioPage
          bidderPortfolio={bidderPortfolio}
          bidderPortfolioIsLoading={isLoading}
          bidderPortfolioHasErrored={bidderPortfolioHasErrored}
          pageSize={limit.value}
          queryParamUpdate={this.onQueryParamUpdate}
          pageNumber={page.value}
          bidderPortfolioCounts={bidderPortfolioCounts}
          bidderPortfolioCountsIsLoading={bidderPortfolioCountsIsLoading}
          bidderPortfolioCountsHasErrored={bidderPortfolioCountsHasErrored}
          classificationsIsLoading={classificationsIsLoading}
          classificationsHasErrored={classificationsHasErrored}
          classifications={classifications}
          cdosLength={cdos.length}
          defaultHandshake={hasHandshake.value}
          defaultOrdering={ordering.value}
        />
      </div>

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
  selectedSeasons: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), // eslint-disable-line
  fetchClassifications: PropTypes.func.isRequired,
  classifications: CLASSIFICATIONS,
  classificationsHasErrored: PropTypes.bool.isRequired,
  classificationsIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioCDOsIsLoading: PropTypes.bool,
  defaultHandshakeFilter: PropTypes.string,
  defaultSort: PropTypes.string,
  fetchAvailableBidders: PropTypes.func.isRequired,
  selectedUnassigned: PropTypes.arrayOf(PropTypes.shape({})), // eslint-disable-line
  availableBiddersIdsLoading: PropTypes.bool,
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
  classificationsIsLoading: false,
  classificationsHasErrored: false,
  fetchClassifications: EMPTY_FUNCTION,
  cdos: [],
  selectedSeasons: [],
  classifications: [],
  bidderPortfolioCDOsIsLoading: false,
  defaultHandshakeFilter: '',
  defaultSort: '',
  fetchAvailableBidders: EMPTY_FUNCTION,
  selectedUnassigned: [],
  availableBiddersIdsLoading: false,
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
  classificationsIsLoading: state.classificationsIsLoading,
  classificationsHasErrored: state.classificationsHasErrored,
  classifications: state.classifications,
  defaultHandshakeFilter: get(state, `sortPreferences.${BID_PORTFOLIO_FILTERS_TYPE}.defaultSort`, BID_PORTFOLIO_FILTERS_TYPE.defaultSort),
  defaultSort: get(state, `sortPreferences.${BID_PORTFOLIO_SORTS_TYPE}.defaultSort`, BID_PORTFOLIO_SORTS_TYPE.defaultSort),
  selectedUnassigned: state.bidderPortfolioSelectedUnassigned,
  availableBiddersIdsLoading: state.availableBiddersIdsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchBidderPortfolio: query => dispatch(bidderPortfolioFetchData(query)),
  fetchBidderPortfolioCounts: () => dispatch(bidderPortfolioCountsFetchData()),
  fetchBidderPortfolioCDOs: () => dispatch(bidderPortfolioCDOsFetchData()),
  fetchClassifications: () => dispatch(fetchClassifications()),
  fetchAvailableBidders: () => dispatch(availableBiddersIds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BidderPortfolio));
