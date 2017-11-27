import React from 'react';
import PropTypes from 'prop-types';
import { BIDDER_LIST } from '../../../Constants/PropTypes';
import Spinner from '../../Spinner';
import BidderPortfolioContainer from '../BidderPortfolioContainer';
import TopNav from '../TopNav';
import BidControls from '../BidControls';
import BidderPortfolioSearch from '../BidderPortfolioSearch';

const BidderPortfolioPage = ({ bidderPortfolio, bidderPortfolioIsLoading,
bidderPortfolioHasErrored, pageSize, queryParamUpdate, pageNumber,
bidderPortfolioCounts }) => {
  // here we just want to check that the all prop exists, because we want the nav section to appear
  // even when we reload the counts
  const navDataIsLoading = !bidderPortfolioCounts.all;
  // for bidder results, however, we'll wait until everything is loaded
  const isLoading = (bidderPortfolioIsLoading && !bidderPortfolioHasErrored) ||
    navDataIsLoading;
  return (
    <div className="bidder-portfolio-page">
      <BidderPortfolioSearch onUpdate={queryParamUpdate} />
      <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
        {
          !navDataIsLoading &&
          <div>
            <TopNav bidderPortfolioCounts={bidderPortfolioCounts} />
            <BidControls
              queryParamUpdate={queryParamUpdate}
              biddersNumerator={bidderPortfolio.count}
              biddersDenominator={bidderPortfolioCounts.all}
              isLoading={isLoading}
            />
          </div>
        }
        <div className={`usa-grid-full bidder-portfolio-listing ${isLoading ? 'results-loading' : null}`}>
          {
            isLoading &&
              <Spinner type="homepage-position-results" size="big" />
          }
          {
            !isLoading &&
              <BidderPortfolioContainer
                bidderPortfolio={bidderPortfolio}
                pageSize={pageSize}
                queryParamUpdate={queryParamUpdate}
                pageNumber={pageNumber}
              />
          }
        </div>
      </div>
    </div>
  );
};

BidderPortfolioPage.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  bidderPortfolioIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioHasErrored: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  bidderPortfolioCounts: PropTypes.shape({}).isRequired,
};

export default BidderPortfolioPage;
