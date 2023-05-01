import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { find } from 'lodash';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const RemarksPill = props => {
  const { remark, isEditable, updateSelection, fromAIM } = props;

  const getRemarkText = (r) => {
    // we can just grab the already merged text from the BE, but it would mean
    // we have to distinguish from the read/create RemarksGlossary renders
    const refInserts = r?.remark_inserts || [];
    let remarkText = r?.ref_text || '';

    /* eslint-disable no-console */
    console.log('👻👻👻👻👻👻👻👻👻👻👻');
    console.log('👻 current: r:', r);
    console.log('👻 current: remarkText:', remarkText);
    // this r works
    // {
    //     "seq_num": 88,
    //     "rc_code": "B",
    //     "order_num": 3,
    //     "short_desc_text": "Spec class no.",
    //     "mutually_exclusive_ind": "N",
    //     "text": "{#} Specialist Orientation Class",
    //     "active_ind": "Y",
    //     "remark_inserts": [
    //         {
    //             "riseqnum": 127,
    //             "rirmrkseqnum": 88,
    //             "riinsertiontext": "{#}"
    //         }
    //     ],
    //     "ref_text": null,
    //     "ari_insertions": {
    //         "127": "666"
    //     }
    // }
    // this one does not:
    // {
    //     "seq_num": 225,
    //     "rc_code": "P",
    //     "order_num": 11,
    //     "short_desc_text": "Senior cede",
    //     "mutually_exclusive_ind": "N",
    //     "text": "LWOP Committee approved on  09/29/04, criterion 5",
    //     "active_ind": "Y",
    //     "remark_inserts": [
    //         {
    //             "riseqnum": 192,
    //             "rirmrkseqnum": 225,
    //             "riinsertiontext": "{number}"
    //         },
    //         {
    //             "riseqnum": 193,
    //             "rirmrkseqnum": 225,
    //             "riinsertiontext": "{date}"
    //         }
    //     ],
    //     "ref_text": "LWOP Committee approved on {date}, criterion {number}"
    // }

    console.log('👻 current: r?.user_remark_inserts:', r?.user_remark_inserts);
    refInserts.forEach(refInsert => {
      console.log('👻 current: refInsert:', refInsert);
      console.log('👻 current: find(r?.user_remark_inserts, { aiririseqnum: refInsert?.riseqnum }):', find(r?.user_remark_inserts, { aiririseqnum: refInsert?.riseqnum }));

      // eslint-disable-next-line max-len
      remarkText = remarkText.replace(refInsert?.riinsertiontext, find(r?.user_remark_inserts, { aiririseqnum: refInsert?.riseqnum })?.airiinsertiontext);
      // if (r.ari_insertions[refInsert?.riseqnum]) {
      //   remarkText =
      //     remarkText.replace(refInsert?.riinsertiontext, r.ari_insertions[refInsert?.riseqnum]);
      // }
    });

    console.log('👻👻👻👻👻👻👻👻👻👻👻');
    return remarkText;
  };

  return (
    <div className={`remarks-pill remark-category--${remark?.rc_code}`}>
      {
        fromAIM ?
          getRemarkText(remark)
          :
          remark?.text
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
