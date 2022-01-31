import { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { Tooltip } from 'react-tippy';
import AgendaItemResearchPane from '../AgendaItemResearchPane';
import BackButton from '../../BackButton';

const AgendaItemMaintenanceContainer = () => {
  const [legsContainerExpanded, setLegsContainerExpanded] = useState(false);

  function toggleExpand() {
    setLegsContainerExpanded(!legsContainerExpanded);
  }

  const rotate = legsContainerExpanded ? 'rotate(0)' : 'rotate(-180deg)';

  return (
    <div className="agenda-item-maintenance-container">
      <BackButton />
      <div className="ai-maintenance-containers">
        <div className={`maintenance-container-left${legsContainerExpanded ? '-expanded' : ''}`}>
          Left Maintenance Container
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
          <AgendaItemResearchPane />
        </div>
      </div>
    </div>
  );
};

export default AgendaItemMaintenanceContainer;
