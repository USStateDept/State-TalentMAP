import { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import AgendaItemMaintenancePane from '../AgendaItemMaintenancePane';

const AgendaItemMaintenanceContainer = (props) => {
  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  const id = get(props, 'match.params.id'); // client's perdet

  return (
    <div className="agenda-item-maintenance-container">
      <div className="ai-maintenance-containers">
        <div className={`maintenance-container-left${legsContainerExpanded ? '-expanded' : ''}`}>
          <AgendaItemMaintenancePane leftExpanded={legsContainerExpanded} />
          <div className="expand-arrow">
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
        </div>
        <div className={`maintenance-container-right${legsContainerExpanded ? ' hidden' : ''}`}>
          <AgendaItemResearchPane perdet={id} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AgendaItemMaintenanceContainer);
