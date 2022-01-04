import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { BID_OBJECT } from 'Constants/PropTypes';
import { NO_GRADE, NO_POSITION_TITLE, NO_POST, NO_SKILL, NO_TOUR_END_DATE } from 'Constants/SystemMessages';
import { get } from 'lodash';
import { formatDate, getPostName } from 'utilities';

class DraftAlert extends Component {
  onSubmitBid = () => {
    const { submitBid, bid } = this.props;
    submitBid(bid.position_info.id);
  };

  render() {
    const { bid } = this.props;
    const { readOnly } = this.context;
    const { position_info } = bid;
    const position = get(bid, 'position_info.position');
    const positionTitle = get(position, 'title') || NO_POSITION_TITLE;
    const post = getPostName(get(position, 'post'), NO_POST);
    const skill = get(position, 'skill') || NO_SKILL;
    const grade = get(position, 'grade') || NO_GRADE;
    const ted = formatDate(get(position_info, 'ted')) || NO_TOUR_END_DATE;
    return (
      <div className="bid-tracker-alert-container bid-tracker-alert-container--draft">
        <div className="usa-grid-full" style={{ display: 'flex' }}>
          <div className="draft-submission-container" style={{ flex: 1 }}>
            <div className="sub-submission-text">
              { readOnly ?
                'This bid is in draft' :
                'Would you like to submit your bid?'
              }
            </div>
            <div className="usa-grid-full draft-submission-buttons-container">
              {
                !readOnly &&
                  <button
                    className="tm-button-transparent tm-button-submit-bid"
                    onClick={this.onSubmitBid}
                  >
                    <FontAwesome name="paper-plane-o" /> Submit Bid
                  </button>
              }
            </div>
          </div>
          <div className="draft-position-details" style={{ flex: 1 }}>
            <div>
              {positionTitle}
            </div>
            <div>
              <span className="title">Location: </span>
              {post}
            </div>
            <div>
              <span className="title">TED: </span>
              {ted}
            </div>
            <div>
              <span className="title">Skill: </span>
              {skill}
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

DraftAlert.contextTypes = {
  readOnly: PropTypes.bool,
};

DraftAlert.propTypes = {
  bid: BID_OBJECT.isRequired,
  submitBid: PropTypes.func.isRequired,
};

export default DraftAlert;
