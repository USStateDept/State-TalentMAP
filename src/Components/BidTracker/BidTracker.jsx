import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Alert from 'Components/Alert';
import ExportButton from 'Components/ExportButton';
import SearchAsClientButton from 'Components/BidderPortfolio/SearchAsClientButton/SearchAsClientButton';
import SelectForm from 'Components/SelectForm';
import { downloadBidlistData } from 'actions/bidList';
import { BID_LIST, USER_PROFILE } from '../../Constants/PropTypes';
import BidTrackerCardList from './BidTrackerCardList';
import BidStatusStats from './BidStatusStats';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import ContactCDOButton from './ContactCDOButton';
import BackButton from '../BackButton';

class BidTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportIsLoading: false,
      sortValue: props.defaultSort,
    };
  }

  onSelectOption = e => {
    const { onSortChange } = this.props;
    const value = get(e, 'target.value');
    this.setState({ sortValue: value });
    onSortChange(value);
  };

  setIsLoading = exportIsLoading => {
    this.setState({ exportIsLoading });
  };

  exportBidlistData = () => {
    const { isPublic, userProfile: { perdet_seq_number } } = this.props;
    const { sortValue } = this.state;
    this.setIsLoading(true);
    downloadBidlistData(isPublic, perdet_seq_number, sortValue)
      .then(() => {
        this.setIsLoading(false);
      })
      .catch(() => {
        this.setIsLoading(false);
      });
  }

  render() {
    const { exportIsLoading, sortValue } = this.state;
    const { bidList, bidListIsLoading, bidListHasErrored, acceptBid,
      declineBid, submitBid, deleteBid, userProfile,
      userProfileIsLoading, isPublic, useCDOView, registerHandshake,
      unregisterHandshake, sortOptions } = this.props;
    const isLoading = bidListIsLoading || userProfileIsLoading;
    const title = isPublic && get(userProfile, 'name') && !userProfileIsLoading ?
      `${userProfile.name}'s Bid Tracker` : 'Bid Tracker';

    const emptyBidListText = isPublic ?
      'This user does not have any bids in their bid list.'
      :
      'You do not have any bids in your bid list.';

    const cdoEmail = get(userProfile, 'cdo.email');

    const bids = get(this.props, 'bidList.results', []);
    return (
      <div className="usa-grid-full profile-content-inner-container bid-tracker-page">
        <div className="usa-grid-full bid-tracker-top-row">
          <BackButton />
          {isPublic && <SearchAsClientButton user={userProfile} />}
        </div>
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
              options={sortOptions}
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
            isLoading && <Spinner type="homepage-position-results" size="big" />
          }
          {
            !isLoading && !bidListHasErrored &&
              <div className="usa-grid-full">
                <BidStatusStats bidList={bidList.results} showTotal />
                <BidTrackerCardList
                  bids={bids}
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
            !isLoading && !bidListHasErrored && !get(bidList, 'results', []).length &&
            <Alert type="info" title="Bid list empty" messages={[{ body: emptyBidListText }]} />
          }
          {
            bidListHasErrored && !isLoading &&
            <Alert type="error" title="An error has occurred" messages={[{ body: 'We were unable to load your bid list. Please try again later.' }]} />
          }
        </div>
      </div>
    );
  }
}

BidTracker.propTypes = {
  bidList: BID_LIST.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  bidListHasErrored: PropTypes.bool,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
  registerHandshake: PropTypes.func.isRequired,
  unregisterHandshake: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  userProfileIsLoading: PropTypes.bool.isRequired,
  isPublic: PropTypes.bool,
  useCDOView: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      defaultSort: PropTypes.bool,
    }),
  ).isRequired,
  onSortChange: PropTypes.func.isRequired,
  defaultSort: PropTypes.string.isRequired,
};

BidTracker.defaultProps = {
  bidListHasErrored: false,
  isPublic: false,
  useCDOView: false,
};

export default BidTracker;
