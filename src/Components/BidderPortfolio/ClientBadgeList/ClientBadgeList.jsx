import React from 'react';
import PropTypes from 'prop-types';
import ClientBadge from '../ClientBadge';

const ClientBadgeList = ({ statuses }) => (
  <div className="usa-grid-full client-badge-list">
    <ClientBadge type="handshake" status={statuses.handshake} />
    <ClientBadge type="sixeight" status={statuses.sixeight} />
    <ClientBadge type="fairshare" status={statuses.fairshare} />
    <ClientBadge type="retirement" status={statuses.retirement} />
  </div>
);

ClientBadgeList.propTypes = {
  statuses: PropTypes.shape({
    handshake: PropTypes.oneOf([0, 1, 2]),
    sixeight: PropTypes.oneOf([0, 1, 2]),
    fairshare: PropTypes.oneOf([0, 1, 2]),
    retirement: PropTypes.oneOf([0, 1, 2]),
  }).isRequired,
};

ClientBadgeList.defaultProps = {
  statuses: {},
};

export default ClientBadgeList;
