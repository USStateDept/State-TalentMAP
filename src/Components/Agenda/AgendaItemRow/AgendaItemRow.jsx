import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import AgendaItemLegs from '../AgendaItemLegs';

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

  const userSkill = get(agenda, 'skill') || 'None Listed';
  const userLanguage = get(agenda, 'language') || 'None Listed';
  const userBureau = get(agenda, 'bureau') || 'None Listed';
  const userGrade = get(agenda, 'grade') || 'None Listed';

  // eslint-disable-next-line no-console
  const editAI = () => { console.log('placeholder edit AI'); };
  const agendaStatus = get(agenda, 'status_short') || 'Default';
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
        <div className={`ai-history-row agenda-border-row--${agendaStatus} `}>
          <div className="ai-history-status">
            <div className={`status-tag agenda-tag--${agendaStatus}`}>
              {get(agenda, 'status_full') || 'Default'}
            </div>
            <div className={`poly-slash agenda-tag--${agendaStatus}`}>_</div>
          </div>
          <div className="ai-history-row-panel-date">
            {
              isPanelMeetingView &&
              <div className="panel-meeting-agendas-user-info">
                <div className="item"><span className="label">Bureau: </span> {userBureau}</div>
                <div className="item"><span className="label">Grade: </span> {userGrade}</div>
                <div className="item"><span className="label">Language: </span> {userLanguage}</div>
                <div className="item"><span className="label">Skill: </span> {userSkill}</div>
              </div>
            }
            <div>
              Panel Date: {agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}
            </div>
          </div>
          {
            isPanelMeetingView &&
            <div className="panel-meeting-agendas-profile-link">
              <Link to="/profile/public/4">Townpost, Jenny Y.</Link>
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
