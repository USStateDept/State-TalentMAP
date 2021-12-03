import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { shortenString } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemCard = props => {
  const {
    result,
    isFirst,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);
  const fD = {
    legs: [
      {
        position: 'PUBLIC DIPLOMACY sdkjbkjshdfb jdshf ',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/16',
        ted: '9/5/18',
      },
      {
        position: 'INFO MANAGENT ksdbkjhsdb jhsd f',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '6/22/22',
        ted: '12/17/24',
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
  const onWrdPos = shortenString(get(fD, 'legs[1].position'), 15);

  // eslint-disable-next-line no-console
  const createAI = () => { console.log('placeholder create AI'); };
  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder create AI'); };
  return (
    <>
      {
        isFirst &&
          <div className="ai-history-card first-card">
            <div className="plusIcon">
              <InteractiveElement onClick={() => createAI()}>
                <FA name="plus-circle" />
              </InteractiveElement>
            </div>
          </div>
      }
      {
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
          <AgendaItemLegs fakeLegs={fD.legs} isCard />
          <div className="ai-history-footer">
            <InteractiveElement onClick={() => editAI()}>
              <FA name="pencil" />
            </InteractiveElement>
          </div>
        </div>
      }
    </>
  );
};


AgendaItemCard.propTypes = {
  result: PropTypes.number,
  isFirst: PropTypes.bool,
};


AgendaItemCard.defaultProps = {
  result: 1,
  isFirst: false,
};

export default AgendaItemCard;
