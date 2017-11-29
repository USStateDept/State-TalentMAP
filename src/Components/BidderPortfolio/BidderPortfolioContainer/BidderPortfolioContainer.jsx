import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BIDDER_LIST } from '../../../Constants/PropTypes';
import { scrollToTop } from '../../../utilities';
import BidderPortfolioList from '../BidderPortfolioList';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';

class BidderPortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }
  onPageChange(q) {
    scrollToTop();
    this.props.queryParamUpdate(q);
  }
  render() {
    const { bidderPortfolio, pageSize, pageNumber } = this.props;
    return (
      <div className="usa-grid-full user-dashboard">
        <BidderPortfolioList results={bidderPortfolio.results} />
        {
           // if there's no results, don't show pagination
           !!bidderPortfolio.results && !!bidderPortfolio.results.length &&
           // finally, render the pagination
           <div className="usa-grid-full react-paginate">
             <PaginationWrapper
               totalResults={bidderPortfolio.count}
               pageSize={pageSize}
               onPageChange={this.onPageChange}
               forcePage={pageNumber}
             />
           </div>
          }
      </div>
    );
  }
}

BidderPortfolioContainer.propTypes = {
  bidderPortfolio: BIDDER_LIST.isRequired,
  pageSize: PropTypes.number.isRequired,
  queryParamUpdate: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default BidderPortfolioContainer;
