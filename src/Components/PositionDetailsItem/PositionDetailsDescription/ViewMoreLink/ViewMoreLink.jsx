import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from '../../../InteractiveElement';

class ViewMoreLink extends Component {
  constructor(props) {
    super(props);
    this.toggleValue = this.toggleValue.bind(this);
    this.state = {
      shouldDisplayViewMore: props.defaultValue,
    };
  }

  toggleValue() {
    const { onChange } = this.props;
    const { shouldDisplayViewMore } = this.state;
    const newValue = !shouldDisplayViewMore;
    this.setState({ shouldDisplayViewMore: newValue });
    onChange(newValue);
  }

  render() {
    const { shouldDisplayViewMore } = this.state;

    let text = 'View more';
    let icon = 'angle-down';

    if (!shouldDisplayViewMore) {
      text = 'View less';
      icon = 'angle-up';
    }

    return (
      <InteractiveElement onClick={this.toggleValue} className="view-more-link">
        {text}<FontAwesome name={icon} />
      </InteractiveElement>
    );
  }
}

ViewMoreLink.propTypes = {
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

ViewMoreLink.defaultProps = {
  defaultValue: true,
};

export default ViewMoreLink;
