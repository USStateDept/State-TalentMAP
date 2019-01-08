import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleBidPosition } from '../../actions/bidList';
import BidListButton from '../../Components/BidListButton';

const BidListButtonContainer = ({ toggleBid, isLoading, ...rest }) => (
  <BidListButton toggleBidPosition={toggleBid} isLoading={isLoading} {...rest} />
);

BidListButtonContainer.propTypes = {
  toggleBid: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

BidListButtonContainer.defaultProps = {
  isLoading: false,
};

export const mapStateToProps = state => ({
  isLoading: state.bidListToggleIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidListButtonContainer);
