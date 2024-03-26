import { useState } from 'react';
import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';

const MergeAssignmentCycles = ({ cycles, onSave }) => {
  const [sourceCycle, setSourceCycle] = useState('');
  const [targetCycle, setTargetCycle] = useState('');

  const cancel = () => swal.close();
  const disableSave = sourceCycle && targetCycle;

  const mergeCycles = (e) => {
    e.preventDefault();
    onSave({ sourceCycle, targetCycle });
  };

  return (
    <>
      <form className="assignment-cycle-form" >
        <div>
          <label htmlFor="season">Source Cycle</label>
          <span className="bs-validation-container">
            <select
              id="sourceCycle"
              defaultValue=""
              onChange={(e) => setSourceCycle(e.target.value)}
              value={sourceCycle}
            >
              <option value="" />
              {cycles.map((cycle) => (
                cycle.status === 'Merge' &&
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.name}
                    </option>
              ))}
            </select>
          </span>
        </div>
        <div>
          <label htmlFor="season">Target Cycle</label>
          <span className="bs-validation-container">
            <select
              id="targetCycle"
              defaultValue=""
              onChange={(e) => setTargetCycle(e.target.value)}
              value={targetCycle}
            >
              <option value="" />
              {cycles.map((cycle) => (
                cycle.status === 'Active' &&
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.name}
                    </option>
              ))}
            </select>
          </span>
        </div>
        <div className="ac-buttons">
          <button onClick={mergeCycles} disabled={!disableSave}>Merge Cycles</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};

MergeAssignmentCycles.propTypes = {
  cycles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MergeAssignmentCycles;
