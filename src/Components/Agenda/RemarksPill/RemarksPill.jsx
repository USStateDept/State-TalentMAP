import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { find } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  const { remark, isEditable, updateSelection, fromAIM } = props;

  const formatRemarkText = (r) => {
    // we can just grab the already merged text from the BE, but it would mean
    // we have to distinguish from the read/create RemarksGlossary renders
    const refInserts = r?.remark_inserts || [];
    let remarkText = r?.ref_text || '';

    refInserts.forEach(refInsert => {
      remarkText = remarkText.replace(
        refInsert?.riinsertiontext,
        find(r?.user_remark_inserts, { aiririseqnum: refInsert?.riseqnum })?.airiinsertiontext);
    });

    return r?.active_ind === 'N' ? `(Legacy) ${remarkText}` : remarkText;
  };

  const getRemarkText = (r) => r?.active_ind === 'N' ? `(Legacy) ${r?.air_remark_text}` : r?.air_remark_text;

  return (
    <div className={`remarks-pill remark-category--${remark?.rc_code}`}>
      {
        fromAIM ?
          formatRemarkText(remark)
          :
          getRemarkText(remark)
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
    text: PropTypes.string,
    active_ind: PropTypes.string,
    remark_inserts: PropTypes.arrayOf(
      PropTypes.shape({
        rirmrkseqnum: PropTypes.number,
        riseqnum: PropTypes.number,
        riinsertiontext: PropTypes.string,
      }),
    ),
    air_remark_text: PropTypes.string,
    air_insertions: PropTypes.shape({}),
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
