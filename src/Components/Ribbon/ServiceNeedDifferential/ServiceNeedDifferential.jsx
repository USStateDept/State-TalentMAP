import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const ServiceNeedDifferential = ({ shortName, ...props }) => {
  const text = shortName ? 'SND' : 'Service need diffssssserential';
  return (
    <Ribbon icon="line-chart" text={text} type="snd" {...props} />
  );
};

ServiceNeedDifferential.propTypes = {
  shortName: PropTypes.bool,
};

ServiceNeedDifferential.defaultProps = {
  shortName: false,
};

export default ServiceNeedDifferential;
