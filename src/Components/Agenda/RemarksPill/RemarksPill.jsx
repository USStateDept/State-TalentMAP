import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  const { remark, isEditable, updateSelection } = props;

  return (
    <div className={`remarks-pill remark-category--${remark.rc_code}`}>
      {remark.text}
      { isEditable &&
        <FA name="times" onClick={() => updateSelection(remark)} />
      }
    </div>
  );
};

RemarksPill.propTypes = {
  remark: PropTypes.shape({
    seq_num: PropTypes.number,
    rc_code: PropTypes.string,
    order_num: PropTypes.number,
    short_desc_text: PropTypes.string,
    ari_insertions: PropTypes.arrayOf(
      PropTypes.shape({
        ri_seq_num: PropTypes.number,
        ari_insertion_text: PropTypes.string,
      }),
    ),
    mutually_exclusive_ind: PropTypes.string,
    text: PropTypes.string,
    active_ind: PropTypes.string,
    type: null,
  }),
  isEditable: PropTypes.bool,
  updateSelection: PropTypes.func,
};

RemarksPill.defaultProps = {
  remark: {},
  isEditable: false,
  updateSelection: EMPTY_FUNCTION,
};

export default RemarksPill;
