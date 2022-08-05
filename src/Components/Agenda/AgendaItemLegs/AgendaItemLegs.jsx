/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { filter, take, takeRight } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';
import RemarksPill from '../RemarksPill';

const AgendaItemLegs = props => {
  const {
    legs,
    remarks,
    isCard,
  } = props;

  let legs$ = legs;

  if (isCard && legs.length > 2) {
    legs$ = [take(legs)[0], takeRight(legs)[0]];
  }
  const strLimit = isCard ? 15 : 50;
  const formatStr = (d) => shortenString(d, strLimit);

  // TO-DO - better date checking. isDate() with null or bad string not guaranteed to work.
  const formatDate = (d) => d && isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';

  const getData = (key, helperFunc) => (
    <>
      {
        legs$.map((leg) =>
          (<td>
            {
              helperFunc ?
                <dd>{helperFunc(leg[key])}</dd>
                :
                <dd>{leg[key]}</dd>
            }
          </td>),
        )
      }
    </>
  );

  const getArrows = () => (
    <>
      {
        legs$.map(() => (<td className="arrow">
          <FA name="arrow-down" />
        </td>))
      }
    </>
  );

  const tableData = [
    {
      icon: '',
      title: 'Position Title',
      content: (getData('pos_title', formatStr)),
      cardView: false,
    },
    {
      icon: '',
      title: 'Position Number',
      content: (getData('pos_num')),
      cardView: false,
    },
    {
      icon: 'building-o',
      title: 'Org',
      content: (getData('org', formatStr)),
      cardView: true,
    },
    {
      icon: 'paper-plane-o',
      title: 'ETA',
      content: (getData('eta', formatDate)),
      cardView: true,
    },
    {
      icon: '',
      title: '',
      content: (getArrows()),
      cardView: true,
    },
    {
      icon: 'clock-o',
      title: 'TED',
      content: (getData('ted', formatDate)),
      cardView: true,
    },
    {
      icon: '',
      title: 'TOD',
      content: (getData('tod')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Grade',
      content: (getData('grade')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Action',
      content: (getData('action')),
      cardView: false,
    },
    {
      icon: '',
      title: 'Travel',
      content: (getData('travel')),
      cardView: false,
    },
  ];

  const tableData$ = isCard ? filter(tableData, 'cardView') : tableData;

  const remarks$ = [
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 7,
      rc_code: 'B',
      seq_num: 2,
      short_desc_text: 'Promo Bd Recognized',
      text: 'Potential recognized by last promo board',
    },
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'Y',
      order_num: 8,
      rc_code: 'S',
      seq_num: 14,
      short_desc_text: 'Extend Stretch',
      text: 'Extension in Stretch',
    },
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'N',
      order_num: 3,
      rc_code: 'R',
      seq_num: 22,
      short_desc_text: 'No Repayment',
      text: 'No Repayment Issues',
    },
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'Y',
      order_num: 4,
      rc_code: 'I',
      seq_num: 28,
      short_desc_text: 'No Tandem issues',
      text: 'Tandem:  No issues',
    },
    {
      active_ind: 'Y',
      mutually_exclusive_ind: 'Y',
      order_num: 2,
      rc_code: 'L',
      seq_num: 40,
      short_desc_text: 'DCM Lang. Waiver',
      text: 'Language Requirement Waived by DCM Committee',
    },
  ];

  // console.log('ail remarks', remarks);

  return (
    <div className="ai-history-card-legs">
      <table>
        <tbody>
          {
            tableData$.map(tr => (
              <tr>
                <td>
                  <FA name={tr.icon} />
                </td>
                <th>
                  <dt>{tr.title}</dt>
                </th>
                {tr.content}
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        !isCard &&
        <div className="remarks-container">
          <div className="remarks-text">Remarks:</div>
          {
            remarks$.map(remark => (
              <RemarksPill key={remark.text} remark={remark} />
            ))
          }
        </div>
      }
    </div>
  );
};

AgendaItemLegs.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  remarks: PropTypes.arrayOf(PropTypes.shape({})),
  isCard: PropTypes.bool,
};

AgendaItemLegs.defaultProps = {
  legs: [],
  remarks: [],
  isCard: false,
};

export default AgendaItemLegs;
