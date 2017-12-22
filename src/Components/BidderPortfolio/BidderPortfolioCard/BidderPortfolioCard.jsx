import React from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from '../../ProfileDashboard/UserProfile/UserProfileGeneralInformation';
import UserProfilePersonalInformation from '../../ProfileDashboard/UserProfile/UserProfilePersonalInformation';
import UserProfileBidInformation from '../../ProfileDashboard/UserProfile/UserProfileBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';

const BidderPortfolioCard = ({ userProfile }) => (
  <div className="usa-grid-full current-user bidder-portfolio-card">
    <UserProfileGeneralInformation
      userProfile={userProfile}
      showEditLink={false}
      useGroup
    />
    <UserProfilePersonalInformation userProfile={userProfile} />
    <UserProfileBidInformation
      /* Object [0] should be the most recent. If undefined, use 0. */
      draft={userProfile.bid_statistics[0] ? userProfile.bid_statistics[0].draft : 0}
      submitted={userProfile.bid_statistics[0] ? userProfile.bid_statistics[0].submitted : 0}
    />
    <BidderPortfolioViewMore useLink />
  </div>
);

BidderPortfolioCard.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioCard;
