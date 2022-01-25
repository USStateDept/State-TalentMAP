import { useState } from 'react';
import BackButton from '../../BackButton';

const AgendaItemMaintenanceContainer = () => {
  const [view, setView] = useState(true);
  const text = view ? 'Dual View' : 'Single View';

  return (
    <div className="agenda-item-maintenace-container">
      <BackButton />
      <button onClick={() => setView(!view)}>
        {text}
      </button>
      <div>
        <div className={`maintenance-container-left${view ? '' : '-expanded'}`}>
          Left Maintenance Container
        </div>
        {
          view &&
          <div className="maintenance-container-right">
            Right Maintenance Container
          </div>
        }
      </div>
    </div>
  );
};

export default AgendaItemMaintenanceContainer;
