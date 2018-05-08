// Once About page is ready, uncomment the commented code
import React from 'react';
// import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const BetaHeader = () => (
  <div className="usa-banner tm-beta-header">
    <div className="usa-grid usa-banner-inner padded-main-content">
      <FontAwesome name="gears" />
      Welcome to TalentMAP!  Use this site to research positions and continue to bid using FSBid.
       New features are coming soon.
      {/* <Link to="/about">Read more about how to use this site and what&#39;s to come.</Link> */}
    </div>
  </div>
);

export default BetaHeader;
