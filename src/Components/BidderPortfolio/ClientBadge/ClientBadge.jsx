import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const icons = {
  handshake: {
    isIcon: true,
    name: 'handshake-o',
    text: 'Handshake',
  },
  sixeight: {
    name: '6/8',
    text: '6/8',
  },
  fairshare: {
    isIcon: true,
    name: 'balance-scale',
    text: 'Fair Share',
  },
  retirement: {
    isIcon: true,
    name: 'trophy',
    text: 'Retirement',
  },
};

// const iconIdeas = {
//   thirdtour: {
//     isIcon: true,
//     name: 'chess-pawn',
//     text: '3rd Tour Bidders',
//   },
//   tenured: {
//     isIcon: true,
//     name: 'anchor',
//     text: 'Tenured',
//   },
//   sixeight: {
//     name: '6/8',
//     text: '6/8 Rule',
//   },
//   ambassador: {
//     isIcon: true,
//     name: 'chess-queen',
//     text: 'Ambassador or Deputy Assistant Secretary',
//   },
//   criticallanguage: {
//     isIcon: true,
//     name: 'language',
//     text: 'Critical Need Language',
//   },
//   criticallanguageone: {
//     isIcon: true,
//     name: 'language',
//     text: 'Critical Need Language 1st Tour Complete',
//   },
//   criticallanguagefinal: {
//     isIcon: true,
//     name: 'language',
//     text: 'Critical Need Language Final Tour Complete',
//   },
//   differential: {
//     isIcon: true,
//     name: 'percent',
//     text: 'Differential Bidder',
//   },
//   fairshare: {
//     isIcon: true,
//     name: 'balance-scale',
//     text: 'Fair Share Bidders',
//   },
//   pickering: {
//     isIcon: true,
//     name: 'user-graduate',
//     text: 'Pickering Fellows',
//   },
//   rangel: {
//     isIcon: true,
//     name: 'user-graduate',
//     text: 'Rangel Fellows',
//   },
//   meritorious: {
//     isIcon: true,
//     name: 'medal',
//     text: 'Meritorious Step Increases',
//   },
//   fellow: {
//     isIcon: true,
//     name: 'user-graduate',
//     text: 'Pickering/Rangel Fellows',
//   },
//   tenure: {
//     isIcon: true,
//     name: 'water',
//     text: 'Recommended for Tenure',
//   },
//   tandem: {
//     isIcon: true,
//     name: 'user-friends',
//     text: 'Tandem Bidder',
//   },
// };

const status$ = ['none', 'warning', 'success'];

const ClientBadge = ({ type, status }) => {
  const ariaLabel = `type of "${type}" with status of "${status$[status]}"`;
  return (
    <div className={`usa-grid-full client-badge-container client-badge-container--${icons[type].isIcon ? 'icon' : 'text'} client-badge-container--${status$[status]}`}>
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

ClientBadge.defaultProps = {
  status: 0,
};

export default ClientBadge;
