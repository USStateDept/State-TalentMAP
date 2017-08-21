import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shareSendData } from '../../actions/share';
import ShareButton from './ShareButton/ShareButton';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class Share extends Component {

  onChildSend(e) {
    this.props.sendData(`${this.props.api}/share/`, e);
  }

  render() {
    const { hasErrored, isSending, response, identifier } = this.props;
    return (
      <ShareButton
        onSend={e => this.onChildSend(e)}
        hasErrored={hasErrored}
        isSending={isSending}
        response={response}
        identifier={identifier}
      />
    );
  }
}

Share.contextTypes = {
  router: PropTypes.object,
};

Share.propTypes = {
  api: PropTypes.string.isRequired,
  response: PropTypes.bool,
  sendData: PropTypes.func,
  hasErrored: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  isSending: PropTypes.bool,
  identifier: PropTypes.number.isRequired,
};

Share.defaultProps = {
  response: false,
  sendData: EMPTY_FUNCTION,
  hasErrored: false,
  isSending: false,
};

const mapStateToProps = (state, ownProps) => ({
  response: state.share,
  hasErrored: state.shareHasErrored,
  isSending: state.shareIsSending,
  shareSuccess: state.shareSuccess,
  id: ownProps,
});

const mapDispatchToProps = dispatch => ({
  sendData: (url, data) => dispatch(shareSendData(url, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
