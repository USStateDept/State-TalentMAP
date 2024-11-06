import PropTypes from 'prop-types';
import Ribbon from '../Ribbon';

const RWADetoRibbon = ({ shortName, ...props }) => {
  const text = shortName ? 'RWA' : 'RWA/DETO';
  // The type prop is used by the CSS to determine the color of the ribbon in src/sass/_ribbon.scss
  return (
    <Ribbon icon="laptop" text={text} type="availTeleworkPos" {...props} />
  );
};

RWADetoRibbon.propTypes = {
  shortName: PropTypes.bool,
};

RWADetoRibbon.defaultProps = {
  shortName: false,
};

export default RWADetoRibbon;
