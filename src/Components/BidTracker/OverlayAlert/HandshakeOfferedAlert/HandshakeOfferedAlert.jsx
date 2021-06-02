import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BID_OBJECT } from 'Constants/PropTypes';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_TEXT, NO_BUREAU, NO_DANGER_PAY,
  NO_GRADE, NO_LANGUAGES, NO_POST_DIFFERENTIAL, NO_SKILL,
  NO_TOUR_END_DATE, NO_TOUR_OF_DUTY, NO_USER_LISTED } from 'Constants/SystemMessages';
import { formatDate, getDifferentialPercentage } from 'utilities';
import StaticDevContent from 'Components/StaticDevContent';
import { acceptHandshake, declineHandshake } from '../../../../actions/handshake2';
import LinkButton from '../../../LinkButton';

class HandshakeOfferedAlert extends Component {
  onAcceptBid = () => {
    const { acceptBidHandshake, bid } = this.props;
    acceptBidHandshake(get(bid, 'position_info.id'));
  };

  onDeclineBid = () => {
    const { declineBidHandshake, bid } = this.props;
    declineBidHandshake(get(bid, 'position_info.id'));
  };

  render() {
    const { userName, bidIdUrl, bid } = this.props;
    const { condensedView } = this.context;
    const { position_info } = bid;
    const position = get(bid, 'position_info.position');
    const ted = formatDate(get(position_info, 'ted')) || NO_TOUR_END_DATE;
    const skill = get(position, 'skill') || NO_SKILL;
    const grade = get(position, 'grade') || NO_GRADE;
    const bureau = get(position, 'bureau') || NO_BUREAU;
    const tod = get(position, 'tour_of_duty') || NO_TOUR_OF_DUTY;
    const languages = get(position, 'languages');
    const postDiff = getDifferentialPercentage(get(position, 'post.differential_rate')) || NO_POST_DIFFERENTIAL;
    const dangerPay = get(position, 'post.danger_pay') || NO_DANGER_PAY;
    const incumbent = get(position, 'current_assignment.user') || NO_USER_LISTED;
    const hsOfferedDate = formatDate(get(bid, 'handshake.hs_date_offered')) || DEFAULT_TEXT;
    let languages$ = NO_LANGUAGES;
    if (languages) {
      languages$ = languages.map(l => l.representation).join(', ');
    }

    return (
      <div className="bid-tracker-alert-container--handshake-offered">
        { condensedView ?
          <LinkButton toLink={bidIdUrl} className="tm-button-transparent">
            Go to Bid Tracker to Accept or Decline Handshake
          </LinkButton>
          :
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 0.65 }}>
              <div>{`${userName}, you've been offered a handshake`}</div>
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
                  <div><span>TED: </span>{ted}</div>
                  <div><span>Skill: </span>{skill}</div>
                  <div><span>Grade: </span>{grade}</div>
                  <div><span>Bureau: </span>{bureau}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div><span>Tour of Duty: </span>{tod}</div>
                  <div><span>Bid Languages: </span>{languages$}</div>
                  <div><span>Post Differential | Danger Pay: </span>{postDiff}|{dangerPay}</div>
                  <div><span>Incumbent: </span>{incumbent}</div>
                </div>
              </div>
              <div className="hs-offered-date">Handshake offered {hsOfferedDate}</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

HandshakeOfferedAlert.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  userName: PropTypes.string.isRequired,
  bid: BID_OBJECT.isRequired,
  bidIdUrl: PropTypes.string,
  acceptBidHandshake: PropTypes.func.isRequired,
  declineBidHandshake: PropTypes.func.isRequired,
};

HandshakeOfferedAlert.defaultProps = {
  bidIdUrl: '',
};

HandshakeOfferedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export const mapDispatchToProps = dispatch => ({
  acceptBidHandshake: cp_id => dispatch(acceptHandshake(cp_id)),
  declineBidHandshake: cp_id => dispatch(declineHandshake(cp_id)),
});

export default connect(null, mapDispatchToProps)(HandshakeOfferedAlert);
