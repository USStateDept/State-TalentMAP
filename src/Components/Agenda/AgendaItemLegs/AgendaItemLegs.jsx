import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { filter } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';
import RemarksPill from '../RemarksPill';

const AgendaItemLegs = props => {
  const {
    fakeLegs,
    isCard,
  } = props;

  const strLimit = isCard ? 15 : 50;
  const formatStr = (d) => shortenString(d, strLimit);
  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';

  const getData = (key, helperFunc) => (
    <>
      {
        fakeLegs.map((leg) => (<td>
          {
            helperFunc ?
              <dd>{helperFunc(leg[key])}</dd>
              :
              <dd>{leg[key]}</dd>

          }
        </td>))
      }
    </>
  );

  const getArrows = () => (
    <>
      {
        fakeLegs.map(() => (<td className="arrow">
          <dd>
            <FA name="arrow-down" />
          </dd>
        </td>))
      }
    </>
  );

  const tableData = [
    {
      icon: '',
      title: 'Position Title',
      content: (getData('position', formatStr)),
      cardView: false,
    },
    {
      icon: '',
      title: 'Position Number',
      content: (getData('posNum')),
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

  const fakeRemarks = [
    {
      text: 'Opts for SND',
      color: '#F07011',
      key: 1,
    },
    {
      text: 'Decline SND',
      color: '#F07011',
      key: 2,
    },
    {
      text: 'Tandem, No Issues',
      color: '#4BB6CF',
      key: 3,
    },
    {
      text: 'High Differential Post',
      color: '#6E2CC9',
      key: 4,
    },
    {
      text: 'Early Handshake',
      color: '#E62CD5',
      key: 5,
    },
  ];

  return (
    <div className="ai-history-card-legs">
      <table>
        <tbody >
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
            fakeRemarks.map(fakeRemark => (
              <RemarksPill key={fakeRemark.key} {...fakeRemark} />
            ))
          }
        </div>
      }
    </div>
  );
};

AgendaItemLegs.propTypes = {
  fakeLegs: PropTypes.arrayOf(PropTypes.shape({})),
  isCard: PropTypes.Boolean,
};


AgendaItemLegs.defaultProps = {
  fakeLegs: [],
  isCard: false,
};

export default AgendaItemLegs;
