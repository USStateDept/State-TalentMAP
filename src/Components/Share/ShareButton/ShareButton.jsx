import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validStateEmail } from '../../../utilities';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class ShareButton extends Component {
  constructor(props) {
    super(props);
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
    const message = {
      type: 'position', // TODO - pass in as a prop if we allow sharing of other pages
      mode: 'email',
      id: this.props.identifier,
      email: this.state.recipient,
    };
    this.props.onSend(message);
    this.createTimeout(8000);
  }

  render() {
    const { warning, recipient, timeout } = this.state;
    const { isSending, hasErrored, response } = this.props;
    const sendingText = isSending ? 'Sending...' : null;
    const err = hasErrored ? 'Sorry, there was a problem sharing this.' : null;
    const sent = (response && !hasErrored && !isSending && timeout) ? 'Sent!' : null;
    return (
      <form onSubmit={e => this.share(e)}>
        <label htmlFor="share-input">Share this position by email</label>
        <input
          id="share-input"
          name="input-type-text"
          type="email"
          value={this.state.recipient}
          onChange={e => this.changeEmail(e)}
          placeholder="Recipient's email address"
        />
        <button className={(recipient.length && !isSending) ? null : 'usa-button-disabled'} disabled={recipient.length ? null : true} id="share-button">
          Share
        </button>
        {warning && recipient.length ? 'This is not a state.gov email. Send with caution.' : null}
        <br />
        {sendingText} {err} {sent}
      </form>
    );
  }
}

ShareButton.propTypes = {
  identifier: PropTypes.number.isRequired,
  onSend: PropTypes.func,
  isSending: PropTypes.bool,
  hasErrored: PropTypes.bool,
  response: PropTypes.bool,
};

ShareButton.defaultProps = {
  isSending: false,
  hasErrored: false,
  response: false,
  onSend: EMPTY_FUNCTION,
};

export default ShareButton;
