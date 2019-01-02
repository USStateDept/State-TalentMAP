import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleBidPosition } from '../../actions/bidList';
import BidListButton from '../../Components/BidListButton';

const BidListButtonContainer = ({ toggleBid, ...rest }) => (
  <BidListButton toggleBidPosition={toggleBid} {...rest} />
);

BidListButtonContainer.propTypes = {
  toggleBid: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BidListButtonContainer);
