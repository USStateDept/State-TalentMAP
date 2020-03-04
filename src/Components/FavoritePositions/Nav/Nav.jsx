import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import NavItem from './NavItem';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || get(props, 'options[0].title'),
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onClick = selected => {
    const { onClick } = this.props;
    this.setState({ selected }, () => onClick(selected));
  };

  render() {
    const { denominator, options } = this.props;
    return (
      <div className="usa-grid-full portfolio-top-nav-container">
        {options.map((m) => {
          const isActive = m.value === this.state.selected;
          return (
            <NavItem
              key={m.title}
              title={m.title}
              value={m.value}
              numerator={m.numerator}
              denominator={denominator}
              isActive={isActive}
              onClick={this.onClick}
            />
          );
        })}
      </div>
    );
  }
}

Nav.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      numerator: PropTypes.number.isRequired,
    }),
  ),
  denominator: PropTypes.number.isRequired,
  selected: PropTypes.string,
  onClick: PropTypes.func,
};

Nav.defaultProps = {
  options: [],
  denominator: 1,
  selected: '',
  onClick: EMPTY_FUNCTION,
};

export default Nav;
