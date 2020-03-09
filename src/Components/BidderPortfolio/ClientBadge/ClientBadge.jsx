import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tippy';

import { faLanguage, faGraduationCap, faUserFriends, faMedal, faTree, faRegistered, faChessQueen, faSeedling, faPercentage, faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons';

const icons = {
  3: {
    isIcon: true,
    name: faSeedling,
    text: '3rd Tour',
    shortCode: '3Tr',
  },
  4: {
    isIcon: true,
    name: faTree,
    text: 'Tenured',
    shortCode: 'TEN',
  },
  R: {
    isIcon: true,
    name: faRegistered,
    text: 'Recommended for Tenure',
    shortCode: 'RFT',
  },
  6: {
    name: '6/8',
    text: '6/8 Rule',
    shortCode: '6/8',
  },
  A: {
    isIcon: true,
    name: faChessQueen,
    text: 'Ambassador / Deputy Assistant Secretary',
    shortCode: 'A',
  },
  C: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language',
    shortCode: 'CNL',
  },
  C1: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language 1st Tour',
    shortCode: 'CNL1',
  },
  CC: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language Final Tour',
    shortCode: 'CNLF',
  },
  D: {
    isIcon: true,
    name: faPercentage,
    text: 'Differential',
    shortCode: 'D',
  },
  F: {
    isIcon: true,
    name: faBalanceScaleLeft,
    text: 'Fair Share',
    shortCode: 'FS',
  },
  F1: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering Fellows',
    shortCode: 'PF',
  },
  F2: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Rangel Fellows',
    shortCode: 'RF',
  },
  M: {
    isIcon: true,
    name: faMedal,
    text: 'Meritorious Step Increases',
    shortCode: 'M',
  },
  P: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering/Rangel Fellows',
    shortCode: 'F',
  },
  T: {
    isIcon: true,
    name: faUserFriends,
    text: 'Tandem',
    shortCode: 'TAN',
  },
};

const status$ = ['none', 'success'];

const ClientBadge = ({ type, status }) => {
  const isHighlighted = status === true ? 'success' : 'none';
  const ariaLabel = `type of "${type}" with status of "${status$[status]}"`;
  return (
    <div className={`usa-grid-full client-badge-container client-badge-container--${icons[type].isIcon ? 'icon' : 'text'} client-badge-container--${isHighlighted}`}>
      <div className="client-badge">
        <Tooltip
          title={icons[type].text}
          arrow
          offset={-95}
          position="top-end"
          tabIndex="0"
        >
          {
            icons[type].isIcon ?
              <FontAwesomeIcon
                aria-label={ariaLabel}
                icon={icons[type].name}
              /> :
              <span aria-label={ariaLabel}>{icons[type].name}</span>
          }
        </Tooltip>
      </div>
      <div className="client-badge-text">
        <span>{icons[type].shortCode}</span>
      </div>
    </div>
  );
};

ClientBadge.propTypes = {
  type: PropTypes.oneOf([
    3,
    4,
    'R',
    6,
    'A',
    'C',
    'C1',
    'CC',
    'D',
    'F',
    'F1',
    'F2',
    'M',
    'P',
    'T',
  ]).isRequired,
  status: PropTypes.bool,
};

ClientBadge.defaultProps = {
  type: [],
  status: false,
};

export default ClientBadge;
