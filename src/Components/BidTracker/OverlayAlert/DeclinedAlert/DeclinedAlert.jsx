import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../../../LinkButton';

const DeclinedAlert = ({ bureau, id }, { condensedView }) => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--declined">
    <div className="top-text">
      {bureau || 'The bureau'} has <strong>declined</strong> the bid
    </div>
    {
      condensedView &&
      <div className="usa-grid-full">
        <LinkButton toLink={`/profile/bidtracker/${id || ''}`} className="tm-button-transparent">
          Go to Bid Tracker
        </LinkButton>
      </div>
    }
  </div>
);

DeclinedAlert.propTypes = {
  bureau: PropTypes.string.isRequired,
  id: PropTypes.number,
};

DeclinedAlert.defaultProps = {
  id: 0,
};

DeclinedAlert.contextTypes = {
  condensedView: PropTypes.bool,
};

export default DeclinedAlert;
