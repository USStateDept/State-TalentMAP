import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { clone, get, take, takeRight } from 'lodash';
import { formatDate, shortenString } from 'utilities';
// import { TEMP_FAKE_DATA } from 'Constants/PropTypes'; TODO - update
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';

const AgendaItemCard = props => {
  const {
    isCreate,
    agenda,
    showEdit,
  } = props;

  const legs = get(agenda, 'legs') || [];
  let legs$ = clone(legs);
  let legsLength = 0;
  if (legs$.length > 2) {
    legs$ = [take(legs$)[0], takeRight(legs$)[0]];
    legsLength = legs.length - 2;
    if (legsLength < 0) {
      legsLength = 0;
    }
  }

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

  const formatStr = (a) => shortenString(a, 15);

  // eslint-disable-next-line no-console
  const createAI = () => { console.log('placeholder create AI'); };
  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder create AI'); };
  return (
    <>
      {
        isCreate &&
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
            { formatStr(get(legs$, '[0].pos_title')) }
            <div className="arrow">
              <div className="arrow-tail" />
              {legsLength}
              <div className="arrow-tail" />
              <div className="arrow-right" />
            </div>
            { formatStr(get(legs$, '[1].pos_title')) }
          </h3>
          <div className="ai-history-card-status-date">
            <div className="pill ai-history-card-pill" style={{ backgroundColor: pillColors[get(agenda, 'status') || 'Default'] }}>
              {get(agenda, 'status') || 'Default'}
            </div>
            <div className="ai-history-card-panel-date">
              Panel Date: {agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}
            </div>
          </div>
          <AgendaItemLegs legs={agenda.legs} remarks={agenda.remarks} isCard />
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


AgendaItemCard.propTypes = {
  isCreate: PropTypes.bool,
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


AgendaItemCard.defaultProps = {
  isCreate: false,
  agenda: {},
  showEdit: false,
};

export default AgendaItemCard;
