import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { filter, find, get, isNil } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';

const AgendaItemMaintenanceContainer = (props) => {
  const researchPaneRef = useRef();

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);
  const [agendaItemMaintenancePaneLoading, setAgendaItemMaintenancePaneLoading] = useState(true);
  const [agendaItemTimelineLoading, setAgendaItemTimelineLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  const userRemarks = [];
  const [userSelections, setUserSelections] = useState(userRemarks);


  const updateSelection = (remark) => {
    const userSelection$ = [...userSelections];
    const found = find(userSelection$, { seq_num: remark.seq_num });
    if (!found) {
      userSelection$.push(remark);
      setUserSelections(userSelection$);
    } else {
      setUserSelections(filter(userSelection$, (r) => r.seq_num !== remark.seq_num));
    }
  };

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');

  // need to update once further integration is done
  const employeeName = 'Employee Name Placeholder';
  const employeeHasCDO = !isNil(get(employeeName, 'person.cdo'));

  const updateResearchPaneTab = tabID => {
    researchPaneRef.current.setSelectedNav(tabID);
  };

  const openRemarksResearchTab = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(RemarksGlossaryTabID);
  };

  useEffect(() => {
    if (!agendaItemMaintenancePaneLoading && !agendaItemTimelineLoading) {
      setSpinner(false);
    }
  }, [agendaItemMaintenancePaneLoading, agendaItemTimelineLoading]);

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
              {
                spinner &&
                  <Spinner type="left-pane" size="small" />
              }
              <AgendaItemMaintenancePane
                leftExpanded={(legsContainerExpanded || matches)}
                onAddRemarksClick={openRemarksResearchTab}
                perdet={id}
                unitedLoading={spinner}
                setParentLoadingState={setAgendaItemMaintenancePaneLoading}
                updateSelection={updateSelection}
                userSelections={userSelections}
              />
              <AgendaItemTimeline
                unitedLoading={spinner}
                setParentLoadingState={setAgendaItemTimelineLoading}
              />
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
              <AgendaItemResearchPane
                perdet={id}
                ref={researchPaneRef}
                userSelections={userSelections}
                updateSelection={updateSelection}
              />
            </div>
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
