import PropTypes from 'prop-types';

const RemarksPill = props => {
  // TODO - make use of colors?
  const { color, title } = props; // eslint-disable-line
  return (
    <div className="remarks-pill" style={{ backgroundColor: '#0071bc' }}>
      {title}
    </div>
  );
};

RemarksPill.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
};

RemarksPill.defaultProps = {
  title: '',
  color: '#513C2C',
};

export default RemarksPill;
