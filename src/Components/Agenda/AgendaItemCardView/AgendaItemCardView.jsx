import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { shortenString } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemCardView = props => {
  const {
    result,
    adder,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  const fD = {
    legs: [
      {
        position: 'PUBLIC DIPLOMACY sdkjbkjshdfb jdshf ',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/18',
        ted: '9/5/20',
      },
      {
        position: 'two',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/20',
        ted: '12/17/22',
      },
      {
        position: 'another',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/18',
        ted: '9/5/20',
      },
      {
        position: 'INFO MANAGENT ksdbkjhsdb jhsd f',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/20',
        ted: '12/17/22',
      },
    ],
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


  const curPos = shortenString(get(fD, 'legs[0].position'), 15);
  const onWrdPos = shortenString(get(fD, 'legs[3].position'), 15);

  // eslint-disable-next-line no-console
  const fakeClick = () => { console.log('so fake, fd.legs', fD.legs); };
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
            <AgendaItemLegs fakeData={fD.legs} />
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
