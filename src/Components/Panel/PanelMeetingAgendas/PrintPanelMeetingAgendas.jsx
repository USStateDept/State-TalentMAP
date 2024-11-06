import PropTypes from 'prop-types';
import shortid from 'shortid';
import FA from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { toastInfo } from 'actions/toast';
import { formatLang, formatMonthYearDate, shortenString } from 'utilities';
import InteractiveElement from 'Components/InteractiveElement';
import PanelMeetingTracker from 'Components/Panel/PanelMeetingTracker';
import { formatVice } from 'Components/Agenda/Constants';
import { dateTernary } from '../../Agenda/Constants';

const PrintPanelMeetingAgendas = ({ panelMeetingsWithAgendas, closePrintView }) => {
  const cancel = () => {
    closePrintView();
  };

  const dispatch = useDispatch();
  dispatch(toastInfo('After opening the browser\'s print dialog, adjust print scale to fit more agendas per page (recommended 75)',
    '', shortid.generate(),
    false,
    { autoClose: false, draggable: false, closeOnClick: false }));

  const formatCurrentDate = (currentDate) => {
    if (currentDate) return `(${formatMonthYearDate(currentDate)})`;
    return '';
  };
  const formatStr = (d) => shortenString(d, 50);

  const printableAgendaTable = (agenda) => {
    const { legs } = agenda;
    return (
      legs.map(leg => {
        const language = Array.isArray(leg.languages) ? formatLang(leg.languages) : '-';
        const vice = leg.vice ? formatVice(leg.vice) : '-';
        const formattedSkillTitle = `(${leg.skill_code}) ${formatStr(leg.pos_title)}`;
        const formattedETA = formatMonthYearDate(leg.eta);
        const formattedTED = formatMonthYearDate(leg.ted);
        const formattedORG = formatStr(leg.org);
        return (
          <tbody>
            <tr>
              <td>{leg.action}</td>
              <td>{formattedORG}</td>
              <td>{leg.pos_num}</td>
              <td>{formattedSkillTitle}</td>
              <td>{language}</td>
              <td>{formattedETA}</td>
              <td>{formattedTED}</td>
              <td>{leg.tod_short_desc}</td>
              <td>{leg.travel_desc}</td>
              <td>{vice}</td>
              <td>{leg.combined_pp_grade}</td>
            </tr>
          </tbody>
        );
      })
    );
  };

  return (
    <div className="pma-print-view">
      <InteractiveElement className="pma-print-close-icon" onClick={cancel}><FA name="times" /></InteractiveElement>
      {
        panelMeetingsWithAgendas.map(panelMeeting => (
          <>
            <div className="tracker-container" key={panelMeeting.id}>
              <PanelMeetingTracker panelMeeting={panelMeeting} printableTracker />
            </div>
            {
              Object.keys(panelMeeting.agendas).map(category => (
                <>
                  <div className="pma-print-header" key={category}>{category}</div>
                  {
                    panelMeeting.agendas[category].map((agenda) => {
                      const cdoFirst = agenda?.cdo?.first_name || '';
                      const cdoLast = agenda?.cdo?.last_name || '';
                      const cdoComma = (cdoLast && cdoFirst) ? ',' : '';
                      const cdoFull = `${cdoLast}${cdoComma} ${cdoFirst}`;
                      const cdo = cdoFull !== ' ' ? cdoFull : 'None Listed';
                      const userLanguage = agenda?.languages || 'None Listed';
                      const combinedPPgrade = agenda?.combined_pp_grade;
                      const userSkill = agenda?.skills?.join(', ') || 'None Listed';
                      const agendaStatus = agenda?.status_short || 'None Listed';
                      const name = agenda?.full_name ?? '';
                      const createdByLast = agenda?.creators?.last_name ? `${agenda.creators.last_name},` : '';
                      const createDate = dateTernary(agenda?.creator_date);
                      const updateByLast = agenda?.updaters?.last_name ? `${agenda.updaters.last_name},` : '';
                      const updateDate = dateTernary(agenda?.modifier_date);
                      const remarks = agenda?.remarks?.map(remark => remark?.text).join('; ') || '';
                      const combinedTod = agenda?.aiCombinedTodCode === 'X' ? agenda.aiCombinedTodOtherText : agenda.aiCombinedTodDescText;

                      return (
                        <div className={`pma-table-wrapper agenda-border-row--${agendaStatus} `}>
                          <div className="pma-print-history-status">
                            <div className={`agenda-tag--${agendaStatus} pma-print-official-item-number`}>
                              {agenda?.pmi_official_item_num}
                            </div>
                            <div className={`status-tag agenda-tag--${agendaStatus}`}>
                              {agenda?.status_full || 'Default'}
                            </div>
                            <div className={`poly-slash agenda-tag--${agendaStatus}`} />
                          </div>
                          <div className="pma-print-user-info">
                            <div className="item"><span className="label">{name}</span></div>
                            <div className="item">
                              <span className="label">Languages: </span>
                              <span>
                                {
                                  Array.isArray(userLanguage) ?
                                    userLanguage.map(l => (
                                `${l.custom_description} ${formatCurrentDate(l.test_date)} `
                                    )).join(', ')
                                    :
                                    userLanguage
                                }
                              </span>
                            </div>
                            <div className="item"><span className="label">PP/Grade: </span> {combinedPPgrade}</div>
                            <div className="item"><span className="label">Skill: </span> {userSkill}</div>
                            <div className="item"><span className="label">CDO: </span> {cdo}</div>
                          </div>
                          <table className="pma-print-table">
                            <thead>
                              <tr>
                                <th>Action</th>
                                <th>Location/Org</th>
                                <th>Position Number</th>
                                <th>Skill/Title</th>
                                <th>Lang</th>
                                <th>ETA</th>
                                <th>TED</th>
                                <th>TOD</th>
                                <th>Travel</th>
                                <th>Vice</th>
                                <th>PP/Grade</th>
                              </tr>
                            </thead>
                            { printableAgendaTable(agenda) }
                          </table>
                          <div className="pma-footer-wrapper">
                            <div className="pma-cdo-remarks-wrapper">
                              <div className="item"><span className="label">Remarks: </span> {remarks}</div>
                              <div className="item"><span className="label">Combined TOD: </span> {combinedTod}</div>
                            </div>
                            <div className="pma-created-modified-wrapper">
                              <div className="pma-date-stamp-wrapper">
                                <span className="stamp">Created: {createdByLast} {agenda?.creators?.first_name || ''}</span>
                                <span className="date">{createDate}</span>
                              </div>
                              <div className="pma-date-stamp-wrapper">
                                <span className="stamp">Modified: {updateByLast} {agenda?.creators?.last_name || ''}</span>
                                <span className="date">{updateDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </>
              ))
            }
          </>
        ))
      }
    </div>
  );
};

PrintPanelMeetingAgendas.propTypes = {
  panelMeetingsWithAgendas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  closePrintView: PropTypes.func.isRequired,
};

export default PrintPanelMeetingAgendas;
