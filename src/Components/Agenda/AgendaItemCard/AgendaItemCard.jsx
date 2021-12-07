import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { get } from 'lodash';
import { shortenString } from 'utilities';
import { TEMP_FAKE_DATA } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemCard = props => {
  const {
    result,
    isFirst,
    fakeData,
  } = props;

  const pillColors = {
    Withdrawn: '#227c9dff',
    Disapproved: '#17c3b2ff',
    Approved: '#2d6e0eff',
    Deferred: '#E08A00',
    Removed: '#ed2038ff',
    Paused: '#6421a2ff',
    Cancelled: '#BA70FF',
    Default: '#513C2C',
  };

  fakeData.status =
    Object.keys(pillColors)[Math.floor(Math.random() * Object.keys(pillColors).length)];

  const formatStr = (a) => shortenString(a, 15);

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
              <InteractiveElement title="Create Agenda" onClick={createAI()}>
                <FA name="plus-circle" />
              </InteractiveElement>
            </div>
          </div>
      }
      {
        <div className="ai-history-card">
          <h3 className="ai-history-card-title">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            { formatStr(get(fakeData, 'legs[0].position')) }
            <div className="arrow">
              <div className="arrow-tail" />
              {result}
              <div className="arrow-tail" />
              <div className="arrow-right" />
            </div>
            { formatStr(get(fakeData, 'legs[1].position')) }
          </h3>
          <div className="ai-history-card-status-date">
            <div className="pill ai-history-card-pill" style={{ backgroundColor: pillColors[get(fakeData, 'status') || 'Default'] }}>
              {get(fakeData, 'status') || 'Default'}
            </div>
            <div className="ai-history-card-panel-date">
              Panel Date: {fakeData.panelDate}
            </div>
          </div>
          <AgendaItemLegs fakeLegs={fakeData.legs} isCard />
          <div className="ai-history-footer">
            <InteractiveElement title="Edit Agenda" onClick={editAI()}>
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
  fakeData: TEMP_FAKE_DATA,
};


AgendaItemCard.defaultProps = {
  result: 1,
  isFirst: false,
  fakeData: {},
};

export default AgendaItemCard;
