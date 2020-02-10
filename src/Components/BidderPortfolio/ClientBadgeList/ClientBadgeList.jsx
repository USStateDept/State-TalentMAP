import React from 'react';
import PropTypes from 'prop-types';
import ClientBadge from '../ClientBadge';

const ClientBadgeList = ({ statuses }) => (
  <div className="usa-grid-full client-badge-list">
    <ClientBadge type="thirdtour" status={statuses.thirdtour} />
    <ClientBadge type="tenured" status={statuses.tenured} />
    <ClientBadge type="sixeight" status={statuses.sixeight} />
    <ClientBadge type="ambassador" status={statuses.ambassador} />
    <ClientBadge type="criticallanguage" status={statuses.criticallanguage} />
    <ClientBadge type="criticallanguageone" status={statuses.criticallanguageone} />
    <ClientBadge type="criticallanguagefinal" status={statuses.criticallanguagefinal} />
    <ClientBadge type="differential" status={statuses.differential} />
    <ClientBadge type="fairshare" status={statuses.fairshare} />
    <ClientBadge type="pickering" status={statuses.pickering} />
    <ClientBadge type="rangel" status={statuses.rangel} />
    <ClientBadge type="meritorious" status={statuses.meritorious} />
    <ClientBadge type="fellow" status={statuses.fellow} />
    <ClientBadge type="tenure" status={statuses.tenure} />
    <ClientBadge type="tandem" status={statuses.tandem} />
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
