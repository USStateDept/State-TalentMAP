import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const ServiceNeedDifferential = ({ condensed, compare, shortName, ...props }) => {
  const text = shortName ? 'SND' : 'Service need differential';
  // let text = 'Service need differential';
  // if (condensed) {
  //   text = '';
  // }
  // if (compare) {
  //   text = 'SND';
  // }
  return (
    <Ribbon icon="line-chart" text={text} type="snd" {...props} />
  );
};

ServiceNeedDifferential.propTypes = {
  condensed: PropTypes.bool,
  compare: PropTypes.bool,
  shortName: PropTypes.bool,
};

ServiceNeedDifferential.defaultProps = {
  condensed: false,
  compare: false,
  shortName: false,
};

export default ServiceNeedDifferential;
