import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get, isEmpty } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  const { remark, isEditable, updateSelection } = props;

  const getRemarkText = (r) => {
    if (!isEmpty(r)) {
      let rText = get(r, 'text');
      rText = rText.split(' ');

      // const regex = /({.*})/g;
      // let regNum = 0;
      // rText.forEach((a, i) => {
      //   if (a.match(regex)) {
      //     const riSeqNum = r.remark_inserts[regNum].riseqnum;
      //     rText.splice(i, 1, r.ari_insertions[riSeqNum]);
      //     regNum += 1;
      //   }
      // });

      return rText.join(' ');
    }
    return '';
  };

  return (
    <div className={`remarks-pill remark-category--${remark.rc_code}`}>
      {getRemarkText(remark)}
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
    remark_inserts: PropTypes.arrayOf(
      PropTypes.shape({
        rirmrkseqnum: PropTypes.number,
        riseqnum: PropTypes.number,
        riinsertiontext: PropTypes.string,
      }),
    ),
    ari_insertions: PropTypes.shape({}),
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
