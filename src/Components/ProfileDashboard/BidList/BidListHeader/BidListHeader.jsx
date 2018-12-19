import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import dateFns from 'date-fns';
import { formatDate } from '../../../../utilities';

// Due date is static for now
const BidListHeader = ({ date }) => (
  <div className="usa-grid-full bid-list-header section-padded-inner-container-narrow">
    <div className="usa-width-two-thirds bid-list-header-text">
      <FontAwesome name="clock-o" />{` All bids are due ${formatDate(date)}`}
    </div>
    <div className="usa-width-one-third bid-list-header-button-container">
      <button className="bid-list-header-button">More Info</button>
    </div>
  </div>
);

BidListHeader.propTypes = {
  date: PropTypes.string,
};

BidListHeader.defaultProps = {
  date: dateFns.format('07/15/2019', 'MM/DD/YYYY'),
};

export default BidListHeader;
