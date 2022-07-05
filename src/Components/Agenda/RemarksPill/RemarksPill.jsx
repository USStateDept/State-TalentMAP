import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  // TODO - make use of colors?
  const { remark, isEditable, updateSelection } = props;


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
  remark: PropTypes.arrayOf(
    PropTypes.shape({
      seq_num: PropTypes.number,
      rc_code: PropTypes.string,
      order_num: PropTypes.number,
      short_desc_text: PropTypes.string,
      mutually_exclusive_ind: PropTypes.string,
      text: PropTypes.string,
      active_ind: PropTypes.string,
    }),
  ),
  isEditable: PropTypes.bool,
  updateSelection: PropTypes.func,
};

RemarksPill.defaultProps = {
  remark: {},
  isEditable: false,
  updateSelection: EMPTY_FUNCTION,
};

export default RemarksPill;
