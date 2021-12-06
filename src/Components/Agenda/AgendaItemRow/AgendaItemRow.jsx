import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemRow = props => {
  const {
    isFirst,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [fake, setFake] = useState(true);

  const fD = {
    legs: [
      {
        position: 'FACILITY MANAGER',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/16',
        ted: '9/5/18',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: '',
        travel: '',
      },
      {
        position: 'SPECIAL ENVOY AND COORDINATOR',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/18',
        ted: '12/17/20',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'TRAINING',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '3/15/20',
        ted: '9/5/22',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'INFO MANAGENT',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '6/22/22',
        ted: '12/17/24',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sapien purus, fermentum ac fringilla faucibus, pretium ac mi. Nam placerat molestie semper. Maecenas consectetur, massa quis hendrerit euismod, erat urna mattis risus, id rhoncus leo nisl eu arcu. Sed ac lacinia enim, vel porttito',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '1/15/16',
        ted: '9/5/18',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'DEPUTY REGIONAL SECURITY OFFIC',
        org: 'BELGRADE lorem ipsum lorem ipsum',
        eta: '9/22/18',
        ted: '12/17/20',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
      },
      {
        position: 'INFORMATION TECHNOLOGY MANAGEM',
        org: 'PARIS lorem ipsum lorem ipsum',
        eta: '3/15/20',
        ted: '9/5/22',
        tod: '2YRR',
        grade: '02',
        posNum: 'D1023589',
        action: 'Reassign',
        travel: 'Post to USHL',
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

  // eslint-disable-next-line no-console
  const createAI = () => { console.log('placeholder create AI'); };
  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder edit AI'); };
  return (
    <>
      {
        isFirst &&
        <div className="ai-history-row first-row">
          <div className="plusIcon">
            <InteractiveElement onClick={() => createAI()}>
              <FA name="plus-circle" />
            </InteractiveElement>
          </div>
        </div>
      }
      {
        <div className="ai-history-row" style={{ borderLeft: `20px solid ${randomColor}` }}>
          <div className="ai-history-row-status-date">
            <div className="pill ai-history-row-pill" style={{ backgroundColor: randomColor }}>
              {randomStat}
            </div>
            <div className="ai-history-row-panel-date">
              Panel Date: {fD.panelDate}
            </div>
          </div>
          <AgendaItemLegs fakeLegs={fD.legs} />
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

AgendaItemRow.propTypes = {
  isFirst: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  isFirst: false,
};

export default AgendaItemRow;
