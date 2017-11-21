import React from 'react';
import PropTypes from 'prop-types';
import { BIDDER_LIST } from '../../../Constants/PropTypes';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import BidderPortfolioContainer from '../BidderPortfolioContainer';

const BidderPortfolioPage = ({ bidderPortfolio, bidderPortfolioIsLoading,
bidderPortfolioHasErrored, pageSize, queryParamUpdate, pageNumber }) => {
  const isLoading = bidderPortfolioIsLoading && !bidderPortfolioHasErrored;
  return (
    <div className={`usa-grid-full bidder-portfolio-container ${isLoading ? 'results-loading' : null}`}>
      <ProfileSectionTitle title="Bidder Portfolio" />
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
  );
};

BidderPortfolioPage.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  bidderPortfolioIsLoading: PropTypes.bool.isRequired,
  bidderPortfolioHasErrored: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default BidderPortfolioPage;
