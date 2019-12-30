import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import SearchAsClientButton from 'Components/BidderPortfolio/SearchAsClientButton/SearchAsClientButton';
import { BID_LIST, NOTIFICATION_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import BidTrackerCardList from './BidTrackerCardList';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import NotificationsSection from './NotificationsSection';
import ContactCDOButton from './ContactCDOButton';
import BackButton from '../BackButton';

const BidTracker = ({ bidList, bidListIsLoading, acceptBid, declineBid, submitBid, deleteBid,
notifications, notificationsIsLoading, markBidTrackerNotification, userProfile,
userProfileIsLoading, isPublic, useCDOView }) => {
  const isLoading = bidListIsLoading || userProfileIsLoading;
  const title = isPublic && get(userProfile, 'name') && !userProfileIsLoading ?
    `${userProfile.name}'s Bid Tracker` : 'Bid Tracker';
  return (
    <div className="usa-grid-full profile-content-inner-container bid-tracker-page">
      <BackButton />
      { isPublic && <SearchAsClientButton user={userProfile} /> }
      {
        !isPublic &&
        <NotificationsSection
          notifications={notifications}
          notificationsIsLoading={notificationsIsLoading}
          markBidTrackerNotification={markBidTrackerNotification}
        />
      }
      <div className="usa-grid-full">
        <div className="usa-width-one-half bid-tracker-greeting-container">
          <div className="usa-grid-full">
            <ProfileSectionTitle title={title} />
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
      <div className="bid-tracker-content-container">
        {
          isLoading ?
            <Spinner type="homepage-position-results" size="big" /> :
            <div className="usa-grid-full">
              <BidTrackerCardList
                bids={bidList.results}
                acceptBid={acceptBid}
                declineBid={declineBid}
                submitBid={submitBid}
                deleteBid={deleteBid}
                userProfile={userProfile}
                useCDOView={useCDOView}
              />
            </div>
        }
      </div>
    </div>
  );
};

BidTracker.propTypes = {
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  notifications: NOTIFICATION_LIST.isRequired,
  notificationsIsLoading: PropTypes.bool.isRequired,
  markBidTrackerNotification: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
  useCDOView: PropTypes.bool,
};

BidTracker.defaultProps = {
  isPublic: false,
  useCDOView: false,
};

export default BidTracker;
