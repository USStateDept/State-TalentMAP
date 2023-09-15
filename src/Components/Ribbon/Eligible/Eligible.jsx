import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const Eligible = ({ shortName, ...props }) => {
  const text = shortName ? 'HTF' : 'Eligible';
  return (
    <Ribbon icon="line-chart" text={text} type="htf" {...props} />
  );
};

Eligible.propTypes = {
  shortName: PropTypes.bool,
};

Eligible.defaultProps = {
  shortName: false,
};

export default Eligible;
