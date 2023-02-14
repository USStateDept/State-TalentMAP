import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import InteractiveElement from 'Components/InteractiveElement';
import { filter, find, get, has, isNil } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import { aiCreate } from 'actions/agendaItemMaintenancePane';
import { useDataLoader } from 'hooks';
import shortid from 'shortid';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import api from '../../../api';

const AgendaItemMaintenanceContainer = (props) => {
  const dispatch = useDispatch();

  const researchPaneRef = useRef();

  const agendaItem = {
    id: 962,
    remarks: [
      {
        text: 'Reassignment at post',
        type: null,
        seq_num: 291,
        rc_code: 'M',
        order_num: 17,
        short_desc_text: 'reassign at post',
        mutually_exclusive_ind: 'N',
        active_ind: 'Y',
        remark_inserts: [],
      },
      {
        text: 'SND Post',
        type: null,
        seq_num: 294,
        rc_code: 'N',
        order_num: 1,
        short_desc_text: 'SND Post',
        mutually_exclusive_ind: 'N',
        active_ind: 'Y',
        remark_inserts: [],
      },
      {
        text: 'Continues SND eligibility',
        type: null,
        seq_num: 160,
        rc_code: 'N',
        order_num: 4,
        short_desc_text: 'snd continues',
        mutually_exclusive_ind: 'N',
        active_ind: 'Y',
        remark_inserts: [],
      },
      {
        text: 'Creator(s):Townpost, Jenny',
        type: 'person',
      },
      {
        text: 'Modifier(s):WoodwardWA',
        type: 'person',
      },
      {
        text: 'CDO: Rehman, Tarek S',
        type: 'person',
      },
    ],
    panel_date: '2011-08-10T03:17:08.430000Z',
    status_full: 'Deferred',
    status_short: 'DEF',
    perdet: 4,
    assignment: {
      id: 17,
      pos_title: 'SEC (POL)',
      pos_num: '10157002',
      org: 'IIP',
      eta: '2015-09-07T00:00:00.000Z',
      ted: '2016-02-01T00:00:00',
      tod: '2 YRS/TRANSFER',
      grade: 'MC',
      languages: [
        {
          language: 'HUNGARIAN',
          spoken_proficiency: '3',
          reading_proficiency: '3',
          code: 'HU',
          representation: 'HUNGARIAN (HU) 3/3',
        },
        {
          language: 'ARABIC EGYPTIAN',
          spoken_proficiency: '2',
          reading_proficiency: '2',
          code: 'AE',
          representation: 'ARABIC EGYPTIAN (AE) 2/2',
        },
      ],
    },
    legs: [
      {
        id: 17,
        pos_title: 'SEC (POL)',
        pos_num: '10157002',
        org: 'IIP',
        eta: '2015-09-07T00:00:00.000Z',
        ted: '2023-05-01T00:00:00',
        tod: '2 YRS/TRANSFER',
        grade: 'MC',
        languages: [
          {
            language: 'HUNGARIAN',
            spoken_proficiency: '3',
            reading_proficiency: '3',
            code: 'HU',
            representation: 'HUNGARIAN (HU) 3/3',
          },
          {
            language: 'ARABIC EGYPTIAN',
            spoken_proficiency: '2',
            reading_proficiency: '2',
            code: 'AE',
            representation: 'ARABIC EGYPTIAN (AE) 2/2',
          },
        ],
      },
      {
        id: 962,
        pos_title: 'RETIREMENT',
        pos_num: 'N/A',
        org: 'IIP',
        eta: '2015-09-07T00:00:00.000Z',
        ted: '2016-03-07T00:00:00.000Z',
        tod: '2 YRS/TRANSFER',
        grade: 'MC',
        languages: [
          {
            language: 'HUNGARIAN',
            spoken_proficiency: '3',
            reading_proficiency: '3',
            code: 'HU',
            representation: 'HUNGARIAN (HU) 3/3',
          },
          {
            language: 'ARABIC EGYPTIAN',
            spoken_proficiency: '2',
            reading_proficiency: '2',
            code: 'AE',
            representation: 'ARABIC EGYPTIAN (AE) 2/2',
          },
        ],
        action: 'Retire',
        travel: null,
      },
      {
        id: 962,
        pos_title: 'INFORMATION MANAGEMENT SPEC',
        pos_num: '51274000',
        org: 'M/OBO',
        eta: '2016-04-07T00:00:00.000Z',
        ted: '2016-06-07T00:00:00.000Z',
        tod: '1 YR (1 R & R)',
        grade: '07',
        languages: [
          {
            language: 'HUNGARIAN',
            spoken_proficiency: '3',
            reading_proficiency: '3',
            code: 'HU',
            representation: 'HUNGARIAN (HU) 3/3',
          },
          {
            language: 'ARABIC EGYPTIAN',
            spoken_proficiency: '2',
            reading_proficiency: '2',
            code: 'AE',
            representation: 'ARABIC EGYPTIAN (AE) 2/2',
          },
        ],
        action: 'Reappoint',
        travel: null,
      },
      {
        id: 962,
        pos_title: 'POLITICAL OFFICER',
        pos_num: '10112136',
        org: 'S',
        eta: '2016-07-07T00:00:00.000Z',
        ted: '2016-11-07T00:00:00.000Z',
        tod: '1 YR(3R&R)/HL/1 YR(3R&R)',
        grade: '01',
        languages: [
          {
            language: 'HUNGARIAN',
            spoken_proficiency: '3',
            reading_proficiency: '3',
            code: 'HU',
            representation: 'HUNGARIAN (HU) 3/3',
          },
          {
            language: 'ARABIC EGYPTIAN',
            spoken_proficiency: '2',
            reading_proficiency: '2',
            code: 'AE',
            representation: 'ARABIC EGYPTIAN (AE) 2/2',
          },
        ],
        action: 'Chg Sep Dt',
        travel: null,
      },
    ],
    update_date: null,
    modifier_name: 8,
    creator_name: 13,
    creators: [
      {
        hruempseqnbr: null,
        hruneuid: 87496,
        hruid: 65426,
        neuid: 87496,
        neulastnm: 'Woodward',
        neufirstnm: 'Wendy',
        neumiddlenm: 'Cléopatre',
        empUser: [
          {
            perpiifirstname: 'Jenny',
            perpiilastname: 'Townpost',
            perpiiseqnum: 9852,
            perpiimiddlename: 'Yénora',
            perpiisuffixname: ' ',
            perdetseqnum: 642572,
            persdesc: 'Retired',
          },
        ],
      },
    ],
    updaters: {
      emp_seq_num: null,
      neu_id: 87496,
      hru_id: 65426,
      last_name: 'Woodward',
      first_name: 'Wendy',
      middle_name: 'Cléopatre',
      emp_user: {
        emp_user_first_name: 'Jenny',
        emp_user_last_name: 'Townpost',
        emp_user_seq_num: 9852,
        emp_user_middle_name: 'Yénora',
        emp_user_suffix_name: ' ',
        perdet_seqnum: 642572,
        per_desc: 'Retired',
      },
    },
  };

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');
  const isCreate = get(props, 'isCreate');
  const client_data = useDataLoader(api().get, `/fsbid/client/${id}/`);

  const agendaItemLegs = get(agendaItem, 'legs') || [];
  const agendaItemLegs$ = agendaItemLegs.map(ail => ({
    ...ail,
    ail_seq_num: shortid.generate(),
  }));

  const agendaItemRemarks = get(agendaItem, 'remarks') || [];
  const agendaItemRemarks$ = filter(agendaItemRemarks, remark => remark.type !== 'person');

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);
  const [agendaItemMaintenancePaneLoading, setAgendaItemMaintenancePaneLoading] = useState(true);
  const [agendaItemTimelineLoading, setAgendaItemTimelineLoading] = useState(true);
  const [legs, setLegs] = useState([]);
  const [maintenanceInfo, setMaintenanceInfo] = useState([]);
  const [asgSepBid, setAsgSepBid] = useState({}); // pass through from AIMPane to AITimeline
  const [userRemarks, setUserRemarks] = useState(isCreate ? [] : agendaItemRemarks$);
  const [spinner, setSpinner] = useState(true);

  const { data: asgSepBidResults, error: asgSepBidError, loading: asgSepBidLoading } = useDataLoader(api().get, `/fsbid/employee/assignments_separations_bids/${id}/`);
  const asgSepBidResults$ = get(asgSepBidResults, 'data') || [];
  const asgSepBidData = { asgSepBidResults$, asgSepBidError, asgSepBidLoading };
  const efPosition = find(asgSepBidResults$, ['status', 'EF']) || {};

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
          <div className={`ai-maintenance-container${matches ? ' stacked' : ''}`}>
            <div className={`maintenance-container-left${(legsContainerExpanded || matches) ? '-expanded' : ''}`}>
              {
                spinner &&
                  <Spinner type="left-pane" size="small" />
              }
              <AgendaItemMaintenancePane
                onAddRemarksClick={openRemarksResearchTab}
                perdet={id}
                unitedLoading={spinner}
                setParentLoadingState={setAgendaItemMaintenancePaneLoading}
                updateSelection={updateSelection}
                sendMaintenancePaneInfo={setMaintenanceInfo}
                sendAsgSepBid={setAsgSepBid}
                asgSepBidData={asgSepBidData}
                userRemarks={userRemarks}
                legCount={legs.length}
                saveAI={submitAI}
                agendaItem={agendaItem}
                isCreate={isCreate}
              />
              <AgendaItemTimeline
                unitedLoading={spinner}
                setParentLoadingState={setAgendaItemTimelineLoading}
                updateLegs={setLegs}
                asgSepBid={asgSepBid}
                efPos={efPosition}
                agendaItemLegs={agendaItemLegs$}
                isCreate={isCreate}
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
                legCount={legs.length}
              />
            </div>
          </div>
        )}
      </MediaQuery>
    </>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
