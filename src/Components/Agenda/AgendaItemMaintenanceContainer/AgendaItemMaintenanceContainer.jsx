import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import InteractiveElement from 'Components/InteractiveElement';
import { drop, filter, find, get, has, isEmpty } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import { fetchAI, modifyAgenda, resetAIValidation, validateAI } from 'actions/agendaItemMaintenancePane';
import { useDataLoader } from 'hooks';
import { isAfter } from 'date-fns-v2';
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

  const AIvalidationHasErrored = useSelector(state => state.validateAIHasErrored);
  const AIvalidationIsLoading = useSelector(state => state.validateAIIsLoading);
  const AIvalidation = useSelector(state => state.aiValidation);
  const agendaItemData = useSelector(state => state.fetchAISuccess);
  const agendaItemLoading = useSelector(state => state.fetchAIIsLoading);
  const agendaItemError = useSelector(state => state.fetchAIHasErrored);
  const aiCreateSuccess = useSelector(state => state.ai);

  const agendaID = get(props, 'match.params.agendaID') || '';
  const agendaItem = get(agendaItemData, 'data') || {};

  const id = get(props, 'match.params.id');
  const isCDO = get(props, 'isCDO');

  const { data: employeeData, error: employeeDataError, loading: employeeDataLoading } = useDataLoader(api().get, `/fsbid/client/${id}/`);
  const { data: employeeDataFallback, error: employeeDataFallbackError, loading: employeeDataFallbackLoading } = useDataLoader(api().get, `/fsbid/persons/${id}`);

  const employeeLoading = employeeDataLoading || employeeDataFallbackLoading;
  const employeeError = employeeDataError && employeeDataFallbackError;

  const employeeData$ = employeeData?.data || employeeDataFallback?.data?.results?.[0];
  const employeeName = employeeLoading ? '' : employeeData$?.name;
  // handles error where some employees have no Profile
  const employeeHasCDO = employeeLoading ? false : !!(employeeData$?.cdo?.name);

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
  const [isNewSeparation, setIsNewSeparation] = useState(false);
  const [userRemarks, setUserRemarks] = useState(agendaItemRemarks);
  const [spinner, setSpinner] = useState(true);
  const [location, setLocation] = useState();
  const [activeAIL, setActiveAIL] = useState();
  const [readMode, setReadMode] = useState(true);

  const { data: asgSepBidResults, error: asgSepBidError, loading: asgSepBidLoading } = useDataLoader(api().get, `/fsbid/employee/assignments_separations_bids/${id}/`);
  const asgSepBidResults$ = get(asgSepBidResults, 'data') || [];
  const asgSepBidData = { asgSepBidResults$, asgSepBidError, asgSepBidLoading };

  const findEffectiveAsgOrSep = (asgAndSep) => {
    let max;
    asgAndSep.forEach(a => {
      if (a?.status === 'EF') {
        if (!max) max = a;
        if (isAfter(new Date(a?.start_date), new Date(max?.start_date))) {
          max = a;
        }
      }
    });
    return max;
  };

  const efPosition = get(agendaItem, 'legs[0]') || findEffectiveAsgOrSep(asgSepBidResults$) || {};

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

      remark$.user_remark_inserts = [];
      remark$.remark_inserts.forEach(ri => (remark$.user_remark_inserts.push({
        airiinsertiontext: textInputs[ri.rirmrkseqnum][ri.riseqnum],
        airirmrkseqnum: ri.rirmrkseqnum,
        aiririseqnum: ri.riseqnum,
      })));

      userRemarks$.push(remark$);
      setUserRemarks(userRemarks$);
    } else {
      setUserRemarks(filter(userRemarks$, (r) => r.seq_num !== remark.seq_num));
    }
  };

  const submitAI = () => {
    const personId = employeeData$?.id || id;
    const efInfo = {
      assignmentId: get(efPosition, 'asg_seq_num'),
      assignmentVersion: get(efPosition, 'revision_num'),
    };
    dispatch(modifyAgenda(maintenanceInfo, legs, personId, efInfo, agendaItem));
  };

  const updateFormMode = () => {
    setReadMode(false);
  };

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const updateResearchPaneTab = tabID => {
    researchPaneRef.current.setSelectedNav(tabID);
  };

  const openRemarksResearchTab = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(RemarksGlossaryTabID);
  };

  useEffect(() => {
    if (agendaID) {
      dispatch(fetchAI(agendaID));
    }
  }, [agendaID]);

  useEffect(() => {
    if (!readMode) {
      const personId = employeeData$?.id || id;
      const efInfo = {
        assignmentId: get(efPosition, 'asg_seq_num'),
        assignmentVersion: get(efPosition, 'revision_num'),
      };
      dispatch(validateAI(maintenanceInfo, legs, personId, efInfo));
    } else {
      dispatch(resetAIValidation());
    }
  }, [maintenanceInfo, legs, readMode]);

  useEffect(() => {
    if (!agendaItemMaintenancePaneLoading && !agendaItemTimelineLoading) {
      setSpinner(false);
    }
  }, [agendaItemMaintenancePaneLoading, agendaItemTimelineLoading]);

  useEffect(() => {
    if (!agendaItemLoading) {
      // If not creating a new AI, then we default initial mode to Read
      setReadMode(!isEmpty(agendaItemData));
      setUserRemarks(agendaItemRemarks);
    }
  }, [agendaItemLoading]);

  useEffect(() => {
    // Condition to leave the create page and go to edit page - now that it was just created
    // Important they have the latest data call after saving else future edits will be stale
    if (agendaID === '' && aiCreateSuccess) {
      props.history.push(`/profile/ao/createagendaitem/${id}/${aiCreateSuccess}`);
    }
  }, [aiCreateSuccess]);

  return (
    <>
      <div className="aim-header-container">
        <div className="aim-title-container">
          <FontAwesome
            name="user-circle-o"
            size="lg"
          />
          Agenda Item Maintenance
          {
            employeeHasCDO ?
              <span className="aim-title-dash">
                {'- '}
                <Link to={`/profile/public/${id}${isCDO ? '' : '/ao'}`}>
                  <span className="aim-title">
                    {`${employeeName}`}
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
          <div className={`ai-maintenance-container${matches ? ' stacked' : ''} ${readMode ? 'aim-disabled' : ''}`}>
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
                          updateSelection={readMode ? () => {} : updateSelection}
                          sendMaintenancePaneInfo={setMaintenanceInfo}
                          sendAsgSepBid={setAsgSepBid}
                          asgSepBidData={asgSepBidData}
                          setIsNewSeparation={() => setIsNewSeparation(!isNewSeparation)}
                          userRemarks={userRemarks}
                          legCount={legs.length}
                          saveAI={submitAI}
                          updateFormMode={updateFormMode}
                          agendaItem={agendaItem}
                          readMode={readMode}
                          updateResearchPaneTab={updateResearchPaneTab}
                          setLegsContainerExpanded={setLegsContainerExpanded}
                          AIvalidation={AIvalidation}
                          AIvalidationIsLoading={AIvalidationIsLoading}
                          AIvalidationHasErrored={AIvalidationHasErrored}
                        />
                        <AgendaItemTimeline
                          unitedLoading={spinner}
                          setParentLoadingState={setAgendaItemTimelineLoading}
                          updateLegs={setLegs}
                          asgSepBid={asgSepBid}
                          activeAIL={activeAIL}
                          setActiveAIL={setActiveAIL}
                          location={location}
                          setLocation={setLocation}
                          efPos={efPosition}
                          agendaItemLegs={agendaItemLegs$}
                          isNewSeparation={isNewSeparation}
                          updateResearchPaneTab={updateResearchPaneTab}
                          setLegsContainerExpanded={setLegsContainerExpanded}
                          fullAgendaItemLegs={agendaItem?.legs || []}
                          readMode={readMode}
                          AIvalidation={AIvalidation}
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
                updateLegs={setLegs}
                activeAIL={activeAIL}
                location={location}
                setLocation={setLocation}
                clientData={employeeData$}
                clientError={employeeError}
                clientLoading={employeeLoading}
                perdet={id}
                ref={researchPaneRef}
                updateSelection={readMode ? () => {} : updateSelection}
                userSelections={userRemarks}
                legCount={legs.length}
                readMode={readMode}
              />
            </div>
          </div>
        )}
      </MediaQuery>
    </>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
