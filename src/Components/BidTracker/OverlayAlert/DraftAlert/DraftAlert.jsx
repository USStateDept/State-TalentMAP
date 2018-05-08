import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { BID_OBJECT } from '../../../../Constants/PropTypes';
import InteractiveElement from '../../../InteractiveElement';
import { NO_POST, NO_SKILL, NO_GRADE } from '../../../../Constants/SystemMessages';
import { getPostName } from '../../../../utilities';

class DraftAlert extends Component {
  constructor(props) {
    super(props);
    this.onSubmitBid = this.onSubmitBid.bind(this);
    this.onDeleteBid = this.onDeleteBid.bind(this);
  }
  onSubmitBid() {
    const { submitBid, id } = this.props;
    submitBid(id);
  }
  onDeleteBid() {
    const { deleteBid, bid } = this.props;
    deleteBid(bid.position.id);
  }
  render() {
    const { bid } = this.props;
    const position = bid.position;
    const positionTitle = position.title;
    const post = getPostName(position.post, NO_POST);
    const skillCode = position.skill ? position.skill : NO_SKILL;
    const grade = position.grade ? position.grade : NO_GRADE;
    return (
      <div className="bid-tracker-alert-container bid-tracker-alert-container--draft">
        <div className="usa-grid-full">
          <div className="usa-width-one-half draft-submission-container">
            <div className="sub-submission-text">
              Would you like to submit your bid?
            </div>
            <div className="usa-grid-full draft-submission-buttons-container">
              <button
                className="tm-button-transparent tm-button-submit-bid"
                onClick={this.onSubmitBid}
              >
                <FontAwesome name="paper-plane-o" /> Submit Bid
              </button>
              <InteractiveElement
                className="remove-bid-link"
                role="link"
                onClick={this.onDeleteBid}
              >
                Remove Bid
              </InteractiveElement>
            </div>
          </div>
          <div className="usa-width-one-half draft-position-details">
            <div>
              {positionTitle}
            </div>
            <div>
              <span className="title">Post: </span>
              {post}
            </div>
            <div>
              <span className="title">Skill code: </span>
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

DraftAlert.propTypes = {
  id: PropTypes.number.isRequired,
  bid: BID_OBJECT.isRequired,
  submitBid: PropTypes.func.isRequired,
  deleteBid: PropTypes.func.isRequired,
};

export default DraftAlert;
