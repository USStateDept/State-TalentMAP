import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, find, orderBy, reverse } from 'lodash';
import Alert from 'Components/Alert';
import ExportButton from 'Components/ExportButton';
import SearchAsClientButton from 'Components/BidderPortfolio/SearchAsClientButton/SearchAsClientButton';
import SelectForm from 'Components/SelectForm';
import { BID_STATUS_ORDER } from 'Constants/BidStatuses';
import { downloadBidlistData } from 'actions/bidList';
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
      exportIsLoading: false,
    };
  }

  onSelectOption = e => {
    this.setState({ sortValue: get(e, 'target.value') });
  };

  setIsLoading = exportIsLoading => {
    this.setState({ exportIsLoading });
  };

  getSortedBids() {
    const { sortValue } = this.state;
    const results = get(this.props, 'bidList.results', []);
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

  exportBidlistData = () => {
    const { isPublic, userProfile: { perdet_seq_number } } = this.props;
    this.setIsLoading(true);
    downloadBidlistData(isPublic, perdet_seq_number)
      .then(() => {
        this.setIsLoading(false);
      })
      .catch(() => {
        this.setIsLoading(false);
      });
  }

  render() {
    const { exportIsLoading, sortValue } = this.state;
    const { bidList, bidListIsLoading, acceptBid, declineBid, submitBid, deleteBid,
      notifications, notificationsIsLoading, markBidTrackerNotification, userProfile,
      userProfileIsLoading, isPublic, useCDOView, registerHandshake,
      unregisterHandshake } = this.props;
    const isLoading = bidListIsLoading || userProfileIsLoading;
    const title = isPublic && get(userProfile, 'name') && !userProfileIsLoading ?
      `${userProfile.name}'s Bid Tracker` : 'Bid Tracker';

    const emptyBidListText = isPublic ?
      'This user does not have any bids in their bid list.'
      :
      'You do not have any bids in your bid list.';

    const cdoEmail = get(userProfile, 'cdo.email');

    const sortedBids = this.getSortedBids();

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
          <div className="export-button-container">
            <ExportButton onClick={this.exportBidlistData} isLoading={exportIsLoading} />
          </div>
        </div>
        <div className="bid-tracker-content-container">
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
                  registerHandshake={registerHandshake}
                  unregisterHandshake={unregisterHandshake}
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
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
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
