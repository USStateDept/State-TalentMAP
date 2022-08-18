import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, find, get, isNil } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import { aiCreate } from 'actions/agendaItemMaintenancePane';
import { useDataLoader } from 'hooks';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import api from '../../../api';

const AgendaItemMaintenanceContainer = (props) => {
  const dispatch = useDispatch();

  const researchPaneRef = useRef();

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);
  const [agendaItemMaintenancePaneLoading, setAgendaItemMaintenancePaneLoading] = useState(true);
  const [agendaItemTimelineLoading, setAgendaItemTimelineLoading] = useState(true);
  const [legs, setLegs] = useState([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState([]);
  const [asgSepBid, setAsgSepBid] = useState({});
  const [userRemarks, setUserRemarks] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');
  const client_data = useDataLoader(api().get, `/fsbid/client/${id}/`);

  const updateSelection = (remark) => {
    const userRemarks$ = [...userRemarks];
    const found = find(userRemarks$, { seq_num: remark.seq_num });
    if (!found) {
      userRemarks$.push(remark);
      setUserRemarks(userRemarks$);
    } else {
      setUserRemarks(filter(userRemarks$, (r) => r.seq_num !== remark.seq_num));
    }
  };

  const submitAI = () => {
    const perSeqNum = get(client_data, 'data.data.id', '') || get(client_data, 'data.data.employee_id', '');
    dispatch(aiCreate(maintenanceInfo, legs, perSeqNum));
  };

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

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
                sendMaintenancePaneInfo={setMaintenanceInfo}
                sendAsgSepBid={setAsgSepBid}
                userRemarks={userRemarks}
                legCount={legs.length}
                saveAI={submitAI}
              />
              <AgendaItemTimeline
                unitedLoading={spinner}
                setParentLoadingState={setAgendaItemTimelineLoading}
                updateLegs={setLegs}
                asgSepBid={asgSepBid}
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
                clientData={client_data}
                perdet={id}
                ref={researchPaneRef}
                updateSelection={updateSelection}
                userSelections={userRemarks}
              />
            </div>
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
