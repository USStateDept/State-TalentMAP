import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../../InteractiveElement';

class ArchiveIcon extends Component {
  constructor(props) {
    super(props);
    this.submitOption = this.submitOption.bind(this);
    this.state = {
      isArchived: this.props.isArchived,
    };
  }

  componentWillReceiveProps(nextProp) {
    // Reset the isArchived state to the object's value if
    // hasErrored becomes true after the initial mount.
    if (nextProp.hasErrored) {
      this.setState({ isArchived: nextProp.isArchived });
    }
  }

  submitOption() {
    const { id, onSubmitOption } = this.props;
    this.setState({ isArchived: !this.state.isArchived });
    onSubmitOption({ id, is_archived: !this.state.isArchived });
  }

  render() {
    const { isArchived } = this.state;
    // set initial values as if term is NOT archived
    let icon = 'eye-slash';
    let className = 'term-not-archived';
    let text = 'Archive this term';

    if (isArchived) {
      icon = 'eye';
      className = 'term-archived';
      text = 'Un-archive this term';
    }

    return (
      <InteractiveElement role="link" className={`archive-link ${className}`} onClick={this.submitOption}>
        <FontAwesome name={icon} />{text}
      </InteractiveElement>
    );
  }
}

ArchiveIcon.propTypes = {
  onSubmitOption: PropTypes.func.isRequired,
  isArchived: PropTypes.bool,
  id: PropTypes.number.isRequired,
};

ArchiveIcon.defaultProps = {
  isArchived: false,
};

export default ArchiveIcon;
