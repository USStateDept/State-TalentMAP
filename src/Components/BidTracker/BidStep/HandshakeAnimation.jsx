import { useEffect, useMemo, useState } from 'react';
import FA from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { throttle } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import { Handshake } from 'Components/Ribbon';
import PropTypes from 'prop-types';

const HandshakeAnimation = ({ isBidTracker, isOne, isTwo }) => {
  const [animate, setAnimate] = useState(false);

  const animateHands = () => {
    setAnimate(true);
  };

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 4000);
    }
  }, [animate]);

  const throttledEventHandler = useMemo(
    () => throttle(animateHands, 4000),
    [setAnimate]);

  return (
    <InteractiveElement onMouseOver={throttledEventHandler} onFocus={throttledEventHandler}>
      {isBidTracker &&
      (
        <div className="handshake-animation-container">
          <FontAwesomeIcon className={`left-hand ${animate ? 'animate-left' : ''}`} icon={faHandPaper} />
          <FontAwesomeIcon className={`right-hand ${animate ? 'animate-right' : ''}`} icon={faHandPaper} />
          <div className={`hs-container ${animate ? 'temp-transparent' : ''}`}>
            <FontAwesomeIcon className={`hs ${animate ? 'animate-hs' : ''}`} icon={faHandshake} />
          </div>
        </div>
      )
      }
      {isOne &&
      (
        <div className="handshake-animation-ribbon-container">
          <Handshake isWide cutSide="both" className={`ribbon-results-card ${animate ? 'temp-transparent-ribbon' : ''}`} />
          <FontAwesomeIcon className={`left-hand-ribbon ${animate ? 'animate-left-ribbon' : ''}`} icon={faHandPaper} />
          <FontAwesomeIcon className={`right-hand-ribbon ${animate ? 'animate-right-ribbon' : ''}`} icon={faHandPaper} />
          <FA className={`hs-ribbon ${animate ? 'animate-hs-ribbon' : ''}`} name="handshake-o" />
        </div>
      )
      }
      {isTwo &&
      (
        <div className="handshake-animation-two-container">
          <div className={`hi ${animate ? 'animate-hi' : ''}`} >
            <FA className={`left-hand-two-a ${animate ? 'animate-left-two-a' : ''}`} name="hand-paper-o" />
            <FontAwesomeIcon className={`left-hand-two-b ${animate ? 'animate-left-two-b' : ''}`} icon={faHandPaper} />
          </div>
          <div className={`hello ${animate ? 'animate-hello' : ''}`}>
            <FA className={`right-hand-two-a ${animate ? 'animate-right-two-a' : ''}`} name="hand-paper-o" />
            <FontAwesomeIcon className={`right-hand-two-b ${animate ? 'animate-right-two-b' : ''}`} icon={faHandPaper} />
          </div>
          <FA className={`hs-two ${animate ? 'animate-hs-two' : ''}`} name="handshake-o" />
        </div>
      )
      }
    </InteractiveElement>
  );
};


HandshakeAnimation.propTypes = {
  isBidTracker: PropTypes.bool,
  isOne: PropTypes.bool,
  isTwo: PropTypes.bool,
};

HandshakeAnimation.defaultProps = {
  isBidTracker: false,
  isOne: false,
  isTwo: false,
};

export default HandshakeAnimation;
