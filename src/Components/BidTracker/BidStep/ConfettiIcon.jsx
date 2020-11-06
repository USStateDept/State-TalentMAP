import { Component } from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-dom-confetti';
import { isArray, throttle } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';

const THROTTLE_DURATION = 3000;
const ANIMATION_DURATION = 3000;

class ConfettiIcon extends Component {
  constructor(props) {
    super(props);
    this.celebrate = throttle(
      this.celebrate.bind(this),
      THROTTLE_DURATION,
      { trailing: true, leading: true },
    );
    this.state = {
      isPartyTime: false,
    };
  }
  celebrate() {
    this.setState({
      isPartyTime: true,
    }, () => {
      setTimeout(() => {
        this.setState({ isPartyTime: false });
      }, 0);
    });
  }
  render() {
    const { isPartyTime } = this.state;
    const { children, colors } = this.props;
    const config = {
      angle: 90,
      spread: 45,
      startVelocity: '30',
      elementCount: 50,
      dragFriction: 0.1,
      duration: `${ANIMATION_DURATION}`,
      stagger: 2,
      width: '10px',
      height: '10px',
      colors: ['#0071BC', '#205493', '#9BDAF1', '#FAD980', '#E31C3D'],
    };
    if (colors && isArray(colors) && colors.length > 1) {
      config.colors = colors;
    }
    return (
      <InteractiveElement onMouseOver={this.celebrate}>
        <div className="confetti-container">
          <Confetti active={isPartyTime} config={config} />
        </div>
        {children}
      </InteractiveElement>
    );
  }
}

ConfettiIcon.propTypes = {
  children: PropTypes.node.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

ConfettiIcon.defaultProps = {
  colors: [],
};

export default ConfettiIcon;
