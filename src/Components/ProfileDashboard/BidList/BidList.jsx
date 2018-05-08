import React from 'react';
import { Link } from 'react-router-dom';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import BidListResultsCard from '../../BidListResultsCard/';
import BidListHeader from './BidListHeader';
import { getStatusProperty } from '../../../Constants/BidStatuses';
import StaticDevContent from '../../StaticDevContent';

const BidList = ({ bids }) => {
  const bidArray = [];
  bids.slice().forEach(bid => (
    bidArray.push(
      <BidListResultsCard
        bid={bid}
        condensedView
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName={`parent-container-bid-status-${getStatusProperty(bid.status)}`}
      />,
    )
  ));
  return (
    <div className="usa-grid-full">
      <StaticDevContent>
        <BidListHeader />
      </StaticDevContent>
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title={`Bid List (${bids.length}/10)`} icon="clipboard" />
        </div>
      </div>
      <div className="bid-list-container">
        {
          bidArray.length === 0 ?
            <div className="usa-grid-full section-padded-inner-container">
              You have not added any bids to your bid list.
            </div>
          :
            <BorderedList contentArray={bidArray} />
        }
      </div>
      <div className="section-padded-inner-container small-link-container view-more-link-centered">
        <Link to="/profile/bidtracker/">See Bid List</Link>
      </div>
    </div>
  );
};

BidList.propTypes = {
  bids: BID_RESULTS.isRequired,
};

BidList.defaultProps = {
  bids: [],
};

export default BidList;
