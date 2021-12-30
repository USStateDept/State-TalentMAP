import PropTypes from 'prop-types';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemRow = props => {
  const {
    isFirst,
    agenda,
    showEdit,
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
        <div className="ai-history-row" style={{ borderLeftColor: pillColors[get(agenda, 'status') || 'Default'] }}>
          <div className="ai-history-row-status-date">
            <div className="pill ai-history-row-pill" style={{ backgroundColor: pillColors[get(agenda, 'status') || 'Default'] }}>
              {get(agenda, 'status') || 'Default'}
            </div>
            <div className="ai-history-row-panel-date">
              Panel Date: {agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}
            </div>
          </div>
          <AgendaItemLegs legs={agenda.legs} remarks={agenda.remarks} />
          {
            showEdit &&
            <div className="ai-history-footer">
              <InteractiveElement title="Edit Agenda" onClick={editAI()}>
                <FA name="pencil" />
              </InteractiveElement>
            </div>
          }
        </div>
      }
    </>
  );
};

AgendaItemRow.propTypes = {
  isFirst: PropTypes.bool,
  agenda: PropTypes.shape({
    id: PropTypes.number,
    remarks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        type: null,
      }),
    ),
    panel_date: PropTypes.string,
    status: PropTypes.string,
    perdet: PropTypes.number,
    legs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        pos_title: PropTypes.string,
        pos_num: PropTypes.string,
        org: PropTypes.string,
        eta: PropTypes.string,
        ted: PropTypes.string,
        tod: PropTypes.string,
        grade: PropTypes.string,
        action: PropTypes.string,
        travel: PropTypes.string,
      }),
    ),
    update_date: PropTypes.string,
    modifier_name: PropTypes.number,
    creator_name: PropTypes.number,
  }),
  showEdit: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  isFirst: false,
  agenda: {},
  showEdit: false,
};

export default AgendaItemRow;
