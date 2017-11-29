import React from 'react';
import { Link } from 'react-router-dom';

const BidderPortfolioViewMore = () => (
  <div className="usa-grid-full current-user-section-container view-more-link-centered">
    <div className="section-padded-inner-container-narrow">
      <Link to="/profile/dashboard/">View More</Link>
    </div>
  </div>
);

export default BidderPortfolioViewMore;
