import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { throttle } from 'lodash';
import { Spring } from 'react-spring';
import FA from 'react-fontawesome';
import Linkify from 'react-linkify';
import InteractiveElement from '../../InteractiveElement';

class HoverDescription extends Component {
  constructor(props) {
    super(props);

    // Debouncing function to 260ms and binding this.
    // Used to create a delay and prevent multiple actions within a small
    // time frame from firing.
    this.toggleVisibility = throttle(this.toggleVisibility.bind(this),
      260, { leading: false, trailing: true });

    this.state = {
      expanded: false,
      cardHovered: false,
    };
  }

  toggleVisibility(shouldExpand = false) {
    this.setState({ expanded: !!shouldExpand });
  }

  toggle = () => {
    this.toggleVisibility(!this.state.expanded);
  };

  expand = () => {
    this.toggleVisibility(true);
  };

  close = () => {
    this.toggleVisibility(false);
  };

  toggleCardHovered(cardHovered = false) {
    this.setState({ cardHovered });
  }

  render() {
    const { isProjectedVacancy } = this.context;
    const { getOffsetPx, text, id } = this.props;
    const { expanded, cardHovered } = this.state;

    const getHeight = () => {
      if (expanded) {
        return getOffsetPx();
      }
      return cardHovered ? '31px' : '29px';
    };

    const height$ = getHeight();

    return (
      <Spring to={{ height: height$ }} config={{ friction: 21, tension: 175 }} >
        {
          ({ height }) =>
            (
              <div className="hover-description">
                <InteractiveElement
                  className="hover-button"
                  style={{ height }}
                  onMouseOver={this.expand}
                  onMouseLeave={this.close}
                  onClick={this.toggle}
                >
                  { !this.state.expanded && <FA name="angle-double-up" /> }
                  <Spring from={{ opacity: expanded ? 1 : 0 }}>
                    {
                      ({ opacity }) => (
                        <p style={{ opacity }}>
                          { expanded &&
                            <Linkify properties={{ target: '_blank' }}>
                              {text}
                              <Link
                                className="position-link"
                                to={`/${isProjectedVacancy ? 'vacancy' : 'details'}/${id}`}
                              >
                                View position
                              </Link>
                            </Linkify>
                          }
                        </p>
                      )
                    }
                  </Spring>
                </InteractiveElement>
              </div>
            )
        }
      </Spring>
    );
  }
}

HoverDescription.contextTypes = {
  isProjectedVacancy: PropTypes.bool,
};

HoverDescription.propTypes = {
  getOffsetPx: PropTypes.func.isRequired,
  text: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

HoverDescription.defaultProps = {
  text: '',
};

export default HoverDescription;
