import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import { TEMP_FAKE_DATA } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemRow = props => {
  const {
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
            <InteractiveElement title="Create Agenda" onClick={createAI()}>
              <FA name="plus-circle" />
            </InteractiveElement>
          </div>
        </div>
      }
      {
        <div className="ai-history-row" style={{ borderLeftColor: pillColors[get(fakeData, 'status') || 'Default'] }}>
          <div className="ai-history-row-status-date">
            <div className="pill ai-history-row-pill" style={{ backgroundColor: pillColors[get(fakeData, 'status') || 'Default'] }}>
              {get(fakeData, 'status') || 'Default'}
            </div>
            <div className="ai-history-row-panel-date">
              Panel Date: {fakeData.panelDate}
            </div>
          </div>
          <AgendaItemLegs fakeLegs={fakeData.legs} />
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

AgendaItemRow.propTypes = {
  isFirst: PropTypes.bool,
  fakeData: TEMP_FAKE_DATA,
};


AgendaItemRow.defaultProps = {
  isFirst: false,
  fakeData: {},
};

export default AgendaItemRow;
