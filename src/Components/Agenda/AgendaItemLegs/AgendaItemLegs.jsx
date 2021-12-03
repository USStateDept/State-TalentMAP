/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { filter, get, keys } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';

const AgendaItemLegs = props => {
  const {
    fakeLegs,
    isCard,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  // working assumption: by the time fakeLegs hits this
  // component its structure is already 2 legs for card and all for row
  const formatStr = (d) => shortenString(d, 12);
  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';

  const getData = (key, helperFunc) => (
      <>
      {
        fakeLegs.map((leg) => <td>
          <dd>{helperFunc(leg[key])}</dd>
        </td>)
      }
      </>
  );

  const getArrows = () => (
    <>
      {
        fakeLegs.map(() => <td className="d">
          <dd>
            <FA name="arrow-down" />
          </dd>
        </td>)
      }
    </>
  );

  const tableData = [
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
      icon: 'hourglass-end',
      title: 'TOD',
      cardView: false,
    },
    {
      icon: 'university',
      title: 'Grade',
      cardView: false,
    },
    {
      icon: 'book',
      title: 'Position Title',
      cardView: false,
    },
    {
      icon: '',
      title: 'Position Number',
      cardView: false,
    },
    {
      icon: 'check-circle',
      title: 'Action',
      cardView: false,
    },
    {
      icon: 'plane',
      title: 'Travel',
      cardView: false,
    },
  ];

  const tableData$ = isCard ? filter(tableData, 'cardView') : tableData;

  return (
    <div className="ai-history-card-legs">
      <table className="c">
        <tbody >
          {
            tableData$.map(tr => {
              return (
                <tr>
                  <td>
                    <FA name={tr.icon} />
                  </td>
                  <th>
                    <dt>{tr.title}</dt>
                  </th>
                  {tr.content}
              </tr>
              );
            })
          }
        </tbody>
      </table>
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
