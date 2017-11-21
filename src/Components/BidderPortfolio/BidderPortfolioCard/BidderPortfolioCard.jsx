import React from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import CurrentUserGeneralInformation from '../../ProfileDashboard/CurrentUser/CurrentUserGeneralInformation';
import CurrentUserPersonalInformation from '../../ProfileDashboard/CurrentUser/CurrentUserPersonalInformation';
import CurrentUserBidInformation from '../../ProfileDashboard/CurrentUser/CurrentUserBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';

const BidderPortfolioCard = ({ userProfile }) => (
  <div className="usa-grid-full current-user bidder-portfolio-card">
    <CurrentUserGeneralInformation
      userProfile={userProfile}
      showEditLink={false}
      useGroup
    />
    <CurrentUserPersonalInformation userProfile={userProfile} />
    <CurrentUserBidInformation />
    <BidderPortfolioViewMore />
  </div>
);

BidderPortfolioCard.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioCard;
