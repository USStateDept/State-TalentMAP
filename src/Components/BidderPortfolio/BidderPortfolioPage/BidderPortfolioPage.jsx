import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BIDDER_LIST, BIDDER_PORTFOLIO_COUNTS, CLASSIFICATIONS } from 'Constants/PropTypes';
import StaticDevContent from 'Components/StaticDevContent';
import TotalResults from 'Components/TotalResults/TotalResults';
import ErrorBoundary from 'Components/ErrorBoundary';
import Spinner from '../../Spinner';
import BidderPortfolioContainer from '../BidderPortfolioContainer';
import TopNav from '../TopNav';
import BidControls from '../BidControls';
import BidderPortfolioSearch from '../BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ExportLink from '../ExportLink';
import EditButtons from '../EditButtons';
import { checkFlag } from '../../../flags';

const getUseClientCounts = () => checkFlag('flags.client_counts');

class BidderPortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: { value: 'card' },
      editType: { show: false },
      q: '',
    };
  }

  queryParamUpdateText = (e) => {
    const { q } = e;
    this.props.queryParamUpdate(e);
    this.setState({ q });
  }

  resetRefKeyword = () => {
    const ref$ = get(this, 'searchRef.searchHeaderRef');
    const ref$$ = get(ref$, 'searchBarRef');
    if (ref$ && ref$$) {
      ref$.onClear();
      ref$$.clearSearch();
    }
  }

  changeViewType = value => {
    const { viewType } = this.state;
    viewType.value = value;
    this.setState({ viewType });
  };

  changeEditType = value => {
    this.setState({ editType: value });
  };

  render() {
    const useClientCounts = getUseClientCounts();
    const { editType } = this.state;
    const { bidderPortfolio, bidderPortfolioIsLoading, cdosLength,
      bidderPortfolioHasErrored, pageSize, queryParamUpdate, pageNumber,
      bidderPortfolioCounts, bidderPortfolioCountsIsLoading, classificationsIsLoading,
      classificationsHasErrored, classifications, defaultHandshake, defaultOrdering } = this.props;
    // Here we just want to check that the 'all_clients' prop exists,
    // because we want the nav section to appear
    // even when we reload the counts.
    let navDataIsLoading = false;
    if (useClientCounts) {
      navDataIsLoading = bidderPortfolioCountsIsLoading && !bidderPortfolioCounts.all_clients;
    }
    // for bidder results, however, we'll wait until everything is loaded
    const bidderPortfolioIsLoadingNotErrored = (bidderPortfolioIsLoading ||
      classificationsIsLoading) && !bidderPortfolioHasErrored && !classificationsHasErrored;
    const isLoading = bidderPortfolioIsLoadingNotErrored || navDataIsLoading;
    // whether or not we should use the list view
    const isListView = this.state.viewType.value === 'grid';

    let viewTypeClass = 'card-view';
    if (isListView) { viewTypeClass = 'list-view'; }

    let loadingClass = '';
    if (isLoading) { loadingClass = 'results-loading'; }

    const showEdit = editType.show;

    const hideControls = get(bidderPortfolio, 'results', []).length === 0 || !cdosLength;

    const total = get(bidderPortfolio, 'count');
    const disableLink = (cdosLength === 0 || total === 0);
    return (
      <div className={`bidder-portfolio-page ${viewTypeClass}`}>
        <BidderPortfolioSearch
          onUpdate={this.queryParamUpdateText}
          ref={(ref) => { this.searchRef = ref; }}
        />
        <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
          <div className="usa-grid-full">
            <div className="usa-width-one-half">
              <ProfileSectionTitle title="Clients" icon="users" />
            </div>
            <div className="usa-width-one-half" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StaticDevContent>
                {isListView && !hideControls && <EditButtons onChange={this.changeEditType} />}
              </StaticDevContent>
              <ExportLink disabled={disableLink} />
            </div>
          </div>
          {
            !navDataIsLoading &&
            <div>
              { useClientCounts &&
                <TopNav bidderPortfolioCounts={bidderPortfolioCounts} />
              }
              <BidControls
                queryParamUpdate={queryParamUpdate}
                viewType={this.state.viewType.value}
                changeViewType={this.changeViewType}
                pageSize={pageSize}
                defaultHandshake={defaultHandshake}
                defaultOrdering={defaultOrdering}
                getKeyword={this.state.q}
                resetKeyword={this.resetRefKeyword}
              />
            </div>
          }
          <div className={`usa-grid-full bidder-portfolio-listing ${loadingClass}`}>
            {
              !isLoading && !hideControls && !bidderPortfolioHasErrored &&
                <div className="total-results-container">
                  <TotalResults
                    total={get(bidderPortfolio, 'count')}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                  />
                </div>
            }
            {
              isLoading &&
                <Spinner type="homepage-position-results" size="big" />
            }
            {
              !isLoading &&
                <ErrorBoundary>
                  <BidderPortfolioContainer
                    bidderPortfolio={bidderPortfolio}
                    pageSize={pageSize}
                    queryParamUpdate={queryParamUpdate}
                    pageNumber={pageNumber}
                    showListView={isListView}
                    showEdit={showEdit}
                    classifications={classifications}
                    isLoading={bidderPortfolioIsLoading}
                    cdosLength={cdosLength}
                    hideControls={hideControls}
                    hasErrored={bidderPortfolioHasErrored}
                  />
                </ErrorBoundary>
            }
          </div>
        </div>
      </div>
    );
  }
}

BidderPortfolioPage.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  bidderPortfolioIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioHasErrored: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  bidderPortfolioCounts: BIDDER_PORTFOLIO_COUNTS.isRequired,
  bidderPortfolioCountsIsLoading: PropTypes.bool.isRequired,
  classificationsIsLoading: PropTypes.bool.isRequired,
  classificationsHasErrored: PropTypes.bool.isRequired,
  classifications: CLASSIFICATIONS,
  cdosLength: PropTypes.number,
  defaultHandshake: PropTypes.string.isRequired,
  defaultOrdering: PropTypes.string.isRequired,
};

BidderPortfolioPage.defaultProps = {
  bidderPortfolioCountsIsLoading: false,
  classifications: [],
  cdosLength: 0,
};

export default BidderPortfolioPage;
