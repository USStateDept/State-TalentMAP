import { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import MediaQuery from 'Components/MediaQuery';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';
import AgendaItemTimeline from '../AgendaItemTimeline';

const AgendaItemMaintenanceContainer = (props) => {
  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet

  return (
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
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
