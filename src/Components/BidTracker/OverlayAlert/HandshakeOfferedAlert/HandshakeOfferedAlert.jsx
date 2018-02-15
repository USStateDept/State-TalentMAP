import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class HandshakeOfferedAlert extends Component {
  constructor(props) {
    super(props);
    this.onAcceptBid = this.onAcceptBid.bind(this);
    this.onDeclineBid = this.onDeclineBid.bind(this);
  }
  onAcceptBid() {
    const { acceptBid, id } = this.props;
    acceptBid(id);
  }
  onDeclineBid() {
    const { declineBid, id } = this.props;
    declineBid(id);
  }
  render() {
    const { userName } = this.props;
    return (
      <div className="bid-tracker-alert-container bid-tracker-alert-container--handshake-offered">
        <div className="top-text">{`${userName}, you've been offered a handshake`}</div>
        <div className="usa-grid-full">
          <button className="tm-button-transparent" onClick={this.onAcceptBid}>
            <FontAwesome name="check-o" /> Accept Handshake
          </button>
          <button className="tm-button-transparent tm-button-no-box" onClick={this.onDeclineBid}>
            Decline Handshake
          </button>
        </div>
        <div className="sub-text">24 hours to accept the handshake</div>
      </div>
    );
  }
}

HandshakeOfferedAlert.propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
};

export default HandshakeOfferedAlert;
