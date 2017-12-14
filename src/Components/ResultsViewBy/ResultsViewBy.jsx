import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

class ResultsViewBy extends Component {
  constructor(props) {
    super(props);
    this.selectCard = this.selectCard.bind(this);
    this.selectGrid = this.selectGrid.bind(this);
    this.state = {
      selected: { value: this.props.initial },
    };
  }
  selectCard() {
    const { selected } = this.state;
    selected.value = 'card';
    this.setState({ selected }, this.props.onClick('card'));
  }
  selectGrid() {
    const { selected } = this.state;
    selected.value = 'grid';
    this.setState({ selected }, this.props.onClick('grid'));
  }
  isSelected(type) {
    if (type === this.state.selected.value) {
      return 'is-selected';
    }
    return 'is-not-selected';
  }
  render() {
    return (
      <div className="results-viewby-container">
        <div className="view-label">View:</div>
        <div className={`view-icon ${this.isSelected('card')}`}>
          <button className="unstyled-button" id="select-card" onClick={this.selectCard}>
            <span className="usa-sr-only">Card view</span>
            <FontAwesome name="th" />
          </button>
        </div>
        <div className={`view-icon view-icon-border ${this.isSelected('grid')}`}>
          <button className="unstyled-button" id="select-grid" onClick={this.selectGrid}>
            <span className="usa-sr-only">Grid view</span>
            <FontAwesome name="th-list" />
          </button>
        </div>
      </div>
    );
  }
}

ResultsViewBy.propTypes = {
  onClick: PropTypes.func,
  initial: PropTypes.string, // initial value
};

ResultsViewBy.defaultProps = {
  onClick: EMPTY_FUNCTION,
  initial: 'card',
};

export default ResultsViewBy;
