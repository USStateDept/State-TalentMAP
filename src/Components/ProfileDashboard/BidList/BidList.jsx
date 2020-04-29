import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BID_RESULTS, EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BidTrackerCard from '../../BidTracker/BidTrackerCard';
import BidListHeader from './BidListHeader';
import StaticDevContent from '../../StaticDevContent';
import Spinner from '../../Spinner';

const BidList = ({ bids, submitBidPosition, deleteBid, registerHandshake, isLoading, isPublic,
  userId }) => {
  // Push the priority bid to the top. There should only be one priority bid.
  // eslint rules seem to step over themselves here between using "return" and a ternary
  // eslint-disable-next-line no-confusing-arrow
  const sortedBids = bids.slice().sort(x => x.is_priority ? -1 : 1);
  // Then we check if the first object of the array is priority. We need this to define
  // whether or not to pass priorityExists.
  const doesPriorityExist = sortedBids.length && sortedBids[0] && sortedBids[0].is_priority;
  const bids$ = sortedBids.map(bid => (
    <BidTrackerCard
      key={bid.id}
      bid={bid}
      condensedView
      showBidCount
      submitBid={submitBidPosition}
      registerHandshake={registerHandshake}
      deleteBid={deleteBid}
      priorityExists={doesPriorityExist}
      readOnly={isPublic}
      userId={userId}
    />
  ));
  return (
    <div className="usa-grid-full" style={{ position: 'relative' }}>
      <div>
        <StaticDevContent>
          <BidListHeader />
        </StaticDevContent>
        <div className="usa-grid-full section-padded-inner-container">
          <div className="usa-width-one-whole">
            <SectionTitle title="Bid List" len={bids.length} icon="clipboard" />
          </div>
        </div>
        <div className="bid-list-container">
          {isLoading && <Spinner type="saved-searches" size="big" />}
          {
            bids$.length === 0 && !isLoading &&
              <div className="usa-grid-full section-padded-inner-container">
                {isPublic ? 'This user has not added any bids to their bid list.' : 'You have not added any bids to your bid list.'}
              </div>
          }
          {!!bids$.length && !isLoading && bids$}
        </div>
        {
          !isLoading &&
            <div className="section-padded-inner-container small-link-container view-more-link-centered">
              <Link to={`/profile/bidtracker/${isPublic ? `public/${userId}` : ''}`}>Go to Bid Tracker</Link>
            </div>
        }
      </div>
    </div>
  );
};

BidList.propTypes = {
  bids: BID_RESULTS.isRequired,
  submitBidPosition: PropTypes.func,
  deleteBid: PropTypes.func,
  registerHandshake: PropTypes.func,
  isLoading: PropTypes.bool,
  isPublic: PropTypes.bool,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

BidList.defaultProps = {
  bids: [],
  submitBidPosition: EMPTY_FUNCTION,
  deleteBid: EMPTY_FUNCTION,
  registerHandshake: EMPTY_FUNCTION,
  isLoading: false,
  isPublic: false,
  userId: '',
};

export default BidList;
