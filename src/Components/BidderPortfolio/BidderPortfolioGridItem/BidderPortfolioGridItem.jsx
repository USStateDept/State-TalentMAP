import React, { Component } from 'react';
import { BIDDER_OBJECT } from '../../../Constants/PropTypes';
import UserProfileGeneralInformation from '../../ProfileDashboard/UserProfile/UserProfileGeneralInformation';
import UserProfilePersonalInformation from '../../ProfileDashboard/UserProfile/UserProfilePersonalInformation';
import UserProfileBidInformation from '../../ProfileDashboard/UserProfile/UserProfileBidInformation';
import BidderPortfolioViewMore from '../BidderPortfolioViewMore';
import BidderPortfolioGridItemAdditional from '../BidderPortfolioGridItemAdditional';
import CheckBox from '../../CheckBox';

class BidderPortfolioGridItem extends Component {
  constructor(props) {
    super(props);
    this.expandSection = this.expandSection.bind(this);
    this.state = {
      expanded: false,
    };
  }
  expandSection() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    const { userProfile } = this.props;
    const { expanded } = this.state;
    /* Object [0] should be the most recent. If undefined, use 0 for draft and submitted. */
    const latestBidStatistics = userProfile.bid_statistics[0] || { draft: 0, submitted: 0 };
    return (
      <div className="bidder-portfolio-grid-item-container">
        <div className="usa-grid-full current-user bidder-portfolio-grid-item">
          <div className="usa-width-one-fourth grid-item-section">
            <div className="checkbox-container">
              <CheckBox id={`checkbox-${userProfile.id}`} label="Select this user" value={false} labelSrOnly small />
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
            <UserProfileBidInformation
              draft={latestBidStatistics.draft}
              submitted={latestBidStatistics.submitted}
            />
          </div>
          <div className="usa-width-one-fourth grid-item-section">
            <BidderPortfolioViewMore
              className="tm-button-alt"
              onClick={this.expandSection}
              isExpanded={expanded}
            />
          </div>
        </div>
        {
          expanded &&
            <BidderPortfolioGridItemAdditional clientId={userProfile.id} />
        }
      </div>
    );
  }
}

BidderPortfolioGridItem.propTypes = {
  userProfile: BIDDER_OBJECT.isRequired,
};

export default BidderPortfolioGridItem;
