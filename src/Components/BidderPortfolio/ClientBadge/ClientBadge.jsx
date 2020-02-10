import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const icons = {
  thirdtour: {
    isIcon: true,
    name: 'bath',
    text: '3rd Tour Bidders',
  },
  tenured: {
    isIcon: true,
    name: 'anchor',
    text: 'Tenured',
  },
  tenure: {
    isIcon: true,
    name: 'life-ring',
    text: 'Recommended for Tenure',
  },
  sixeight: {
    name: '6/8',
    text: '6/8 Rule',
  },
  ambassador: {
    isIcon: true,
    name: 'ship',
    text: 'Ambassador or Deputy Assistant Secretary',
  },
  criticallanguage: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language',
  },
  criticallanguageone: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language 1st Tour Complete',
  },
  criticallanguagefinal: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language Final Tour Complete',
  },
  differential: {
    isIcon: true,
    name: 'percent',
    text: 'Differential Bidder',
  },
  fairshare: {
    isIcon: true,
    name: 'balance-scale',
    text: 'Fair Share Bidders',
  },
  pickering: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Pickering Fellows',
  },
  rangel: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Rangel Fellows',
  },
  meritorious: {
    isIcon: true,
    name: 'trophy',
    text: 'Meritorious Step Increases',
  },
  fellow: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Pickering/Rangel Fellows',
  },
  tandem: {
    isIcon: true,
    name: 'users',
    text: 'Tandem Bidder',
  },
};

const status$ = ['none', 'success'];

const ClientBadge = ({ type, status }) => {
  const isHighlighted = (status === 'true') ? 'success' : 'none';
  const ariaLabel = `type of "${type}" with status of "${status$[status]}"`;
  return (
    <div className={`usa-grid-full client-badge-container client-badge-container--${icons[type].isIcon ? 'icon' : 'text'} client-badge-container--${isHighlighted}`}>
      <div className="client-badge">
        {
          icons[type].isIcon ?
            <FA aria-label={ariaLabel} name={icons[type].name} /> :
            <span aria-label={ariaLabel}>{icons[type].name}</span>
        }
      </div>
      <div className="client-badge-text">
        <span>{icons[type].text}</span>
      </div>
    </div>
  );
};

ClientBadge.propTypes = {
  type: PropTypes.oneOf(['handshake', 'sixeight', 'fairshare', 'retirement']).isRequired,
  status: PropTypes.oneOf([0, 1, 2]),
};

ClientBadge.propTypes = {
  type: PropTypes.oneOf([
    'thirdtour',
    'tenured',
    'sixeight',
    'ambassador',
    'criticallanguage',
    'criticallanguageone',
    'criticallanguagefinal',
    'differential',
    'fairshare',
    'pickering',
    'rangel',
    'meritorious',
    'fellow',
    'tenure',
    'tandem',
  ]).isRequired,
  status: PropTypes.oneOf([0, 1, 2]),
};

ClientBadge.defaultProps = {
  status: 0,
};

export default ClientBadge;
