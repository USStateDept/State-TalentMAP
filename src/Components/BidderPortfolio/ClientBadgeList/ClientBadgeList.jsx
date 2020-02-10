import React from 'react';
import PropTypes from 'prop-types';
import ClientBadge from '../ClientBadge';

const ClientBadgeList = ({ statuses }) => (
  <div className="usa-grid-full client-badge-list">
    <ClientBadge type="thirdtour" status={statuses.thirdtour} />
    <ClientBadge type="tenure" status={statuses.tenure} />
    <ClientBadge type="tenured" status={statuses.tenured} />
    <ClientBadge type="ambassador" status={statuses.ambassador} />
    <ClientBadge type="criticallanguage" status={statuses.criticallanguage} />
    <ClientBadge type="criticallanguageone" status={statuses.criticallanguageone} />
    <ClientBadge type="criticallanguagefinal" status={statuses.criticallanguagefinal} />
    <ClientBadge type="sixeight" status={statuses.sixeight} />
    <ClientBadge type="differential" status={statuses.differential} />
    <ClientBadge type="fairshare" status={statuses.fairshare} />
    <ClientBadge type="pickering" status={statuses.pickering} />
    <ClientBadge type="rangel" status={statuses.rangel} />
    <ClientBadge type="fellow" status={statuses.fellow} />
    <ClientBadge type="meritorious" status={statuses.meritorious} />
    <ClientBadge type="tandem" status={statuses.tandem} />
  </div>
);

ClientBadgeList.propTypes = {
  statuses: PropTypes.shape({
    handshake: PropTypes.oneOf(['true', 'false']),
    thirdtour: PropTypes.oneOf(['true', 'false']),
    tenured: PropTypes.oneOf(['true', 'false']),
    sixeight: PropTypes.oneOf(['true', 'false']),
    ambassador: PropTypes.oneOf(['true', 'false']),
    criticallanguage: PropTypes.oneOf(['true', 'false']),
    criticallanguageone: PropTypes.oneOf(['true', 'false']),
    criticallanguagefinal: PropTypes.oneOf(['true', 'false']),
    differential: PropTypes.oneOf(['true', 'false']),
    fairshare: PropTypes.oneOf(['true', 'false']),
    pickering: PropTypes.oneOf(['true', 'false']),
    rangel: PropTypes.oneOf(['true', 'false']),
    meritorious: PropTypes.oneOf(['true', 'false']),
    fellow: PropTypes.oneOf(['true', 'false']),
    tenure: PropTypes.oneOf(['true', 'false']),
    tandem: PropTypes.oneOf(['true', 'false']),
  }).isRequired,
};

ClientBadgeList.defaultProps = {
  statuses: {},
};

export default ClientBadgeList;
