import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const HistDiffToStaff = ({ shortName, ...props }) => {
  const text = shortName ? 'HDS' : 'Hist. Diff. to Staff';
  return (
    <Ribbon icon="bolt" text={text} type="hds" {...props} />
  );
};

HistDiffToStaff.propTypes = {
  shortName: PropTypes.bool,
};

HistDiffToStaff.defaultProps = {
  shortName: false,
};

export default HistDiffToStaff;
