import { Component } from 'react';
import PropTypes from 'prop-types';
import { BID_OBJECT } from 'Constants/PropTypes';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NO_BID_CYCLE, NO_BUREAU, NO_DANGER_PAY,
  NO_GRADE, NO_LANGUAGE, NO_POSITION_NUMBER, NO_POSITION_TITLE,
  NO_POST, NO_POST_DIFFERENTIAL, NO_SKILL, NO_TOUR_END_DATE, NO_TOUR_OF_DUTY, NO_USER_LISTED } from 'Constants/SystemMessages';
import { formatDate, getDifferentialPercentage, getPostName } from 'utilities';
import StaticDevContent from 'Components/StaticDevContent';
import LinkButton from '../../../LinkButton';

class HandshakeOfferedAlert extends Component {
  onAcceptBid = () => {
    const { acceptBid, id } = this.props;
    acceptBid(id);
  };

  onDeclineBid = () => {
    const { declineBid, id } = this.props;
    declineBid(id);
  };

  render() {
    const { userName, bidIdUrl, bid } = this.props;
    const { condensedView } = this.context;
    const { position_info } = bid;
    const positionTitle = get(position_info, 'title') || NO_POSITION_TITLE;
    const positionNumber = get(position_info, 'position_number') || NO_POSITION_NUMBER;
    const post = getPostName(get(position_info, 'post'), NO_POST);
    const ted = formatDate(get(position_info, 'ted')) || NO_TOUR_END_DATE;
    const bidCycle = get(position_info, 'bidcycle.name') || NO_BID_CYCLE;
    const skill = get(position_info, 'skill') || NO_SKILL;
    const grade = get(position_info, 'grade') || NO_GRADE;
    const bureau = get(position_info, 'position.bureau') || NO_BUREAU;
    const tod = get(position_info, 'position.tour_of_duty') || NO_TOUR_OF_DUTY;
    const language = get(position_info, 'position.languages') || NO_LANGUAGE;
    const postDiff = getDifferentialPercentage(get(position_info, 'post.differential_rate')) || NO_POST_DIFFERENTIAL;
    const dangerPay = get(position_info, 'post.danger_pay') || NO_DANGER_PAY;
    const incumbent = get(position_info, 'position.current_assignment.user') || NO_USER_LISTED;

    return (
      <div className="bid-tracker-alert-container--handshake-offered">
        { condensedView ?
          <LinkButton toLink={bidIdUrl} className="tm-button-transparent">
            Go to Bid Tracker to Accept or Decline Handshake
          </LinkButton>
          :
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <div>{`${userName}, you've been offered a handshake for ${positionTitle} (${positionNumber})`}</div>
              <button className="tm-button-transparent" onClick={this.onAcceptBid}>
                <FontAwesomeIcon icon={faCheck} /> Accept Handshake
              </button>
              <button className="tm-button-transparent tm-button-no-box" onClick={this.onDeclineBid}>
                Decline Handshake
              </button>
              <StaticDevContent>
                <div>24 hours to accept the handshake</div>
              </StaticDevContent>
            </div>
            <div className="right-half">
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <div><span>Post: </span>{post}</div>
                  <div><span>TED: </span>{ted}</div>
                  <div><span>Bid Cycle: </span>{bidCycle}</div>
                  <div><span>Skill: </span>{skill}</div>
                  <div><span>Grade: </span>{grade}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <StaticDevContent>
                    <div><span>Bureau: </span>{bureau}</div>
                    <div><span>Tour of Duty: </span>{tod}</div>
                    <div><span>Bid Language: </span>{language}</div>
                    <div><span>Post Differential | Danger Pay: </span>{postDiff}|{dangerPay}</div>
                    <div><span>Incumbent: </span>{incumbent}</div>
                  </StaticDevContent>
                </div>
              </div>
              <StaticDevContent>
                <div className="hs-offered-date">Handshake offered {formatDate('2020-05-18T05:00:00Z')}</div>
              </StaticDevContent>
            </div>
          </div>
        }
      </div>
    );
  }
}

HandshakeOfferedAlert.propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  bid: BID_OBJECT.isRequired,
  acceptBid: PropTypes.func.isRequired,
  declineBid: PropTypes.func.isRequired,
  bidIdUrl: PropTypes.string,
};

HandshakeOfferedAlert.defaultProps = {
  bidIdUrl: '',
};

HandshakeOfferedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export default HandshakeOfferedAlert;
