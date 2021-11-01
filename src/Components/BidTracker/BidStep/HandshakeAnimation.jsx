import { useState } from 'react';
import FA from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandshake } from '@fortawesome/free-solid-svg-icons';
import InteractiveElement from 'Components/InteractiveElement';
import { Handshake } from 'Components/Ribbon';
import PropTypes from 'prop-types';

const HandshakeAnimation = ({ isBidTracker, isRibbon, isBidder, shortName }) => {
  const [animate, setAnimate] = useState(false);
  const [allowAnimate, setAllowAnimate] = useState(true);

  const animateHands = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 4000);
  };

  const throttledEventHandler = () => {
    if (allowAnimate) {
      animateHands();
      setAllowAnimate(false);
      setTimeout(() => {
        setAllowAnimate(true);
      }, 5000);
    }
  };

  return (
    <InteractiveElement onMouseOver={throttledEventHandler} onFocus={throttledEventHandler}>
      {isBidTracker &&
      (
        <div className="hs-animation-bidtracker">
          <FontAwesomeIcon className={`left ${animate ? 'animate-left' : ''}`} icon={faHandPaper} />
          <FontAwesomeIcon className={`right ${animate ? 'animate-right' : ''}`} icon={faHandPaper} />
          <div className={`hs-container ${animate ? 'temp-transparent' : ''}`}>
            <FontAwesomeIcon className={`hs-bidtracker ${animate ? 'animate-hs-bidtracker' : ''}`} icon={faHandshake} />
          </div>
        </div>
      )
      }
      {isRibbon &&
      (
        <div className={`hs-animation-ribbon ${animate ? 'animate-hs-animation-ribbon' : ''}`}>
          <div className={`left ${animate ? 'animate-left' : ''}`} >
            <FontAwesomeIcon className={`left-initial ${animate ? 'animate-left-initial' : ''}`} icon={faHandPaper} />
            <FontAwesomeIcon className={`left-secondary ${animate ? 'animate-left-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <div className={`right ${animate ? 'animate-right' : ''}`}>
            <FontAwesomeIcon className={`right-initial ${animate ? 'animate-right-initial' : ''}`} icon={faHandPaper} />
            <FontAwesomeIcon className={`right-secondary ${animate ? 'animate-right-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <FA className={`hs-ribbon ${animate ? 'animate-hs-ribbon' : ''}`} name="handshake-o" />
          <Handshake cutSide="both" className={`ribbon-results-card ${animate ? 'temp-transparent-ribbon' : ''}`} shortName={shortName} />
        </div>
      )
      }
      {isBidder &&
      (
        <div className="hs-animation-bidder">
          <div className={`left ${animate ? 'animate-left' : ''}`} >
            <FontAwesomeIcon className={`left-initial ${animate ? 'animate-left-initial' : ''}`} icon={faHandPaper} />
            <FontAwesomeIcon className={`left-secondary ${animate ? 'animate-left-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <div className={`right ${animate ? 'animate-right' : ''}`}>
            <FontAwesomeIcon className={`right-initial ${animate ? 'animate-right-initial' : ''}`} icon={faHandPaper} />
            <FontAwesomeIcon className={`right-secondary ${animate ? 'animate-right-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <FA className={`hs-bidder ${animate ? 'animate-hs-bidder' : ''}`} name="handshake-o" />
        </div>
      )
      }
    </InteractiveElement>
  );
};


HandshakeAnimation.propTypes = {
  isBidTracker: PropTypes.bool,
  isRibbon: PropTypes.bool,
  isBidder: PropTypes.bool,
  shortName: PropTypes.bool,
};

HandshakeAnimation.defaultProps = {
  isBidTracker: false,
  isRibbon: false,
  isBidder: false,
  shortName: false,
};

export default HandshakeAnimation;
