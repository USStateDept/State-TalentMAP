import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const CriticalNeed = ({ shortName, ...props }) => {
  const text = shortName ? 'CN' : 'Critical need';
  return (
    <Ribbon icon="exclamation" text={text} type="cn" {...props} />
  );
};

CriticalNeed.propTypes = {
  shortName: PropTypes.bool,
};

CriticalNeed.defaultProps = {
  shortName: false,
};

export default CriticalNeed;
