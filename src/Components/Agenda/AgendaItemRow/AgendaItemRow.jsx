import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import { useState } from 'react';
import { POS_LANGUAGES } from 'Constants/PropTypes';
import AgendaItemLegs from '../AgendaItemLegs';
import { statusRenaming } from '../Constants';

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
  // const editAI = () => { console.log('placeholder edit AI'); };

  const [agendaStatus, setAgendaStatus] = useState(get(agenda, 'status_short') || 'Default');
  const onStatusChange = (status) => {
    setAgendaStatus(status.target.value);
  };
  const updaterMiddleInitial = get(agenda, 'updaters.middle_name', '')?.slice(0, 1) || 'NMN';
  const creatorMiddleInitial = get(agenda, 'creators.middle_name', '')?.slice(0, 1) || 'NMN';

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
            {
              isPanelMeetingView ?
                <>
                  <div className={`status-tag agenda-tag--${agendaStatus} panel-meeting-agendas-item-number`}>
                    {get(agenda, 'id')}
                  </div>
                  <div className={`status-tag agenda-tag--${agendaStatus}`}>
                      Item Status:
                  </div>
                  <div className={`status-tag agenda-tag--${agendaStatus}`}>
                    <select
                      className="panel-select-box panel-meeting-agendas-select"
                      onChange={onStatusChange}
                    >
                      {statusRenaming.map((k) => (<option
                        selected={(k.value === agendaStatus)}
                        value={k.value}
                      >
                        {k.text}
                      </option>),
                      )}
                    </select>
                  </div>
                </>
                :
                <div className={`status-tag agenda-tag--${agendaStatus}`}>
                  {get(agenda, 'status_full') || 'Default'}
                </div>
            }
            <div className={`poly-slash agenda-tag--${agendaStatus}`}>_</div>
          </div>
          <div className={`ai-history-row-panel-date ${isPanelMeetingView ? '' : 'aih-view'}`}>
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
              <div className="label">Created By: <span>{get(agenda, 'creators.last_name' || '')}, {get(agenda, 'creators.first_name' || '')} {creatorMiddleInitial}</span></div>
              <div className="label">Modified By: <span>{get(agenda, 'updaters.last_name' || '')}, {get(agenda, 'updaters.first_name' || '')} {updaterMiddleInitial}</span></div>
            </div>
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
              <Link to={`/profile/${userRole}/createagendaitem/${perdet$}`}>
                {/* <InteractiveElement title="Edit Agenda" onClick={editAI()}> */}
                <FA name="pencil" />
                {/* </InteractiveElement> */}
              </Link>
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
        languages: POS_LANGUAGES,
      }),
    ),
    update_date: PropTypes.string,
    modifier_name: PropTypes.number,
    creator_name: PropTypes.number,
    creators: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      hruempseqnbr: PropTypes.number,
      hruneuid: PropTypes.number,
      hruid: PropTypes.number,
      neuid: PropTypes.number,
      middle_name: PropTypes.string,
    }),
    updaters: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      hruempseqnbr: PropTypes.number,
      hruneuid: PropTypes.number,
      hruid: PropTypes.number,
      neuid: PropTypes.number,
      middle_name: PropTypes.string,
    }),
  }),
  showEdit: PropTypes.bool,
  isCDO: PropTypes.bool,
  perdet: PropTypes.number,
  isPanelMeetingView: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  isCreate: false,
  agenda: {},
  showEdit: true,
  isCDO: false,
  perdet: null,
  isPanelMeetingView: false,
};

export default AgendaItemRow;
