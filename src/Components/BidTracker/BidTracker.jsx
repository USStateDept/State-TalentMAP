import React from 'react';
import PropTypes from 'prop-types';
import { BID_LIST, NOTIFICATION_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import BidTrackerCardList from './BidTrackerCardList';
import Spinner from '../Spinner';
import NotificationsSection from './NotificationsSection';
import ContactCDOButton from './ContactCDOButton';

const BidTracker = ({ bidList, bidListIsLoading, acceptBid, declineBid,
notifications, notificationsIsLoading, markBidTrackerNotification, userProfile,
userProfileIsLoading }) => (
  <div className="bid-tracker-page">
    <NotificationsSection
      notifications={notifications}
      notificationsIsLoading={notificationsIsLoading}
      markBidTrackerNotification={markBidTrackerNotification}
    />
    <div className="usa-grid-full">
      <div className="usa-width-one-half bid-tracker-greeting-container">
        <div className="hello-greeting bid-tracker-greeting">
          Bid Tracker
        </div>
      </div>
      <div className="usa-width-one-half bid-tracker-cdo-email-container">
        <div className="bid-tracker-cdo-email">
          {
            userProfile.cdo && !userProfileIsLoading &&
            <ContactCDOButton email={userProfile.cdo.email} />
          }
        </div>
      </div>
    </div>
    {
      bidListIsLoading ?
        <Spinner type="homepage-position-results" size="big" /> :
        <div className="usa-grid-full">
          <BidTrackerCardList
            bids={bidList.results}
            acceptBid={acceptBid}
            declineBid={declineBid}
          />
        </div>
    }
  </div>
);

BidTracker.propTypes = {
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  markBidTrackerNotification: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
};

export default BidTracker;
