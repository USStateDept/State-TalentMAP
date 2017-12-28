import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shareSendData } from '../../actions/share';
import ShareButton from './ShareButton/ShareButton';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const Share = ({ hasErrored, isSending, response, identifier, sendData }) => (
  <ShareButton
    onSend={sendData}
    hasErrored={hasErrored}
    isSending={isSending}
    response={response}
    identifier={identifier}
  />
);

Share.contextTypes = {
  router: PropTypes.object,
};

Share.propTypes = {
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

export const mapDispatchToProps = dispatch => ({
  sendData: (url, data) => dispatch(shareSendData(url, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);
