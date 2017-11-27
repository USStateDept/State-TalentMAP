import React from 'react';
import PropTypes from 'prop-types';
import BidCountNumber from './BidCountNumber';

const BidCount = ({ totalBids, inGradeBids, atSkillBids, inGradeAtSkillBids }) => (
  <ul className="bid-count-list">
    <BidCountNumber type="totalBids" number={totalBids} />
    <BidCountNumber type="inGradeBids" number={inGradeBids} />
    <BidCountNumber type="atSkillBids" number={atSkillBids} />
    <BidCountNumber type="inGradeAtSkillBids" number={inGradeAtSkillBids} />
  </ul>
);

BidCount.propTypes = {
  totalBids: PropTypes.number.isRequired,
  inGradeBids: PropTypes.number.isRequired,
  atSkillBids: PropTypes.number.isRequired,
  inGradeAtSkillBids: PropTypes.number.isRequired,
};

BidCount.defaultProps = {
  totalBids: 0,
  inGradeBids: 0,
  atSkillBids: 0,
  inGradeAtSkillBids: 0,
};

export default BidCount;
