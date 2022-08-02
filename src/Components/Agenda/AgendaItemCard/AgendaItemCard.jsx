import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import { clone, get, take, takeRight } from 'lodash';
import { formatDate, shortenString } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import AgendaItemLegs from '../AgendaItemLegs';
import { pillColors } from '../Constants';

const AgendaItemCard = props => {
  const {
    isCreate,
    agenda,
    showEdit,
    isCDO,
    perdet,
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

  const renderTitles = () => {
    let capAt = 13;
    const title1 = get(legs$, '[0].pos_title') || 'N/A';
    const title2 = get(legs$, '[1].pos_title') || 'N/A';
    const t1L = title1.length;
    const t2L = title2.length;
    // does either have chars to give up and does either want them
    if ((t1L < 13 || t2L < 13) && (t1L > 13 || t2L > 13)) {
      if (t1L > t2L) {
        capAt += (13 - t2L);
      } else {
        capAt += (13 - t1L);
      }
    }
    return [shortenString(title1, capAt), shortenString(title2, capAt)];
  };

  const titles = renderTitles();

  const userRole = isCDO ? 'cdo' : 'ao';
  const perdet$ = perdet || get(agenda, 'perdet');

  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder create AI'); };
  const status_full = get(agenda, 'status_full') || 'Default';
  const pillColor = pillColors[status_full];

  return (
    <>
      {
        isCreate &&
          <div className="ai-history-card first-card">
            <div className="plusIcon">
              <InteractiveElement title="Create Agenda">
                <Link className="create-ai-link" to={`/profile/${userRole}/createagendaitem/${perdet$}`}>
                  <FA name="plus-circle" />
                </Link>
              </InteractiveElement>
            </div>
          </div>
      }
      {
        !isCreate &&
        <div className="ai-history-card" style={{ borderLeftColor: pillColor }}>
          <div className="ai-history-status">
            <div className="status-tag" style={{ backgroundColor: pillColor }}>
              {get(agenda, 'status_full') || 'Default'}
            </div>
            <div className="poly-slash" style={{ backgroundColor: pillColor, color: pillColor }} >_</div>
          </div>
          {
            showEdit &&
            <div className="ai-history-edit">
              <InteractiveElement title="Edit Agenda" onClick={editAI()}>
                <FA name="pencil" />
              </InteractiveElement>
            </div>
          }
          <h3 className="ai-history-card-title">
            { titles[0] }
            <div className="title-arrow">
              <div className="arrow-tail" />
              {legsLength}
              <div className="arrow-tail" />
              <div className="arrow-right" />
            </div>
            { titles[1] }
          </h3>
          <AgendaItemLegs legs={agenda.legs} isCard />
          <div className="ai-history-card-date">
            Panel Date: {agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}
          </div>
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
  isCDO: PropTypes.bool,
  perdet: PropTypes.number,
};


AgendaItemCard.defaultProps = {
  isCreate: false,
  agenda: {},
  showEdit: false,
  isCDO: false,
  perdet: null,
};

export default AgendaItemCard;
