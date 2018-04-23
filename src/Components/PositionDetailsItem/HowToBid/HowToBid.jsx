import React from 'react';

const HowToBid = () => (
  <div className="position-details-contact how-to-bid">
    <div className="contact-container">
      <dl>
        <dt>How to bid</dt>
        <dd>
          {`You can't yet bid for a position using TalentMAP.
          If you've decided you want to bid for this position,
          you still need to sign in to the FSBid system.`}
        </dd>
      </dl>
    </div>
  </div>
);

HowToBid.propTypes = {
};

HowToBid.defaultProps = {
};

export default HowToBid;
