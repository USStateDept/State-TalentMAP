import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Cusp = ({ shortName, ...props }) => {
  const text = shortName ? 'HTF' : 'Cusp';
  return (
    <Ribbon icon="line-chart" text={text} type="htf" {...props} />
  );
};

Cusp.propTypes = {
  shortName: PropTypes.bool,
};

Cusp.defaultProps = {
  shortName: false,
};

export default Cusp;
