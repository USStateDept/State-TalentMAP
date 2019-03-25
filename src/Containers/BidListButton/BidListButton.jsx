import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SetType, BID_LIST } from '../../Constants/PropTypes';
import { toggleBidPosition } from '../../actions/bidList';
import BidListButton from '../../Components/BidListButton';

const BidListButtonContainer = ({ toggleBid, isLoading, id, compareArray, ...rest }) => (
  <BidListButton
    toggleBidPosition={toggleBid}
    id={id}
    isLoading={isLoading.has(id)}
    compareArray={compareArray.results}
    {...rest}
  />
);

BidListButtonContainer.propTypes = {
  toggleBid: PropTypes.func.isRequired,
  isLoading: SetType,
  id: PropTypes.number.isRequired,
  compareArray: BID_LIST.isRequired,
};

BidListButtonContainer.defaultProps = {
  isLoading: new Set(),
  compareArray: { results: [] },
};

export const mapStateToProps = state => ({
  isLoading: state.bidListToggleIsLoading,
  compareArray: state.bidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidListButtonContainer);
