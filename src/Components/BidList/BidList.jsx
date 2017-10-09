import React from 'react';
import PropTypes from 'prop-types';
import * as PROP_TYPES from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import BidListResultsList from '../BidListResultsList';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';

const SavedSearches = ({ bidList, toggleBidPosition,
bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
bidListToggleIsLoading, bidListToggleSuccess, submitBid,
submitBidHasErrored, submitBidIsLoading, submitBidSuccess }) => {
  const showError = !bidListToggleIsLoading && !bidListToggleSuccess
      && bidListToggleHasErrored;
  const showSuccess = !bidListToggleIsLoading && bidListToggleSuccess
      && !bidListToggleHasErrored;
  const isLoading = bidListIsLoading && !bidListHasErrored;
  const showSubmitBidError = !submitBidIsLoading && submitBidHasErrored && !submitBidSuccess;
  const showSubmitBidSuccess = !submitBidIsLoading && !submitBidHasErrored && submitBidSuccess;
  return (
    <div
      className={`usa-grid-full saved-searches-container
    ${bidListIsLoading ? 'results-loading' : ''}`}
    >
      <ProfileSectionTitle title="Your Bid List:" />
      {
        // Deleting a bid has errored
        showError &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: bidListToggleHasErrored }]}
          />
      }
      {
        // Deleting a bid was successful
        showSuccess &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: bidListToggleSuccess }]}
          />
      }
      {
        // Submitting a bid has errored
        showSubmitBidError &&
          <Alert
            type="error"
            title="Error"
            messages={[{ body: submitBidHasErrored }]}
          />
      }
      {
        // Submitting a bid was successful
        showSubmitBidSuccess &&
          <Alert
            type="success"
            title="Success"
            messages={[{ body: submitBidSuccess }]}
          />
      }
      {
        isLoading &&
        <Spinner type="homepage-position-results" size="big" />
      }
      <BidListResultsList
        bidList={bidList}
        toggleBidPosition={toggleBidPosition}
        submitBid={submitBid}
      />
    </div>
  );
};

SavedSearches.propTypes = {
  toggleBidPosition: PropTypes.func.isRequired,
  bidListHasErrored: PropTypes.bool.isRequired,
  bidListIsLoading: PropTypes.bool.isRequired,
  bidList: PROP_TYPES.BID_LIST.isRequired,
  bidListToggleHasErrored: PROP_TYPES.BID_LIST_TOGGLE_HAS_ERRORED.isRequired,
  bidListToggleIsLoading: PropTypes.bool.isRequired,
  bidListToggleSuccess: PROP_TYPES.BID_LIST_TOGGLE_SUCCESS.isRequired,
  submitBid: PropTypes.func.isRequired,
  submitBidHasErrored: PROP_TYPES.SUBMIT_BID_HAS_ERRORED.isRequired,
  submitBidIsLoading: PropTypes.bool.isRequired,
  submitBidSuccess: PROP_TYPES.SUBMIT_BID_SUCCESS.isRequired,
};

export default SavedSearches;
