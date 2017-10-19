import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../TextEditor';

class PositionAdditionalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const { content } = this.props;
    return (
      <div className="usa-grid position-details-additional">
        <div className="usa-width-two-thirds">
          <div className="usa-grid-full">
            <p className="position-details-additional-body">
              <span className="title">About</span>
              <br />
              { content }
            </p>
          </div>
          <TextEditor />
        </div>
        <div className="usa-width-one-third">
          <div className="map-container">
            <img src="/assets/img/map.png" alt="Map of nearby area" />
            <span className="map-title">Map location here</span>
          </div>
        </div>
      </div>
    );
  }
}

PositionAdditionalDetails.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PositionAdditionalDetails;
