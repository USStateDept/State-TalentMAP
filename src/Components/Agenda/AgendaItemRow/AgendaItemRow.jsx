import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import AgendaItemLegs from '../AgendaItemLegs';
import { borderColors } from '../Constants';

const AgendaItemRow = props => {
  const {
    isCreate,
    agenda,
    showEdit,
    isCDO,
    perdet,
    isPanelMeetingView,
  } = props;

  const userRole = isCDO ? 'cdo' : 'ao';
  const perdet$ = perdet || get(agenda, 'perdet');

  const panelAgendas = useSelector(state => state.panelMeetingAgendas[0]);

  const userSkill = get(panelAgendas, 'skill');
  const userLanguage = get(panelAgendas, 'language');
  const userBureau = get(panelAgendas, 'bureau');
  const userGrade = get(panelAgendas, 'grade');

  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder edit AI'); };
  const borderColor = borderColors[get(agenda, 'status_full') || 'Default'];
  return (
    <>
      {
        isCreate &&
        <div className="ai-history-row first-row">
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
        <div className="ai-history-row" style={{ borderLeftColor: borderColor }}>
          <div className="ai-history-status">
            <div className="status-tag" style={{ backgroundColor: borderColor }}>
              {get(agenda, 'status_full') || 'Default'}
            </div>
            <div className="poly-slash" style={{ backgroundColor: borderColor, color: borderColor }} >_</div>
          </div>
          <div className="ai-history-row-panel-date">
            Panel Date: {agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}
          </div>
          {
            isPanelMeetingView &&
            <div className="panel-meeting-agendas-user-info">
              <div className="panel-meeting-agendas-profile-link">
                <Link to="/profile/public/4">Townpost, Jenny Y.</Link>
              </div>
              <div>
                <div className="item"><strong>Bureau: </strong> {userBureau}</div>
                <div className="item"><strong>Grade: </strong> {userGrade}</div>
                <div className="item"><strong>Language: </strong> {userLanguage}</div>
                <div className="item"><strong>Skill: </strong> {userSkill}</div>
              </div>
            </div>
          }
          <AgendaItemLegs legs={agenda.legs} remarks={agenda.remarks} />
          {
            showEdit &&
            <div className="ai-history-edit">
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
  isCreate: PropTypes.bool,
  agenda: PropTypes.shape({
    id: PropTypes.number,
    remarks: PropTypes.arrayOf(
      PropTypes.shape({
        seq_num: PropTypes.number,
        rc_code: PropTypes.string,
        order_num: PropTypes.number,
        short_desc_text: PropTypes.string,
        mutually_exclusive_ind: PropTypes.string,
        text: PropTypes.string,
        active_ind: PropTypes.string,
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
  isPanelMeetingView: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  isCreate: false,
  agenda: {},
  showEdit: false,
  isCDO: false,
  perdet: null,
  isPanelMeetingView: false,
};

export default AgendaItemRow;
