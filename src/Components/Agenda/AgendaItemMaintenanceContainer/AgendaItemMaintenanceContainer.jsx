import { useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get, isNil } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import { Link } from 'react-router-dom';
import { useDataLoader, useMount } from 'hooks';
import { useDispatch } from 'react-redux';
import { agendaEmployeesEmployeeFetchData } from 'actions/agendaEmployees';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import api from '../../../api';

const AgendaItemMaintenanceContainer = (props) => {
  const researchPaneRef = useRef();

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');

  const agendaEmployee = useDataLoader(api().get, `/fsbid/agenda_employees/employee/${id}/`);
  const employee = get(agendaEmployee, 'data.data.results', {})[0] || {};
  const employeeName = get(employee, 'person.fullName') || '';

  // handles error where some employees have no Profile
  const employeeHasCDO = !isNil(get(employee, 'person.cdo'));

  const updateResearchPaneTab = tabID => {
    researchPaneRef.current.setSelectedNav(tabID);
  };

  const openRemarksResearchTab = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(RemarksGlossaryTabID);
  };

  // Actions
  const dispatch = useDispatch();

  const getEmployeesProfile = () => {
    dispatch(agendaEmployeesEmployeeFetchData(id));
  };

  useMount(() => {
    getEmployeesProfile();
  });

  return (
    <div>
      <div className="aim-header-container">
        <div className="aim-title-container">
          <FontAwesome
            name="user-circle-o"
            size="lg"
          />
          Agenda Item Maintenance
          {isCDO && employeeHasCDO ?
            <span className="aim-title-dash">
                -
              <Link to={`/profile/public/${id}`}>
                <span className="aim-title">
                  {` ${employeeName}`}
                </span>
              </Link>
            </span>
            :
            <span>
              {` - ${employeeName}`}
            </span>
          }
        </div>
      </div>
      <MediaQuery breakpoint="screenXlgMin" widthType="max">
        {matches => (
          <div className={`ai-maintenance-container${matches ? ' stacked' : ''}`}>
            <div className={`maintenance-container-left${(legsContainerExpanded || matches) ? '-expanded' : ''}`}>
              <AgendaItemMaintenancePane
                leftExpanded={(legsContainerExpanded || matches)}
                onAddRemarksClick={openRemarksResearchTab}
              />
              <AgendaItemTimeline />
            </div>
            <div className={`expand-arrow${matches ? ' hidden' : ''}`}>
              <InteractiveElement onClick={toggleExpand}>
                <Tooltip
                  title={legsContainerExpanded ? 'Expand Research' : 'Collapse Research'}
                  arrow
                >
                  <FontAwesome
                    style={{ transform: rotate, transition: 'all 0.65s linear' }}
                    name="arrow-circle-left"
                    size="lg"
                  />
                </Tooltip>
              </InteractiveElement>
            </div>
            <div className={`maintenance-container-right${(legsContainerExpanded && !matches) ? ' hidden' : ''}`}>
              <AgendaItemResearchPane perdet={id} ref={researchPaneRef} />
            </div>
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
