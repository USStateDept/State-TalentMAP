import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const RemarksPill = props => {
  // TODO - make use of colors?
  const { /* color, */ remark, isEditable, updateSelection } = props;


  return (
    <div className="remarks-pill" style={{ backgroundColor: '#0071bc' }}>
      {remark.text}
      { isEditable &&
        <FA name="times" onClick={() => updateSelection(remark)} />
      }
    </div>
  );
};

RemarksPill.propTypes = {
  remark: PropTypes.string,
  // color: PropTypes.string,
  isEditable: PropTypes.bool,
  updateSelection: PropTypes.func,
};

RemarksPill.defaultProps = {
  remark: '',
  // color: '#513C2C',
  isEditable: false,
  updateSelection: EMPTY_FUNCTION,
};

export default RemarksPill;
