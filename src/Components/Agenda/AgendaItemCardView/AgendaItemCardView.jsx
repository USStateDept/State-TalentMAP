import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';

const AgendaItemCardView = props => {
  const {
    result,
    adder,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  const fD = {
    currentPosition: 'Public Diplomacy',
    onwardPosition: 'INFO MANAGENT',
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
  };
  const randomColor = fD.pillColors[Math.floor(Math.random() * fD.pillColors.length)];
  const randomStat = fD.pillStats[Math.floor(Math.random() * fD.pillStats.length)];

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
              {fD.currentPosition}
              <div className="arrow">
                <div className="arrow-tail" />
                {result}
                <div className="arrow-tail" />
                <div className="arrow-right" />
              </div>
              {fD.onwardPosition}
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
                      <dd>Paris</dd>
                    </td>
                    <td>
                      <dd>Belgrade</dd>
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
                      <dd>9/18</dd>
                    </td>
                    <td>
                      <dd>9/20</dd>
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
                      <dd>9/20</dd>
                    </td>
                    <td>
                      <dd>9/22</dd>
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
