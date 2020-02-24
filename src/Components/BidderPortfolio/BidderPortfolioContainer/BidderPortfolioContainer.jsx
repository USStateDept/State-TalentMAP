import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BIDDER_LIST } from '../../../Constants/PropTypes';
import { scrollToId } from '../../../utilities';
import BidderPortfolioCardList from '../BidderPortfolioCardList';
import BidderPortfolioGridList from '../BidderPortfolioGridList';
import PaginationWrapper from '../../PaginationWrapper/PaginationWrapper';
import Alert from '../../Alert/Alert';

const ID = 'bidder-portfolio-container';

class BidderPortfolioContainer extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
  }
  onPageChange(q) {
    scrollToId({ el: '.bidder-portfolio-container', config: { duration: 400 } });
    setTimeout(() => {
      this.props.queryParamUpdate(q);
    }, 600);
  }
  render() {
    const { bidderPortfolio, pageSize, pageNumber, showListView, showEdit, isLoading,
      cdosLength, hideControls } = this.props;
    const noResults = get(bidderPortfolio, 'results', []).length === 0;
    const showNoCdosAlert = !cdosLength;
    const showEdit$ = showEdit && !hideControls;
    const showExpand = !hideControls;
    return (
      <div className="usa-grid-full user-dashboard" id={ID}>
        {
          !showNoCdosAlert &&
          (
            showListView ?
              <BidderPortfolioGridList
                showEdit={showEdit$}
                showExpand={showExpand}
                results={bidderPortfolio.results}
              />
              :
              <BidderPortfolioCardList results={bidderPortfolio.results} />
          )
        }
        {
           // if there's no results, don't show pagination
           !noResults && !showNoCdosAlert &&
           <div className="usa-grid-full react-paginate">
             <PaginationWrapper
               totalResults={bidderPortfolio.count}
               pageSize={pageSize}
               onPageChange={this.onPageChange}
               forcePage={pageNumber}
             />
           </div>
        }
        {
          showNoCdosAlert &&
          <div className="usa-width-two-thirds">
            <Alert title="You have not selected any CDOs" messages={[{ body: 'Please select at least one CDO from the "Proxy CDO View" filter above.' }]} />
          </div>
        }
        {
          noResults && !isLoading && !showNoCdosAlert &&
          <div className="usa-width-two-thirds">
            <Alert title="You have no clients within this search criteria." messages={[{ body: 'Try removing filters or using another bid status tab.' }]} />
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
  showListView: PropTypes.bool,
  showEdit: PropTypes.bool,
  isLoading: PropTypes.bool,
  cdosLength: PropTypes.number,
  hideControls: PropTypes.bool,
};

BidderPortfolioContainer.defaultProps = {
  showListView: false,
  showEdit: false,
  isLoading: false,
  cdosLength: 0,
  hideControls: false,
};

export default BidderPortfolioContainer;
