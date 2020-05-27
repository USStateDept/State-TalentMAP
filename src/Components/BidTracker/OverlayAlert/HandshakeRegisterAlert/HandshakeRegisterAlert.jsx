import React, { Component } from 'react';
import StaticDevContent from 'Components/StaticDevContent';
import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_POST, NO_SKILL, NO_GRADE } from 'Constants/SystemMessages';
import { getPostName, formatDate } from 'utilities';

class HandshakeRegisterAlert extends Component {
  onRegisterHandshake = () => {
    const { registerHandshake, bid } = this.props;
    registerHandshake(bid.position.id);
  };

  render() {
    const { bid } = this.props;
    const { readOnly } = this.context;
    const { position } = bid;
    const positionTitle = position.title;
    const post = getPostName(position.post, NO_POST);
    const skillCode = position.skill ? position.skill : NO_SKILL;
    const grade = position.grade ? position.grade : NO_GRADE;
    const ted = formatDate('2020-07-02T05:00:00Z');
    // const ted = position.bid.ted ? formatDate(position.bid.ted) : NO_TOUR_END_DATE;
    // modify line 6: import NO_TOUR_END_DATE from SystemMessages
    return (
      <div className="bid-tracker-alert-container bid-tracker-alert-container--register">
        <div className="usa-grid-full" style={{ display: 'flex' }}>
          <div className="register-submission-container" style={{ flex: 1 }}>
            <div className="sub-submission-text">
              {
                !readOnly ?
                  'Would you like to register this handshake?'
                  :
                  'This handshake needs to be registered'
              }
            </div>
            <div className="usa-grid-full register-submission-buttons-container">
              <button
                className="tm-button-transparent tm-button-submit-bid"
                onClick={this.onRegisterHandshake}
              >
                  Register Handshake
              </button>
            </div>
          </div>
          <div className="register-position-details" style={{ flex: 1 }}>
            <div>
              {positionTitle}
            </div>
            <div>
              <span className="title">Location: </span>
              {post}
            </div>
            <div>
              <StaticDevContent>
                <span className="title">TED: </span>
                {ted}
              </StaticDevContent>
            </div>
            <div>
              <span className="title">Skill: </span>
              {skillCode}
            </div>
            <div>
              <span className="title">Grade: </span>
              {grade}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HandshakeRegisterAlert.contextTypes = {
  readOnly: PropTypes.bool,
};

HandshakeRegisterAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  registerHandshake: PropTypes.func.isRequired,
};

export default HandshakeRegisterAlert;
