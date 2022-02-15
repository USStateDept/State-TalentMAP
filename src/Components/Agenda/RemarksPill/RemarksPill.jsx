import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const RemarksPill = props => {
  // TODO - make use of colors?
  const { color, title, isEditable } = props; // eslint-disable-line
  return (
    <div className="remarks-pill" style={{ backgroundColor: '#0071bc' }}>
      {title}
      { isEditable &&
        <FA name="times" />
      }
    </div>
  );
};

RemarksPill.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  isEditable: PropTypes.bool,
};

RemarksPill.defaultProps = {
  title: '',
  color: '#513C2C',
  isEditable: false,
};

export default RemarksPill;
