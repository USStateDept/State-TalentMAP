import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFeedback } from '../../actions/showFeedback';
import { feedbackSubmitData } from '../../actions/feedback';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import FeedbackForm from '../../Components/FeedbackForm';

class FeedbackContainer extends Component {

  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
    this.changeFeedbackText = this.changeFeedbackText.bind(this);
    this.changeAdditionalFeedbackCheck = this.changeAdditionalFeedbackCheck.bind(this);
    this.state = {
      feedbackText: '',
      additionalFeedbackCheck: false,
    };
  }

  changeFeedbackText(e) {
    this.setState({ feedbackText: e });
  }

  changeAdditionalFeedbackCheck(e) {
    this.setState({ additionalFeedbackCheck: e });
  }

  submitFeedback(e) {
    if (e.preventDefault) { e.preventDefault(); }
    const { feedbackText, additionalFeedbackCheck } = this.state;
    this.props.submitFeedback(feedbackText, additionalFeedbackCheck);
  }

  toggleVisibility() {
    const { shouldShowFeedback, toggleFeedbackVisibility } = this.props;
    toggleFeedbackVisibility(!shouldShowFeedback);
  }

  render() {
    const { shouldShowFeedback, feedbackIsSending,
      feedbackHasErrored, feedbackSuccess } = this.props;
    const { feedbackText, additionalFeedbackCheck } = this.state;
    return (
      <FeedbackForm
        submitFeedback={this.submitFeedback}
        feedbackIsSending={feedbackIsSending}
        visible={shouldShowFeedback}
        toggleVisibility={this.toggleVisibility}
        feedbackHasErrored={feedbackHasErrored}
        feedbackText={feedbackText}
        additionalFeedbackCheck={additionalFeedbackCheck}
        feedbackSuccess={feedbackSuccess}
        onChangeText={this.changeFeedbackText}
        onCheckBoxClick={this.changeAdditionalFeedbackCheck}
      />
    );
  }
}

FeedbackContainer.propTypes = {
  shouldShowFeedback: PropTypes.bool.isRequired,
  toggleFeedbackVisibility: PropTypes.func.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  feedbackIsSending: PropTypes.bool.isRequired,
  feedbackHasErrored: PropTypes.shape({ hasErrored: PropTypes.bool, message: PropTypes.string }),
  feedbackSuccess: PropTypes.bool.isRequired,
};

FeedbackContainer.defaultProps = {
  shouldShowFeedback: false,
  toggleFeedbackVisibility: EMPTY_FUNCTION,
  submitFeedback: EMPTY_FUNCTION,
  feedbackIsSending: false,
  feedbackHasErrored: {},
  feedbackSuccess: false,
};

const mapStateToProps = state => ({
  shouldShowFeedback: state.shouldShowFeedback,
  feedbackHasErrored: state.feedbackHasErrored,
  feedbackIsSending: state.feedbackIsSending,
  feedbackSuccess: state.feedbackSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleFeedbackVisibility: shouldDisplay => dispatch(toggleFeedback(shouldDisplay)),
  submitFeedback: (comments, isInterestedInHelping) =>
    dispatch(feedbackSubmitData(comments, isInterestedInHelping)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
