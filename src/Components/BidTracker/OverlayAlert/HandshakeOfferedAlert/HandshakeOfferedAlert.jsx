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
import TimeRemaining from '../TimeRemaining';
import { acceptHandshake, declineHandshake } from '../../../../actions/handshake2';
import LinkButton from '../../../LinkButton';

class HandshakeOfferedAlert extends Component {
  onAcceptBid = () => {
    const { acceptBidHandshake, bid, cdoView, userName } = this.props;
    acceptBidHandshake(get(bid, 'position_info'), userName, cdoView, get(bid, 'emp_id'));
  };

  onDeclineBid = () => {
    const { declineBidHandshake, bid, cdoView } = this.props;
    declineBidHandshake(get(bid, 'position_info.id'), cdoView, get(bid, 'emp_id'));
  };

  render() {
    const { userName, bidIdUrl, bid, cdoView } = this.props;
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
    const dangerPay = getDifferentialPercentage(get(position, 'post.danger_pay')) || NO_DANGER_PAY;
    const incumbent = get(position, 'current_assignment.user') || NO_USER_LISTED;
    const hsOfferedDate = formatDate(get(bid, 'handshake.hs_date_offered')) || DEFAULT_TEXT;
    const handshake = get(bid, 'handshake') || {};
    const bidderAction = get(handshake, 'bidder_hs_code');
    const bidderAction$ = bidderAction === 'handshake_accepted' ? 'accepted' : 'declined';
    const hsActionBy = `${handshake.hs_cdo_indicator ? 'a CDO' : `${cdoView ? userName : 'you'}`}`;
    const hsActionDate = formatDate(bidderAction$ === 'accepted' ? get(handshake, 'hs_date_accepted') : get(handshake, 'hs_date_declined'));
    const hsExpiration = get(handshake, 'hs_date_expiration');
    const acceptedOtherHandshake = get(bid, 'accept_handshake_disabled');

    let languages$ = NO_LANGUAGES;
    if (languages) {
      languages$ = languages.map(l => l.representation).join(', ');
    }

    const acceptedOtherHandShakeText = acceptedOtherHandshake ? ', but another one within the same bid cycle has already been accepted.' : '';

    return (
      <div className="bid-tracker-alert-container--handshake-offered">
        { condensedView ?
          <LinkButton toLink={bidIdUrl} className="tm-button-transparent">
            Go to Bid Tracker to Accept or Decline Handshake
          </LinkButton>
          :
          <div className="flex">
            <div className="left-side">
              {
                !bidderAction ?
                  <>
                    <div>{`${userName}${cdoView ? ' has' : ", you've"} been offered a handshake`}{acceptedOtherHandShakeText}</div>
                    <button className="tm-button-transparent" onClick={this.onAcceptBid} disabled={!!acceptedOtherHandshake}>
                      <FontAwesomeIcon icon={faCheck} /> Accept Handshake
                    </button>
                    <button className="tm-button-transparent tm-button-no-box" onClick={this.onDeclineBid}>
                    Decline Handshake
                    </button>
                    {!!hsExpiration && <TimeRemaining time={hsExpiration} />}
                  </>
                  :
                  <>
                    <div>{`Handshake was ${bidderAction$} by ${hsActionBy} on ${hsActionDate}`}{acceptedOtherHandShakeText}</div>
                    <button className="tm-button-transparent" onClick={this.onAcceptBid} disabled={bidderAction$ === 'accepted' || acceptedOtherHandshake}>
                      <FontAwesomeIcon icon={faCheck} /> Accept Handshake
                    </button>
                    {
                      cdoView &&
                        <button
                          className="tm-button-transparent tm-button-no-box"
                          onClick={this.onDeclineBid}
                          disabled={bidderAction$ === 'declined'}
                        >Decline Handshake</button>
                    }
                  </>
              }
            </div>
            <div className="right-side">
              <div className="flex">
                <div>
                  <div><span>TED: </span>{ted}</div>
                  <div><span>Skill: </span>{skill}</div>
                  <div><span>Grade: </span>{grade}</div>
                  <div><span>Bureau: </span>{bureau}</div>
                </div>
                <div>
                  <div><span>Tour of Duty: </span>{tod}</div>
                  <div><span>Language: </span>{languages$}</div>
                  <div><span>Post Differential | Danger Pay: </span>{postDiff} | {dangerPay}</div>
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
  userName: PropTypes.string.isRequired,
  bid: BID_OBJECT.isRequired,
  bidIdUrl: PropTypes.string,
  acceptBidHandshake: PropTypes.func.isRequired,
  declineBidHandshake: PropTypes.func.isRequired,
  cdoView: PropTypes.bool,
};

HandshakeOfferedAlert.defaultProps = {
  bidIdUrl: '',
  cdoView: false,
};

HandshakeOfferedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export const mapDispatchToProps = dispatch => ({
  acceptBidHandshake: (pos_info, name, isCDO, emp_id) => dispatch(acceptHandshake(pos_info,
    name, isCDO, emp_id)),
  declineBidHandshake: (cp_id, isCDO, emp_id) => dispatch(declineHandshake(cp_id, isCDO, emp_id)),
});

export default connect(null, mapDispatchToProps)(HandshakeOfferedAlert);
