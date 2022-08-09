import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  // TODO - make use of colors?
  const { remark, isEditable, updateSelection } = props;
  const remarkPillText = remark.text ? remark.text : remark.title;
  const remarkPillColor = remark.rc_code ? remark.rc_code : 'default';

  return (
    <div className={`remarks-pill remark-category--${remarkPillColor}`}>
      {remarkPillText}
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
    mutually_exclusive_ind: PropTypes.string,
    text: PropTypes.string,
    active_ind: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
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
