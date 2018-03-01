import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import BID_COUNT_DEFINITIONS from '../../../Constants/BidCountDefinitions';

const BidCountNumber = ({ type, number }) => (
  <li className="bid-count-list-item" title={BID_COUNT_DEFINITIONS[type].title}>
    <Tooltip
      title={BID_COUNT_DEFINITIONS[type].definition}
      arrow
      offset={-50}
      tabIndex="0"
    >
      <span className="bid-count-number">
        {number}
      </span>
    </Tooltip>
  </li>
);

BidCountNumber.propTypes = {
  number: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['totalBids', 'inGradeBids', 'atSkillBids', 'inGradeAtSkillBids']).isRequired,
};

export default BidCountNumber;
