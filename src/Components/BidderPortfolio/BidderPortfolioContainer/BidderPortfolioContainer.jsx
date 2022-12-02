import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { scrollToId } from 'utilities';
import { BIDDER_LIST, CLASSIFICATIONS } from 'Constants/PropTypes';
import PaginationWrapper from 'Components/PaginationWrapper/PaginationWrapper';
import Alert from 'Components/Alert/Alert';
import BidderPortfolioCardList from '../BidderPortfolioCardList';
import BidderPortfolioGridList from '../BidderPortfolioGridList';

const ID = 'bidder-portfolio-container';

class BidderPortfolioContainer extends Component {
  onPageChange = q => {
    console.log(q.page);
    const { pageSize, updatePagination, queryParamUpdate } = this.props;
    scrollToId({ el: '.bidder-portfolio-container', config: { duration: 400 } });
    updatePagination({ pageNumber: q.page, pageSize: pageSize.toString() });
    setTimeout(() => {
      queryParamUpdate({ value: 'skip' });
    }, 600);
  };

  render() {
    const { bidderPortfolio, pageSize, showListView, showEdit, isLoading,
      cdosLength, hideControls, classifications, hasErrored, pageNumber } = this.props;
    const noResults = get(bidderPortfolio, 'results', []).length === 0;
    const showNoCdosAlert = !cdosLength;
    const showEdit$ = showEdit && !hideControls;
    const showExpand = !hideControls;
    return (
      <div className="usa-grid-full user-dashboard" id={ID}>
        {
          !showNoCdosAlert && !hasErrored &&
          (
            showListView ?
              <BidderPortfolioGridList
                showEdit={showEdit$}
                showExpand={showExpand}
                results={bidderPortfolio.results}
                classifications={classifications}
              />
              :
              <BidderPortfolioCardList
                results={bidderPortfolio.results}
                classifications={classifications}
              />
          )
        }
        {
          // if there's no results, don't show pagination
          !noResults && !showNoCdosAlert && !hasErrored &&
           <div className="usa-grid-full react-paginate">
             <PaginationWrapper
               totalResults={bidderPortfolio.count}
               pageSize={pageSize}
               onPageChange={this.onPageChange}
               forcePage={pageNumber}
               marginPagesDisplayed={2}
               pageRangeDisplayed={7}
             />
           </div>
        }
        {
          showNoCdosAlert && !hasErrored &&
          <div className="usa-width-two-thirds">
            <Alert title="You have not selected any CDOs" messages={[{ body: 'Please select at least one CDO from the "Proxy CDO View" filter above.' }]} />
          </div>
        }
        {
          noResults && !isLoading && !showNoCdosAlert && !hasErrored &&
          <div className="usa-width-two-thirds">
            <Alert title="You have no clients within this search criteria." messages={[{ body: 'Try removing filters or using another bid status tab.' }]} />
          </div>
        }
        {
          !isLoading && hasErrored &&
          <div className="usa-width-two-thirds">
            <Alert title="An error has occurred" messages={[{ body: 'Try performing another search' }]} type="error" />
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
  classifications: CLASSIFICATIONS,
  isLoading: PropTypes.bool,
  cdosLength: PropTypes.number,
  hideControls: PropTypes.bool,
  hasErrored: PropTypes.bool,
  updatePagination: PropTypes.func.isRequired,
};

BidderPortfolioContainer.defaultProps = {
  showListView: false,
  showEdit: false,
  classifications: [],
  isLoading: false,
  cdosLength: 0,
  hideControls: false,
  hasErrored: false,
};

export default BidderPortfolioContainer;
