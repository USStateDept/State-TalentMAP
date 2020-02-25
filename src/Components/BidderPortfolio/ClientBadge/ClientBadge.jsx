import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const icons = {
  3: {
    isIcon: true,
    name: 'bath',
    text: '3rd Tour',
  },
  4: {
    isIcon: true,
    name: 'anchor',
    text: 'Tenured',
  },
  R: {
    isIcon: true,
    name: 'life-ring',
    text: 'Recommended for Tenure',
  },
  6: {
    name: '6/8',
    text: '6/8 Rule',
  },
  A: {
    isIcon: true,
    name: 'ship',
    text: 'Ambassador / Deputy Assistant Secretary',
  },
  C: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language',
  },
  C1: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language 1st Tour',
  },
  CC: {
    isIcon: true,
    name: 'language',
    text: 'Critical Need Language Final Tour',
  },
  D: {
    isIcon: true,
    name: 'percent',
    text: 'Differential',
  },
  F: {
    isIcon: true,
    name: 'balance-scale',
    text: 'Fair Share',
  },
  F1: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Pickering Fellows',
  },
  F2: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Rangel Fellows',
  },
  M: {
    isIcon: true,
    name: 'trophy',
    text: 'Meritorious Step Increases',
  },
  P: {
    isIcon: true,
    name: 'graduation-cap',
    text: 'Pickering/Rangel Fellows',
  },
  T: {
    isIcon: true,
    name: 'users',
    text: 'Tandem',
  },
};

const status$ = ['none', 'success'];

const ClientBadge = ({ type, status }) => {
  const isHighlighted = (status === true) ? 'success' : 'none';
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
        <span>{type}</span>
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
