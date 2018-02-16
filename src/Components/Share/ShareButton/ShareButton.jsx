import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validStateEmail } from '../../../utilities';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
    this.state = {
      recipient: '',
      warning: false,
      timeout: false,
    };
  }

  changeEmail(e) {
    const recipient = e.target.value;
    this.setState({ recipient });
    const warning = !validStateEmail(recipient);
    this.setState({ warning });
  }

  createTimeout(ms) {
    this.setState({ timeout: true });
    setTimeout(() => {
      this.setState({ timeout: false });
    }, ms);
  }

  share(e) {
    e.preventDefault();
    const { recipient } = this.state;
    const message = {
      type: 'position',
      id: this.props.identifier,
      email: recipient,
    };
    this.props.onSend(message);
    this.createTimeout(8000);
  }

  render() {
    const { warning, recipient, timeout } = this.state;
    const { isSending, hasErrored, response } = this.props;
    const showWarning = warning && recipient.length;
    const wasSent = response && !hasErrored && !isSending && timeout;
    const buttonClassEnabled = recipient.length && !isSending;
    return (
      <div>
        <form onSubmit={e => this.share(e)}>
          <label htmlFor="share-input">Share this position:</label>
          <br />
          <input
            id="share-input"
            name="input-type-text"
            type="text"
            value={this.state.recipient}
            onChange={this.changeEmail}
            placeholder="Recipient's email address"
          />
          <button className={buttonClassEnabled ? '' : 'usa-button-disabled'} disabled={!recipient.length} id="share-button">
            Share
          </button>
          {showWarning && 'This is not a state.gov email. Send with caution.'}
          <br />
          {isSending && 'Sending...'} {hasErrored} {wasSent && 'Sent!'}
        </form>
      </div>
    );
  }
}

ShareButton.propTypes = {
  identifier: PropTypes.number.isRequired,
  onSend: PropTypes.func,
  isSending: PropTypes.bool,
  hasErrored: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  response: PropTypes.bool,
};

ShareButton.defaultProps = {
  isSending: false,
  hasErrored: false,
  response: false,
  onSend: EMPTY_FUNCTION,
};

export default ShareButton;
