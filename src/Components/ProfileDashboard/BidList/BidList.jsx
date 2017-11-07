import React from 'react';
import { Link } from 'react-router-dom';
import { BID_RESULTS } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import BidListResultsCard from '../../BidListResultsCard/';
import BidListHeader from './BidListHeader';
import { getStatusClass } from '../../../Constants/BidStatuses';

const BidList = ({ bids }) => {
  const bidArray = [];
  bids.slice().forEach(bid => (
    bidArray.push(
      <BidListResultsCard
        bid={bid}
        condensedView
        parentClassName={`parent-container-bid-status-${getStatusClass(bid.status)}`}
      />,
    )
  ));
  return (
    <div className="usa-grid-full">
      <BidListHeader />
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title="Bid List" icon="clipboard" />
        </div>
      </div>
      <div className="bid-list-container">
        <BorderedList contentArray={bidArray} />
      </div>
      <div className="section-padded-inner-container small-link-container" style={{ textAlign: 'center', borderTop: '1px solid gray' }}>
        <Link to="/profile/bidlist/">See Bid List</Link>
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
