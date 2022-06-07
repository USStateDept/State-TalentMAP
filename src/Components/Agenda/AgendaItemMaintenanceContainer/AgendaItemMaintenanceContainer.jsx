import { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import Spinner from 'Components/Spinner';
import { Link } from 'react-router-dom';
import { useDataLoader } from 'hooks';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';
import api from '../../../api';

const AgendaItemMaintenanceContainer = (props) => {
  const researchPaneRef = useRef();

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);
  const [agendaItemMaintenancePaneLoading, setAgendaItemMaintenancePaneLoading] = useState(true);
  const [agendaItemTimelineLoading, setAgendaItemTimelineLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet
  const isCDO = get(props, 'isCDO');
  const { data } = useDataLoader(api().get, `/fsbid/client/${id}/`);
  const client = get(data, 'data.name') || '';

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
          {isCDO ?
            <span className="aim-title-dash">
                -
              <Link to={`/profile/public/${id}`}>
                <span className="aim-title">
                  {` ${client}`}
                </span>
              </Link>
            </span>
            :
            <span>
              {` - ${client}`}
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
                setParentState={setAgendaItemMaintenancePaneLoading}
              />
              <AgendaItemTimeline
                unitedLoading={spinner}
                setParentState={setAgendaItemTimelineLoading}
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
              <AgendaItemResearchPane perdet={id} ref={researchPaneRef} />
            </div>
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
