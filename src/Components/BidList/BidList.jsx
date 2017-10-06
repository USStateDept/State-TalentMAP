import React from 'react';
import PropTypes from 'prop-types';
import * as PROP_TYPES from '../../Constants/PropTypes';
import Spinner from '../Spinner';
import BidListResultsList from '../BidListResultsList';
import Alert from '../Alert/Alert';
import ProfileSectionTitle from '../ProfileSectionTitle';

const SavedSearches = ({ bidList, toggleBidPosition,
bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
bidListToggleIsLoading, bidListToggleSuccess }) => {
  const showError = !bidListToggleIsLoading && !bidListToggleSuccess
      && bidListToggleHasErrored;
  const showSuccess = !bidListToggleIsLoading && bidListToggleSuccess
      && !bidListToggleHasErrored;
  const isLoading = bidListIsLoading && !bidListHasErrored;
  const isLoadingClass = bidListIsLoading ? 'results-loading' : '';
  const showAlert = () => {
    if (showError) {
      return (
        <Alert
          type="error"
          title="Error"
          messages={[{ body: bidListToggleHasErrored }]}
        />
      );
    } else if (showSuccess) {
      return (
        <Alert
          type="success"
          title="Success"
          messages={[{ body: bidListToggleSuccess }]}
        />
      );
    }
    return null;
  };
  return (
    <div
      className={`usa-grid-full saved-searches-container ${isLoadingClass}`}
    >
      <ProfileSectionTitle title="Your Bid List:" />
      {showAlert()}
      {
        isLoading &&
        <Spinner type="homepage-position-results" size="big" />
      }
      <BidListResultsList
        bidList={bidList}
        toggleBidPosition={toggleBidPosition}
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
};

export default SavedSearches;
