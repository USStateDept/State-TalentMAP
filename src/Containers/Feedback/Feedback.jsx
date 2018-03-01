import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFeedback } from '../../actions/showFeedback';
// import { feedbackSubmitData } from '../../actions/feedback'; Will add once action is created
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import Feedback from '../../Components/Feedback';

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
    this.props.submitFeedback();
  }

  toggleVisibility() {
    const { shouldShowFeedback, toggleFeedbackVisibility } = this.props;
    toggleFeedbackVisibility(!shouldShowFeedback);
  }

  render() {
    const { shouldShowFeedback, feedbackIsLoading,
      feedbackHasErrored, feedbackSuccess } = this.props;
    const { feedbackText, additionalFeedbackCheck } = this.state;
    return (
      <Feedback
        submitFeedback={this.submitFeedback}
        feedbackIsLoading={feedbackIsLoading}
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
  feedbackIsLoading: PropTypes.bool.isRequired,
  feedbackHasErrored: PropTypes.shape({ hasErrored: PropTypes.bool, message: PropTypes.string }),
  feedbackSuccess: PropTypes.bool.isRequired,
};

FeedbackContainer.defaultProps = {
  shouldShowFeedback: false,
  toggleFeedbackVisibility: EMPTY_FUNCTION,
  submitFeedback: EMPTY_FUNCTION,
  feedbackIsLoading: false,
  feedbackHasErrored: {},
  feedbackSuccess: false,
};

const mapStateToProps = state => ({
  shouldShowFeedback: state.shouldShowFeedback,
  feedbackHasErrored: state.feedbackHasErrored,
  feedbackIsLoading: state.feedbackIsLoading,
  feedbackSuccess: state.feedbackSuccess,
});

export const mapDispatchToProps = dispatch => ({
  toggleFeedbackVisibility: shouldDisplay => dispatch(toggleFeedback(shouldDisplay)),
  /* submitFeedback: dispatch(feedbackFetchData()), Will add once action is created */
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
