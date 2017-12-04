import React from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import CurrentUserGeneralInformation from '../../ProfileDashboard/CurrentUser/CurrentUserGeneralInformation';
import CurrentUserPersonalInformation from '../../ProfileDashboard/CurrentUser/CurrentUserPersonalInformation';
import CurrentUserBidInformation from '../../ProfileDashboard/CurrentUser/CurrentUserBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';
import CheckBox from '../../CheckBox';

const BidderPortfolioGridItem = ({ userProfile }) => (
  <div className="usa-grid-full current-user bidder-portfolio-grid-item">
    <div className="usa-width-one-fourth grid-item-section">
      <div className="checkbox-container">
        <CheckBox id={`checkbox-${userProfile.id}`} label="Select this user" value={false} labelSrOnly />
      </div>
      <div className="general-information-container" >
        <CurrentUserGeneralInformation
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
      <CurrentUserPersonalInformation userProfile={userProfile} />
    </div>
    <div className="usa-width-one-fourth grid-item-section">
      <CurrentUserBidInformation />
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
