import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  const { remark, isEditable, updateSelection, fromAIM } = props;

  const getRemarkText = (r) => {
    const refInserts = get(r, 'remark_inserts') || [];
    let remarkText = get(r, 'text') || '';

    refInserts.forEach(refInsert => {
      if (r.ari_insertions[get(refInsert, 'riseqnum')]) {
        remarkText = remarkText.replace(get(refInsert, 'riinsertiontext'), r.ari_insertions[get(refInsert, 'riseqnum')]);
      }
    });

    return remarkText;
  };

  return (
    <div className={`remarks-pill remark-category--${get(remark, 'rc_code')}`}>
      {
        fromAIM ?
          getRemarkText(remark)
          :
          get(remark, 'text')
      }
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
    remark_inserts: PropTypes.arrayOf(
      PropTypes.shape({
        rirmrkseqnum: PropTypes.number,
        riseqnum: PropTypes.number,
        riinsertiontext: PropTypes.string,
      }),
    ),
    ari_insertions: PropTypes.shape({}),
  }),
  isEditable: PropTypes.bool,
  updateSelection: PropTypes.func,
  fromAIM: PropTypes.bool,
};

RemarksPill.defaultProps = {
  remark: {},
  isEditable: false,
  updateSelection: EMPTY_FUNCTION,
  fromAIM: false,
};

export default RemarksPill;
