import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleBidPosition } from '../../actions/bidList';
import BidListButton from '../../Components/BidListButton';
import { SetType } from '../../Constants/PropTypes';

const BidListButtonContainer = ({ toggleBid, isLoading, id, ...rest }) => (
  <BidListButton toggleBidPosition={toggleBid} id={id} isLoading={isLoading.has(id)} {...rest} />
  );

BidListButtonContainer.propTypes = {
  toggleBid: PropTypes.func.isRequired,
  isLoading: SetType,
  id: PropTypes.number.isRequired,
};

BidListButtonContainer.defaultProps = {
  isLoading: new Set(),
};

export const mapStateToProps = state => ({
  isLoading: state.bidListToggleIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidListButtonContainer);
