import PropTypes from 'prop-types';

const RemarksPill = props => {
  const { color, text } = props;
  return (
    <div className="remarks-pill" style={{ backgroundColor: color }}>
      {text}
    </div>
  );
};

RemarksPill.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

RemarksPill.defaultProps = {
  text: '',
  color: '',
};

export default RemarksPill;
