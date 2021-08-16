/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { throttle } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';

const HandshakeAnimation = () => {
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
    () => throttle(animateHands, 4000)
    , [setAnimate]);

  return (
    <InteractiveElement onMouseOver={throttledEventHandler}>
      <div className="handshake-animation-container">
        <FontAwesomeIcon className={`a ${animate ? 'animate-a' : ''}`} icon={faHandPaper} />
        <FontAwesomeIcon className={`b ${animate ? 'animate-b' : ''}`} icon={faHandPaper} />
        <div className="idk" >
          <FontAwesomeIcon className={`c ${animate ? 'animate-c' : ''}`} icon={faHandshake} />
        </div>
      </div>
    </InteractiveElement>
  );
};


HandshakeAnimation.propTypes = {
};

HandshakeAnimation.defaultProps = {
};

export default HandshakeAnimation;
