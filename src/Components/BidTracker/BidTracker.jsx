import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, find, orderBy, reverse } from 'lodash';
import Alert from 'Components/Alert';
import SearchAsClientButton from 'Components/BidderPortfolio/SearchAsClientButton/SearchAsClientButton';
import SelectForm from 'Components/SelectForm';
import { BID_STATUS_ORDER } from 'Constants/BidStatuses';
import { BID_LIST, NOTIFICATION_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import BidTrackerCardList from './BidTrackerCardList';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import NotificationsSection from './NotificationsSection';
import ContactCDOButton from './ContactCDOButton';
import BackButton from '../BackButton';

const STATUS = 'status';
const UPDATED = 'update_date';
const LOCATION = 'position.post.location.city';
// const TED = 'position.ted'; TODO - add

const SORT_OPTIONS = [
  { value: STATUS, text: 'Bid Status', defaultSort: true },
  { value: UPDATED, text: 'Recently updated' },
  { value: LOCATION, text: 'City name (A-Z)' },
  // { value: TED, text: 'TED' }, TODO - add
];

class BidTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: find(SORT_OPTIONS, f => f.defaultSort).value,
    };
    this.onSelectOption = this.onSelectOption.bind(this);
  }

  onSelectOption(e) {
    this.setState({ sortValue: get(e, 'target.value') });
  }

  getSortedBids() {
    const { sortValue } = this.state;
    const { bidList: { results } } = this.props;
    let results$ = [...results];
    switch (sortValue) {
      case UPDATED:
        results$ = orderBy(results$, UPDATED);
        break;
      case LOCATION:
        results$ = orderBy(results$, LOCATION);
        break;
      case STATUS:
        results$ = orderBy(results$, e => get(BID_STATUS_ORDER, `${e.status}`, -1));
        results$ = reverse(results$);
        break;
      default:
        results$ = results;
    }
    return results$;
  }

  checkForApprovedBid() {
    const { bidList: { results } } = this.props;
    const results$ = [...results];
    const approvedBids = [];
    const nonApprovedBids = [];

    results$.forEach((bid) => {
      if (bid.status === 'approved') approvedBids.push(bid.position.position_number);
    }, approvedBids);
    results$.forEach((bid) => {
      if (bid.status !== 'approved') nonApprovedBids.push(bid.position.position_number);
    }, nonApprovedBids);

    return { approvedBids, nonApprovedBids };
  }

  render() {
    const { sortValue } = this.state;
    const { bidList, bidListIsLoading, acceptBid, declineBid, submitBid, deleteBid,
      notifications, notificationsIsLoading, markBidTrackerNotification, userProfile,
      userProfileIsLoading, isPublic, useCDOView } = this.props;
    const isLoading = bidListIsLoading || userProfileIsLoading;
    const title = isPublic && get(userProfile, 'name') && !userProfileIsLoading ?
        `${userProfile.name}'s Bid Tracker` : 'Bid Tracker';

    const emptyBidListText = isPublic ?
        'This user does not have any bids in their bid list.'
        :
        'You do not have any bids in your bid list.';

    const cdoEmail = get(userProfile, 'cdo.email');

    const sortedBids = this.getSortedBids();

    const apprBidStats = this.checkForApprovedBid();

    const approvedBidText = apprBidStats.nonApprovedBids.length > 1 ?
        `Your bids on Position Numbers: ${apprBidStats.nonApprovedBids} are no longer applicable, 
        because your bid on Position Number: ${apprBidStats.approvedBids} has been approved.`
    :
        `Your bid on Position Number: ${apprBidStats.nonApprovedBids} is no longer applicable, 
        because your bid on Position Number: ${apprBidStats.approvedBids} has been approved.`
    ;

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
              <ProfileSectionTitle title={title} icon="clipboard" />
            </div>
          </div>
          <div className="usa-width-one-half bid-tracker-cdo-email-container">
            <div className="bid-tracker-cdo-email">
              {
                  cdoEmail && !userProfileIsLoading &&
                  <ContactCDOButton email={cdoEmail} />
                }
            </div>
          </div>
        </div>
        <div className="usa-grid-full searches-top-section">
          <div className="results-dropdown results-dropdown-sort">
            <SelectForm
              id="sort"
              label="Sort by:"
              options={SORT_OPTIONS}
              defaultSort={sortValue}
              onSelectOption={this.onSelectOption}
            />
          </div>
        </div>
        <div className="bid-tracker-content-container">
          {
            !isLoading && (apprBidStats.approvedBids.length !== 0) &&
            <div style={{ paddingBottom: '3em' }}>
              <Alert type="info" title="Approved Bid" messages={[{ body: approvedBidText }]} />
            </div>
          }
          {
              isLoading ?
                <Spinner type="homepage-position-results" size="big" /> :
                <div className="usa-grid-full">
                  <BidTrackerCardList
                    bids={sortedBids}
                    acceptBid={acceptBid}
                    declineBid={declineBid}
                    submitBid={submitBid}
                    deleteBid={deleteBid}
                    userProfile={userProfile}
                    useCDOView={useCDOView}
                  />
                </div>
            }
          {
              !isLoading && !get(bidList, 'results', []).length &&
              <Alert type="info" title="Bid list empty" messages={[{ body: emptyBidListText }]} />
            }
        </div>
      </div>
    );
  }
}

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
