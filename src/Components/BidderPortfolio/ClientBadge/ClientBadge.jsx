import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tippy';
import { get } from 'lodash';

import { faLanguage, faGraduationCap, faUserFriends, faMedal, faTree, faRegistered, faChessQueen,
  faSeedling, faPercentage, faBalanceScaleLeft, faDiceSix, faSpa } from '@fortawesome/free-solid-svg-icons';

const icons = {
  3: {
    isIcon: true,
    name: faSeedling,
    text: '3rd Tour',
    shortCode: '3TR',
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
    shortCode: 'REC',
  },
  6: {
    isIcon: true,
    name: faDiceSix,
    text: '6/8',
    shortCode: '6/8',
  },
  A: {
    isIcon: true,
    name: faChessQueen,
    text: 'Ambassador / Deputy Assistant Secretary',
    shortCode: 'AMB',
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
    shortCode: 'CL1',
  },
  CC: {
    isIcon: true,
    name: faLanguage,
    text: 'Critical Need Language Final Tour',
    shortCode: 'CLF',
  },
  D: {
    isIcon: true,
    name: faPercentage,
    text: 'Differential',
    shortCode: 'DIF',
  },
  F: {
    isIcon: true,
    name: faBalanceScaleLeft,
    text: 'Fair Share',
    shortCode: 'FAIR',
  },
  F1: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering Fellows',
    shortCode: 'PIK',
  },
  F2: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Rangel Fellows',
    shortCode: 'RGL',
  },
  M: {
    isIcon: true,
    name: faMedal,
    text: 'Meritorious Step Increases',
    shortCode: 'MER',
  },
  P: {
    isIcon: true,
    name: faGraduationCap,
    text: 'Pickering/Rangel Fellows',
    shortCode: 'FEL',
  },
  T: {
    isIcon: true,
    name: faUserFriends,
    text: 'Tandem',
    shortCode: 'TAN',
  },
  8: {
    isIcon: true,
    name: faSpa,
    text: '8 Rule',
    shortCode: '8 Rule',
  },
};

const status$ = ['none', 'success'];

const ClientBadge = ({ type, status }) => {
  const isHighlighted = status === true ? 'success' : 'none';
  const ariaLabel = `type of "${type}" with status of "${status$[status]}"`;
  const icon = get(icons, type, 'None');
  return (
    <div className={`usa-grid-full client-badge-container client-badge-container--${icons[type] && icons[type].isIcon ? 'icon' : 'text'} client-badge-container--${isHighlighted}`}>
      <div className="client-badge">
        <Tooltip
          title={get(icon, 'text', 'None')}
          arrow
          offset={-95}
          position="top-end"
          tabIndex="0"
        >
          <FontAwesomeIcon
            aria-label={ariaLabel}
            icon={get(icon, 'name', 'None')}
          />
        </Tooltip>
      </div>
      <div className="client-badge-text">
        <span>{get(icon, 'shortCode', 'None')}</span>
      </div>
    </div>
  );
};

ClientBadge.propTypes = {
  type: PropTypes.oneOf([
    '3',
    '4',
    'R',
    '6',
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
