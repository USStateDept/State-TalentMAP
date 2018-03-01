import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFeedback } from '../../actions/showFeedback';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import FeedbackButton from '../../Components/FeedbackButton';

class FeedbackContainer extends Component {

  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    const { shouldShowFeedback, toggleFeedbackVisibility } = this.props;
    toggleFeedbackVisibility(!shouldShowFeedback);
  }

  render() {
    return (
      <FeedbackButton
        toggleVisibility={this.toggleVisibility}
      />
    );
  }
}

FeedbackContainer.propTypes = {
  shouldShowFeedback: PropTypes.bool.isRequired,
  toggleFeedbackVisibility: PropTypes.func.isRequired,
};

FeedbackContainer.defaultProps = {
  shouldShowFeedback: false,
  toggleFeedbackVisibility: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  shouldShowFeedback: state.shouldShowFeedback,
});

export const mapDispatchToProps = dispatch => ({
  toggleFeedbackVisibility: shouldDisplay => dispatch(toggleFeedback(shouldDisplay)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
