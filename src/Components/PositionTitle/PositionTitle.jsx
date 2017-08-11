import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { POSITION_DETAILS, EMPTY_FUNCTION } from '../../Constants/PropTypes';

class PositionTitle extends Component { // eslint-disable-line
  navBack(e) {
    const { goBack } = this.props;
    if (e.keyCode === 13 || e === 'click') {
      goBack();
    }
  }
  render() {
    const { details } = this.props;
    return (
      <div className="position-details-header" style={{ overflow: 'hidden', backgroundColor: '#F2F2F2' }}>
        <div className="usa-grid" style={{ overflow: 'hidden' }}>
          <div className="usa-width-one-half">
            <div className="position-details-header-back">
              <a
                role="link"
                tabIndex="0"
                className="back-link"
                onKeyDown={(e) => { this.navBack(e); }}
                onClick={() => { this.navBack('click'); }}
              >
                <FontAwesome name="arrow-left" />
              &nbsp;
              Go back
            </a>
            </div>
            <div className="position-details-header-title">
              <strong>Position Number: {details.position_number}</strong>
            </div>
            <p className="position-details-header-body">
              <strong>Description: </strong>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make...
          </p>
            <div className="usa-width-one-half position-details-header-body">
              <strong>Post website:</strong> <a href="https://www.state.gov">www.state.gov</a>
            </div>
            <div className="usa-width-one-half position-details-header-body">
              <strong>Point of Contact:</strong> <a href="tel:222-222-2222">222-222-2222</a>
            </div>
          </div>
        </div>
        <img
          className="position-details-header-image"
          alt="department of state seal"
          src="/assets/img/dos-seal-bw.png"
        />
      </div>
    );
  }
}

PositionTitle.propTypes = {
  details: POSITION_DETAILS,
  goBack: PropTypes.func,
};

PositionTitle.defaultProps = {
  details: null,
  goBack: EMPTY_FUNCTION,
};

export default PositionTitle;
