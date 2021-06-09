import { Component } from 'react';
import StaticDevContent from 'Components/StaticDevContent';
import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POSITION_TITLE, NO_POST, NO_SKILL } from 'Constants/SystemMessages';
import { get } from 'lodash';
import { formatDate, getPostName } from 'utilities';

class HandshakeRegisterAlert extends Component {
  onRegisterHandshake = () => {
    const { registerHandshake, bid } = this.props;
    registerHandshake(bid.position_info.id);
  };

  onUnregisterHandshake = () => {
    const { unregisterHandshake, bid } = this.props;
    unregisterHandshake(bid.position_info.id);
  };

  render() {
    const { bid, isUnregister, userName } = this.props;
    const { readOnly } = this.context;
    const position = get(bid, 'position_info.position');
    const positionTitle = get(position, 'title') || NO_POSITION_TITLE;
    const post = getPostName(get(position, 'post'), NO_POST);
    const skillCode = get(position, 'skill') || NO_SKILL;
    const grade = get(position, 'grade') || NO_GRADE;
    // saving ted for Cory
    const ted = formatDate('2020-07-02T05:00:00Z');
    // const ted = position.bid.ted ? formatDate(position.bid.ted) : NO_TOUR_END_DATE;
    // modify line 6: import NO_TOUR_END_DATE from SystemMessages
    let mainText;
    if (!isUnregister) {
      if (!readOnly) {
        mainText = 'Would you like to register this handshake?';
      } else { mainText = 'This handshake needs to be registered'; }
    } else {
      mainText = `${userName || 'This user'}'s handshake has been registered`;
    }

    const buttonText = isUnregister ? 'Undo Register Handshake' : 'Register Handshake';

    const classes = [
      'bid-tracker-alert-container',
      'bid-tracker-alert-container--register',
      isUnregister ? 'bid-tracker-alert-container--unregister' : '',
    ];

    const classes$ = classes.join(' ');

    const regFunction = isUnregister ? this.onUnregisterHandshake : this.onRegisterHandshake;

    return (
      <div className={classes$}>
        <div className="usa-grid-full" style={{ display: 'flex' }}>
          <div className="register-submission-container" style={{ flex: 1 }}>
            <div className="sub-submission-text">
              {mainText}
            </div>
            <div className="usa-grid-full register-submission-buttons-container">
              <button
                className="tm-button-transparent tm-button-submit-bid"
                onClick={regFunction}
              >
                {buttonText}
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
  unregisterHandshake: PropTypes.func.isRequired,
  isUnregister: PropTypes.bool,
  userName: PropTypes.string,
};

HandshakeRegisterAlert.defaultProps = {
  isUnregister: false,
  userName: '',
};

export default HandshakeRegisterAlert;
