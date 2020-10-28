import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const StartEnd = ({ start, end }) => (
  (start && end) ?
    <div className="start-end">
      {start} <FontAwesome name="arrow-right" /> {end}
    </div>
    : null
);

StartEnd.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default StartEnd;
