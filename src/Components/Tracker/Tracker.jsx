import { TRACKER_DATA } from 'Constants/PropTypes';
import FA from 'react-fontawesome';

const Tracker = (props) => {
  const { data } = props;

  return (
    <ul className="tracker">
      {
        data.map(d => {
          const { isActive = false, isCurrent = false, description = '', label = '' } = d;
          return (
            <li key={label}>
              <div className={`step ${isActive ? 'active' : ''}`}>
                <div className={`bar ${isCurrent ? 'current' : ''}`} />
                <div className="icon">
                  {isCurrent ? <FA className="fa-sm" name="check" /> : ''}
                </div>
              </div>
              <div className="step-label">
                {label}
              </div>
              <div className="step-description">
                {description}
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

Tracker.propTypes = {
  data: TRACKER_DATA,
};

Tracker.defaultProps = {
  data: [],
};

export default Tracker;
