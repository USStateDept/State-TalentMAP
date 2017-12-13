import React from 'react';
// import PropTypes from 'prop-types';
import BidSteps from './BidStep';

const BidList = () => (
  <div className="bid-stepper bid-tracker" style={{ padding: '50px' }}>
    <div className="usa-grid-full">
      <div className="usa-width-one-half">
          Bid 1 <a>Edit</a> | Submitted <button>View Position</button>
      </div>
      <div className="usa-width-one-half">
        <div style={{ float: 'right' }}>
          <button>Actions</button>
        </div>
      </div>
    </div>
    <div className="usa-grid-full">
      <div className="usa-width-one-half">
          7/29/17
        </div>
    </div>
    <div className="usa-grid-full" style={{ marginTop: '20px' }}>
      <BidSteps bid={{ status: 'submitted' }} />
    </div>
  </div>
  );

BidList.propTypes = {
};

export default BidList;
