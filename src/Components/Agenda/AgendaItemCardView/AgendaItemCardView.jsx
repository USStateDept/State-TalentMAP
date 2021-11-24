import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import InteractiveElement from 'Components/InteractiveElement';
import { format, isDate } from 'date-fns-v2';
import { shortenString } from '../../../utilities';

const AgendaItemCardView = props => {
  const {
    result,
    adder,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  const fD = {
    currentPosition: 'PUBLIC DIPLOMACY sdkjbkjshdfb jdshf ',
    onwardPosition: 'INFO MANAGENT ksdbkjhsdb jhsd f',
    pillColors: [
      '#227c9dff',
      '#17c3b2ff',
      '#E08A00',
      '#2d6e0eff',
      '#ed2038ff',
      '#6421a2ff',
      '#BA70FF'],
    pillStats: [
      'Withdrawn',
      'Approved',
      'Withdrawn',
      'Withdrawn',
      'Disapproved',
      'Approved',
      'Withdrawn'],
    panelDate: '8/3/2021',
    currentOrg: 'PARIS lorem ipsum lorem ipsum',
    onwardOrg: 'BELGRADE lorem ipsum lorem ipsum',
    currentEta: '1/15/18',
    onwardEta: '9/22/20',
    currentTed: '9/5/20',
    onwardTed: '12/17/22',
  };
  const randomColor = fD.pillColors[Math.floor(Math.random() * fD.pillColors.length)];
  const randomStat = fD.pillStats[Math.floor(Math.random() * fD.pillStats.length)];


  const curPos = shortenString(get(fD, 'currentPosition'), 15);
  const onWrdPos = shortenString(get(fD, 'onwardPosition'), 15);
  const curOrg = shortenString(get(fD, 'currentOrg'), 12);
  const onWrdOrg = shortenString(get(fD, 'onwardOrg'), 12);
  const formatDate = (d) => isDate(new Date(d)) ? format(new Date(d), 'MM/yy') : '';


  // eslint-disable-next-line no-console
  const fakeClick = () => { console.log('so fake'); };
  return (
    <>
      {
        adder &&
          <div className="ai-history-card a">
            <div className="plusIcon">
              {/* <FA name="plus" /> */}
              {/* <FA name="plus-square" /> */}
              <InteractiveElement onClick={() => fakeClick()}>
                <FA name="plus-circle" />
              </InteractiveElement>
            </div>
          </div>
      }
      {
        !adder &&
          <div className="ai-history-card">
            <div className="ai-history-card-title">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {curPos}
              <div className="arrow">
                <div className="arrow-tail" />
                {result}
                <div className="arrow-tail" />
                <div className="arrow-right" />
              </div>
              {onWrdPos}
            </div>
            <div className="ai-history-card-status-date">
              <div className="pill ai-history-card-pill" style={{ backgroundColor: randomColor }}>
                {randomStat}
              </div>
              <div className="ai-history-card-panel-date">
                  Panel Date: {fD.panelDate}
              </div>
            </div>
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
                      <dd>{formatDate(fD.currentEta)}</dd>
                    </td>
                    <td>
                      <dd>{formatDate(fD.onwardEta)}</dd>
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
                      <dd>{formatDate(fD.currentTed)}</dd>
                    </td>
                    <td>
                      <dd>{formatDate(fD.onwardTed)}</dd>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ai-history-card-footer">
              <InteractiveElement onClick={() => fakeClick()}>
                <FA name="pencil" />
              </InteractiveElement>
            </div>
          </div>
      }
    </>
  );
};


AgendaItemCardView.propTypes = {
  result: PropTypes.number,
  adder: PropTypes.bool,
};


AgendaItemCardView.defaultProps = {
  result: 1,
  adder: false,
};

export default AgendaItemCardView;
