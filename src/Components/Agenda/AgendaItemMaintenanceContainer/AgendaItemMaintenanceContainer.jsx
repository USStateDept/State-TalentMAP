import { useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import { Link } from 'react-router-dom';
import { useDataLoader } from 'hooks';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
// import ProfileSectionTitle from '../../ProfileSectionTitle';
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
  const { data } = useDataLoader(api().get, `/fsbid/client/${id}/`);
  const title = get(data, 'data.shortened_name') ?
    `${data.data.shortened_name} (Panel and Agenda Item Maintenance)` : 'Panel and Agenda Item Maintenance';

  const updateResearchPaneTab = tabID => {
    researchPaneRef.current.setSelectedNav(tabID);
  };

  const openRemarksResearchTab = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(RemarksGlossaryTabID);
  };

  return (
    <>
      <div>
        <div className="aim-container-header">
          {isCDO ?
            <Link to={`/profile/public/${id}`}>
              <div className="aim-container-title">
                <FontAwesome
                  name="calendar"
                  size="lg"
                />
                <span className="aim-title">
                  {title}
                </span>
              </div>
            </Link> :
            <div className="aim-container-title">
              <FontAwesome
                name="calendar"
                size="lg"
              />
              {title}
            </div> }
        </div>
        <MediaQuery breakpoint="screenXlgMin" widthType="max">
          {matches => (
            <div className={`ai-maintenance-container${matches ? ' stacked' : ''}`}>
              <div className={`maintenance-container-left${(legsContainerExpanded || matches) ? '-expanded' : ''}`}>
                <AgendaItemMaintenancePane leftExpanded={(legsContainerExpanded || matches)} />
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
                <AgendaItemResearchPane perdet={id} />
              </div>
            </div>
          )}
        </MediaQuery>
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
    </>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
