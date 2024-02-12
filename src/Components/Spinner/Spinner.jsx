import PropTypes from 'prop-types';

import center from '../../assets/spinner/center.svg';
import middle from '../../assets/spinner/middle.svg';
import outer from '../../assets/spinner/outer.svg';

const Spinner = ({ type, size, style }) => {
  let sizeClass = '';
  switch (size) {
    case ('small'):
      sizeClass = 'tm-spinner-small';
      break;
    case ('medium'):
      sizeClass = 'tm-spinner-medium';
      break;
    default:
      break;
  }
  return (
    <div className={`tm-spinner tm-spinner-${type} ${sizeClass}`} style={style}>
      <img className="center" alt="center" src={center} />
      <img className="middle" alt="middle" src={middle} />
      <img className="outer" alt="outer" src={outer} />
    </div>
  );
};

Spinner.propTypes = {
  type: PropTypes.string, // user defined classes stored elsewhere using "tm-spinner-" as a prefix
  size: PropTypes.oneOf(['big', 'medium', 'small']),
  style: PropTypes.shape({}),
};

Spinner.defaultProps = {
  type: '',
  size: 'big',
  style: {},
};

export default Spinner;
