import { useRef, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import { Link } from 'react-router-dom';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import { RG as RemarksGlossaryTabID } from '../AgendaItemResearchPane/AgendaItemResearchPane';

const AgendaItemMaintenanceContainer = (props) => {
  const researchPaneRef = useRef();

  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);

  const isCDO = get(props, 'isCDO');
  const bidder = 'LastName, FirstName';
  const perdet = 6;

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet

  const updateResearchPaneTab = tabID => {
    researchPaneRef.current.setSelectedNav(tabID);
  };

  const openRemarksResearchTab = () => {
    setLegsContainerExpanded(false);
    updateResearchPaneTab(RemarksGlossaryTabID);
  };

  return (
    <div className="padded-main-content results-single-search homepage-offset">
      <div className="usa-grid-full results-search-bar-container">
        <ProfileSectionTitle title="Panel and Agenda Item Maintenance" icon="calendar" />
        <MediaQuery breakpoint="screenXlgMin" widthType="max">
          {matches => (
            <div className={`ai-maintenance-container${matches ? ' stacked' : ''}`}>
              <div className={`maintenance-container-left${(legsContainerExpanded || matches) ? '-expanded' : ''}`}>
                <AgendaItemMaintenancePane leftExpanded={(legsContainerExpanded || matches)} />
                <h3>
                  {isCDO ? <Link to={`/profile/public/${perdet}`}>{bidder}</Link> : bidder}
                </h3>
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
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
