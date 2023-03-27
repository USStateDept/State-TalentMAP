import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { formatDate } from 'utilities';
import { POS_LANGUAGES } from 'Constants/PropTypes';
import { checkFlag } from 'flags';
import AgendaItemLegs from '../AgendaItemLegs';
import RemarksPill from '../RemarksPill';
import SkillCodeList from '../../SkillCodeList';

const useAgendaItemMaintenance = () => checkFlag('flags.agenda_item_maintenance');

const AgendaItemRow = props => {
  const {
    isCreate,
    agenda,
    isCDO,
    perdet,
    isPanelMeetingView,
  } = props;

  const showAgendaItemMaintenance = useAgendaItemMaintenance();
  const clientData = get(agenda, 'user');

  const userRole = isCDO ? 'cdo' : 'ao';
  const perdet$ = perdet || get(agenda, 'perdet');

  const userSkill = <SkillCodeList skillCodes={get(clientData, 'skills') || []} />;
  const userLanguage = get(clientData, 'languages') || [];
  const userBureau = get(clientData, 'current_assignment.position.bureau') || 'None Listed';
  const userGrade = get(clientData, 'grade') || 'None Listed';
  const cdo = get(clientData, 'cdo.name') || 'None Listed';

  const agendaStatus = get(agenda, 'status_short') || 'None Listed';
  const updaterMiddleInitial = get(agenda, 'updaters.middle_name')?.slice(0, 1) || '';
  const creatorMiddleInitial = get(agenda, 'creators.middle_name')?.slice(0, 1) || '';
  const remarks = get(agenda, 'remarks') || [];

  const updateDate = get(agenda, 'modifier_date')
    ? `${formatDate(get(agenda, 'modifier_date'), 'MM/DD/YY')}`
    : '--/--/--';

  const createDate = get(agenda, 'creator_date')
    ? `${formatDate(get(agenda, 'creator_date'), 'MM/DD/YY')}`
    : '--/--/--';

  const pmi = (<>
    {
      agenda?.pmi_official_item_num &&
      <div className="pmiNum">{agenda?.pmi_official_item_num}</div>
    }
    <FA name="sticky-note" />
  </>);

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
              isPanelMeetingView &&
                <>
                  <div className={`status-tag agenda-tag--${agendaStatus} pmi-official-item-number`}>
                    {
                      showAgendaItemMaintenance ?
                        <Link
                          className="ai-id-link"
                          to={`/profile/${userRole}/createagendaitem/${perdet$}/${agenda?.id}`}
                        >
                          {pmi}
                        </Link>
                        :
                        pmi
                    }
                  </div>
                </>
            }
            <div className={`status-tag agenda-tag--${agendaStatus}`}>
              {get(agenda, 'status_full') || 'Default'}
            </div>
            <div className={`poly-slash agenda-tag--${agendaStatus}`}>_</div>
          </div>
          <div className="ai-history-row-panel-date">
            {
              !isPanelMeetingView ?
                `Panel Date: ${agenda.panel_date ? formatDate(agenda.panel_date) : 'N/A'}`
                : ''
            }
          </div>
          {
            isPanelMeetingView &&
            <div className="panel-meeting-person-data">
              <div className="panel-meeting-agendas-profile-link">
                <Link to={`/profile/public/${perdet$}`}>{get(clientData, 'shortened_name')}</Link>
              </div>
              <div className="panel-meeting-agendas-user-info">
                <div className="item"><span className="label">CDO: </span> {cdo}</div>
                <div className="item"><span className="label">Bureau: </span> {userBureau}</div>
                <div className="item"><span className="label">Grade: </span> {userGrade}</div>
                <div className="item">
                  <span className="label">Languages: </span>
                  {userLanguage.map((l, i) => (
                    ` ${l.custom_description}${i + 1 === userLanguage.length ? '' : ','}`
                  ))}
                </div>
                <div className="item"><span className="label">Skill: </span> {userSkill}</div>
              </div>
            </div>
          }
          <AgendaItemLegs legs={agenda.legs} />
          <div className="agenda-bottom-row">
            <div className="remarks-container">
              <div className="remarks-text">Remarks:</div>
              {
                remarks.map(remark => (
                  <RemarksPill key={remark.text} remark={remark} />
                ))
              }
            </div>
            <div className="ai-updater-creator">
              <div className="wrapper">
                <span>
                  Created: {get(agenda, 'creators.last_name') || ''}, {get(agenda, 'creators.first_name') || ''} {creatorMiddleInitial}
                </span>
                <span className="date">{createDate}</span>
              </div>
              <div className="wrapper">
                <span>
                  Modified: {get(agenda, 'updaters.last_name') || ''}, {get(agenda, 'updaters.first_name') || ''} {updaterMiddleInitial}
                </span>
                <span className="date">{updateDate}</span>
              </div>
            </div>
          </div>
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
    pmi_official_item_num: PropTypes.number,
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
  isCDO: PropTypes.bool,
  perdet: PropTypes.number,
  isPanelMeetingView: PropTypes.bool,
};


AgendaItemRow.defaultProps = {
  isCreate: false,
  agenda: {},
  isCDO: false,
  perdet: null,
  isPanelMeetingView: false,
};

export default AgendaItemRow;
