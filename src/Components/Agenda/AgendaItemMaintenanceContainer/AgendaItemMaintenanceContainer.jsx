import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import InteractiveElement from 'Components/InteractiveElement';
import { drop, filter, find, get, has, isEmpty, isNil } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import { aiCreate } from 'actions/agendaItemMaintenancePane';
import { useDataLoader } from 'hooks';
import shortid from 'shortid';
import Alert from 'Components/Alert';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import api from '../../../api';

const AgendaItemMaintenanceContainer = (props) => {
  const dispatch = useDispatch();

  const researchPaneRef = useRef();
  const agendaID = get(props, 'match.params.agendaID') || '';
  const { data: agendaItemData, error: agendaItemError, loading: agendaItemLoading } = useDataLoader(api().get, `/fsbid/agenda/agenda_items/${agendaID}/`);
  const agendaItem = get(agendaItemData, 'data') || {};
  // temporary until business logic is added for readOnly items
  const isReadOnly = !isEmpty(agendaItemData);

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');
  const client_data = useDataLoader(api().get, `/fsbid/client/${id}/`);

  const agendaItemLegs = drop(get(agendaItem, 'legs')) || [];
  const agendaItemLegs$ = agendaItemLegs.map(ail => ({
    ...ail,
    ail_seq_num: get(ail, 'ail_seq_num') || shortid.generate(),
  }));

  const agendaItemRemarks = get(agendaItem, 'remarks') || [];

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);
  const [agendaItemMaintenancePaneLoading, setAgendaItemMaintenancePaneLoading] = useState(true);
  const [agendaItemTimelineLoading, setAgendaItemTimelineLoading] = useState(true);
  const [legs, setLegs] = useState([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState([]);
  const [asgSepBid, setAsgSepBid] = useState({}); // pass through from AIMPane to AITimeline
  const [userRemarks, setUserRemarks] = useState(agendaItemRemarks);
  const [spinner, setSpinner] = useState(true);

  const { data: asgSepBidResults, error: asgSepBidError, loading: asgSepBidLoading } = useDataLoader(api().get, `/fsbid/employee/assignments_separations_bids/${id}/`);
  const asgSepBidResults$ = get(asgSepBidResults, 'data') || [];
  const asgSepBidData = { asgSepBidResults$, asgSepBidError, asgSepBidLoading };
  const efPosition = get(agendaItem, 'legs[0]') || find(asgSepBidResults$, ['status', 'EF']) || {};

  const updateSelection = (remark, textInputs) => {
    const userRemarks$ = [...userRemarks];
    const found = find(userRemarks$, { seq_num: remark.seq_num });
    if (!found) {
      const remark$ = { ...remark };

      if (has(remark$, 'remark_inserts')) {
        const tempKey = (remark$.seq_num).toString();
        if (!remark$.ari_insertions) {
          remark$.ari_insertions = {};
        }
        remark$.ari_insertions = textInputs[tempKey];
      }

      userRemarks$.push(remark$);
      setUserRemarks(userRemarks$);
    } else {
      setUserRemarks(filter(userRemarks$, (r) => r.seq_num !== remark.seq_num));
    }
  };

  const submitAI = () => {
    const personId = get(client_data, 'data.data.id', '') || get(client_data, 'data.data.employee_id', '');
    const efInfo = {
      assignmentId: get(efPosition, 'asg_seq_num'),
      assignmentVersion: get(efPosition, 'revision_num'),
    };
    dispatch(aiCreate(maintenanceInfo, legs, personId, efInfo));
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

  useEffect(() => {
    if (!agendaItemLoading) {
      setUserRemarks(agendaItemRemarks);
    }
  }, [agendaItemLoading]);

  return (
    <>
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
          <div className={`ai-maintenance-container${matches ? ' stacked' : ''} ${isReadOnly ? 'aim-disabled' : ''}`}>
            <div className={`maintenance-container-left${(legsContainerExpanded || matches) ? '-expanded' : ''}`}>
              {
                spinner &&
                  <Spinner type="left-pane" size="small" />
              }
              {
                !agendaItemLoading &&
                <>
                  {
                    (agendaItemError && agendaID !== '') ?
                      <Alert type="error" title="Error loading Agenda Item Maintenance Data" messages={[{ body: 'Please try again.' }]} /> :
                      <>
                        <AgendaItemMaintenancePane
                          onAddRemarksClick={openRemarksResearchTab}
                          perdet={id}
                          unitedLoading={spinner}
                          setParentLoadingState={setAgendaItemMaintenancePaneLoading}
                          updateSelection={isReadOnly ? () => {} : updateSelection}
                          sendMaintenancePaneInfo={setMaintenanceInfo}
                          sendAsgSepBid={setAsgSepBid}
                          asgSepBidData={asgSepBidData}
                          userRemarks={userRemarks}
                          legCount={legs.length}
                          saveAI={submitAI}
                          agendaItem={agendaItem}
                          isReadOnly={isReadOnly}
                        />
                        <AgendaItemTimeline
                          unitedLoading={spinner}
                          setParentLoadingState={setAgendaItemTimelineLoading}
                          updateLegs={setLegs}
                          asgSepBid={asgSepBid}
                          efPos={efPosition}
                          agendaItemLegs={agendaItemLegs$}
                          isReadOnly={isReadOnly}
                        />
                      </>
                  }
                </>
              }
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
                updateSelection={isReadOnly ? () => {} : updateSelection}
                userSelections={userRemarks}
                legCount={legs.length}
                isReadOnly={isReadOnly}
              />
            </div>
          </div>
        )}
      </MediaQuery>
    </>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
