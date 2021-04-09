import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const ServiceNeedDifferential = ({ condensed, compare, ...props }) => {
  let text = 'Service need differential';
  if (condensed) {
    text = '';
  }
  if (compare) {
    text = 'SND';
  }
  return (
    <Ribbon icon="line-chart" text={text} type="snd" {...props} />
  );
};

ServiceNeedDifferential.propTypes = {
  condensed: PropTypes.bool,
  compare: PropTypes.bool,
};

ServiceNeedDifferential.defaultProps = {
  condensed: false,
  compare: false,
};

export default ServiceNeedDifferential;
