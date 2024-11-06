import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const IsCritNeed = ({ shortName, ...props }) => {
  const text = shortName ? 'CN' : 'Critical Need';
  return (
    <Ribbon icon="exclamation-circle" text={text} type="cn" {...props} />
  );
};

IsCritNeed.propTypes = {
  shortName: PropTypes.bool,
};

IsCritNeed.defaultProps = {
  shortName: false,
};

export default IsCritNeed;
