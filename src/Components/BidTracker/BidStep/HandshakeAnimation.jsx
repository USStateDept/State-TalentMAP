import { useEffect, useMemo, useState } from 'react';
import FA from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { throttle } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import { Handshake } from 'Components/Ribbon';
import PropTypes from 'prop-types';

const HandshakeAnimation = ({ isBidTracker, isRibbon, isBidder, triggerAnimation }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 4000);
    }
  }, [animate]);

  const animateHands = () => {
    setAnimate(true);
  };

  useEffect(() => {
    if (triggerAnimation) {
      animateHands();
    }
  }, [triggerAnimation]);

  const throttledEventHandler = useMemo(
    () => throttle(animateHands, 4000),
    [setAnimate]);

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
        <div className="hs-animation-ribbon">
          <div className={`left ${animate ? 'animate-left' : ''}`} >
            <FA className={`left-initial ${animate ? 'animate-left-initial' : ''}`} name="hand-paper-o" />
            <FontAwesomeIcon className={`left-secondary ${animate ? 'animate-left-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <div className={`right ${animate ? 'animate-right' : ''}`}>
            <FA className={`right-initial ${animate ? 'animate-right-initial' : ''}`} name="hand-paper-o" />
            <FontAwesomeIcon className={`right-secondary ${animate ? 'animate-right-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <FA className={`hs-ribbon ${animate ? 'animate-hs-ribbon' : ''}`} name="handshake-o" />
          <Handshake isWide cutSide="both" className={`ribbon-results-card ${animate ? 'temp-transparent-ribbon' : ''}`} />
        </div>
      )
      }
      {isBidder &&
      (
        <div className="hs-animation-bidder">
          <div className={`left ${animate ? 'animate-left' : ''}`} >
            <FA className={`left-initial ${animate ? 'animate-left-initial' : ''}`} name="hand-paper-o" />
            <FontAwesomeIcon className={`left-secondary ${animate ? 'animate-left-secondary' : ''}`} icon={faHandPaper} />
          </div>
          <div className={`right ${animate ? 'animate-right' : ''}`}>
            <FA className={`right-initial ${animate ? 'animate-right-initial' : ''}`} name="hand-paper-o" />
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
  triggerAnimation: PropTypes.bool,
};

HandshakeAnimation.defaultProps = {
  isBidTracker: false,
  isRibbon: false,
  isBidder: false,
  triggerAnimation: false,
};

export default HandshakeAnimation;
