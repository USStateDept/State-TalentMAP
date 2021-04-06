import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const ServiceNeedDifferential = ({ condensed, ...props }) => {
  const text = condensed ? 'SND' : 'Service need differential';
  return (
    <Ribbon icon="line-chart" text={text} type="snd" {...props} />
  );
};

ServiceNeedDifferential.propTypes = {
  condensed: PropTypes.bool,
};

ServiceNeedDifferential.defaultProps = {
  condensed: false,
};

export default ServiceNeedDifferential;
