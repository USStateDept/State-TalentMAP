// /* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import { get } from 'lodash';
// import { BIDDER_LIST, BIDDER_PORTFOLIO_COUNTS, CLASSIFICATIONS } from 'Constants/PropTypes';
// import TotalResults from 'Components/TotalResults/TotalResults';
// import ErrorBoundary from 'Components/ErrorBoundary';
// import Spinner from '../../Spinner';
// import BidderPortfolioContainer from '../../../Components/BidderPortfolio/BidderPortfolioContainer';
// import TopNav from '../TopNav';
// import BidControls from '../BidControls';
// import EditButtons from '../EditButtons';
import BidderPortfolioSearch from '../../../Components/BidderPortfolio/BidderPortfolioSearch';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import ExportLink from '../../BidderPortfolio/ExportLink';
import BackButton from '../../BackButton';

const AgendaItemHistory = () => (
  <div>
    <div className="bidder-portfolio-page card-view">
      <BidderPortfolioSearch />
      <BackButton />
      <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
        <div className="usa-grid-full">
          <div className="usa-width-one-half">
            <ProfileSectionTitle title="Last, First - Agenda Item History" icon="user-circle-o" />
          </div>
          <div className="usa-width-one-half" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ExportLink disabled={false} />
          </div>
        </div>
        {/* {
          !navDataIsLoading &&
          <div>
            {useClientCounts &&
              <TopNav bidderPortfolioCounts={bidderPortfolioCounts} />
            }
            <BidControls />
          </div>
        } */}
        {/* <div className={`usa-grid-full bidder-portfolio-listing ${loadingClass}`}>
          {
            !isLoading && !hideControls &&
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
              <BidderPortfolioContainer />
            </ErrorBoundary>
          }
        </div> */}
      </div>
    </div>
  </div>
);

export default AgendaItemHistory;
