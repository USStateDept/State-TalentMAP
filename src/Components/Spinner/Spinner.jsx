import React from 'react';
import PropTypes from 'prop-types';

import center from '../../assets/spinner/center.svg';
import middle from '../../assets/spinner/middle.svg';
import outer from '../../assets/spinner/outer.svg';

const Spinner = ({ type }) => (
  <div className={`tm-spinner tm-spinner-${type}`}>
    <img className="center" alt="center" src={center} />
    <img className="middle" alt="middle" src={middle} />
    <img className="outer" alt="outer" src={outer} />
  </div>
);

Spinner.propTypes = {
  type: PropTypes.string, // user defined classes stored elsewhere using "tm-spinner-" as a prefix
};

Spinner.defaultProps = {
  type: '',
};

export default Spinner;
