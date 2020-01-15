import React from 'react';
import PropTypes from 'prop-types';
// import InteractiveElement from '../InteractiveElement';

// const BidRemoveSuccess = ({ onToggle }) => (
const BidRemoveSuccess = ({ pos }) => (
  <span>
    Bid successfully removed {pos} from Bid List.&nbsp;
    {/* <InteractiveElement
      type="b"
      onClick={onToggle}
    >
        Undo
    </InteractiveElement>. */}
  </span>
);

BidRemoveSuccess.propTypes = {
  // onToggle: PropTypes.func.isRequired,
  pos: PropTypes.string.isRequired,
};

export default BidRemoveSuccess;
