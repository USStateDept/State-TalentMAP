import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const CriticalNeed = ({ condensed, ...props }) => {
  const text = condensed ? 'CN' : 'Critical need';
  return (
    <Ribbon icon="exclamation" text={text} type="cn" {...props} />
  );
};

CriticalNeed.propTypes = {
  condensed: PropTypes.bool,
};

CriticalNeed.defaultProps = {
  condensed: false,
};

export default CriticalNeed;
