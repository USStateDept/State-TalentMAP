import React from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from '../../ProfileDashboard/UserProfile/UserProfileGeneralInformation';
import UserProfilePersonalInformation from '../../ProfileDashboard/UserProfile/UserProfilePersonalInformation';
import UserProfileBidInformation from '../../ProfileDashboard/UserProfile/UserProfileBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';
import CheckBox from '../../CheckBox';

const BidderPortfolioGridItem = ({ userProfile }) => (
  <div className="usa-grid-full current-user bidder-portfolio-grid-item">
    <div className="usa-width-one-fourth grid-item-section">
      <div className="checkbox-container">
        <CheckBox id={`checkbox-${userProfile.id}`} label="Select this user" value={false} labelSrOnly />
      </div>
      <div className="general-information-container" >
        <UserProfileGeneralInformation
          userProfile={userProfile}
          showEditLink={false}
          useGroup
        />
      </div>
    </div>
    <div
      className={`usa-width-one-fourth grid-item-section
        current-user-personal-information-grid-container`}
    >
      <UserProfilePersonalInformation userProfile={userProfile} />
    </div>
    <div className="usa-width-one-fourth grid-item-section">
      <UserProfileBidInformation />
    </div>
    <div className="usa-width-one-fourth grid-item-section">
      <BidderPortfolioViewMore className="white-button" />
    </div>
  </div>
);

BidderPortfolioGridItem.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioGridItem;
