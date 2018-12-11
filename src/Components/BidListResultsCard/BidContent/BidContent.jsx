import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BidStatus from '../BidStatus';

const BidContent = ({ status, positionNumber, postName, positionTitle }) => (
  <div className="usa-grid-full bid-content-container">
    <BidStatus status={status} positionTitle={positionTitle} />
    <div>
      <span className="bid-list-card-title-position">Position number </span>
      <Link to={`/details/${positionNumber}`}>
        {positionNumber}
      </Link>
    </div>
    <div>
      <span className="bid-list-card-title-post">Post </span>
      { postName }
    </div>
  </div>
);

BidContent.propTypes = {
  status: PropTypes.string.isRequired,
  positionNumber: PropTypes.string.isRequired,
  postName: PropTypes.string.isRequired,
  positionTitle: PropTypes.string.isRequired,
};


export default BidContent;
