import { useState } from 'react';
import PropTypes from 'prop-types';
import { shortenString } from 'utilities';
import { get } from 'lodash';
import { format, isDate } from 'date-fns-v2';
import FA from 'react-fontawesome';

const AgendaItemLegs = props => {
  const {
    fakeData,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  const curOrg = shortenString(get(fakeData[0], 'org'), 12);
  const onWrdOrg = shortenString(get(fakeData[3], 'org'), 12);
  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';
  return (
    <div className="ai-history-card-legs">
      <table className="c">
        <tbody >
          <tr>
            <td>
              <FA name="building-o" />
            </td>
            <th>
              <dt>Org</dt>
            </th>
            <td>
              <dd>{curOrg}</dd>
            </td>
            <td>
              <dd>{onWrdOrg}</dd>
            </td>
          </tr>
          <tr>
            <td>
              <FA name="paper-plane-o" />
            </td>
            <th>
              <dt>ETA</dt>
            </th>
            <td>
              <dd>{formatDate(fakeData[0].eta)}</dd>
            </td>
            <td>
              <dd>{formatDate(fakeData[3].eta)}</dd>
            </td>
          </tr>
          <tr>
            <td />
            <td />
            <td className="d">
              <dd>
                <FA name="arrow-down" />
              </dd>
            </td>
            <td className="d">
              <dd>
                <FA name="arrow-down" />
              </dd>
            </td>
          </tr>
          <tr>
            <td>
              <FA name="clock-o" />
            </td>
            <th>
              <dt>TED/SEP</dt>
            </th>
            <td>
              <dd>{formatDate(fakeData[0].ted)}</dd>
            </td>
            <td>
              <dd>{formatDate(fakeData[3].ted)}</dd>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AgendaItemLegs.propTypes = {
  fakeData: PropTypes.arrayOf(PropTypes.shape({})),
};


AgendaItemLegs.defaultProps = {
  fakeData: [],
};

export default AgendaItemLegs;
