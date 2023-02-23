import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const Tracker = (props) => {
  const { data } = props;

  return (
    <ul className="tracker">
      {
        data.map(d => {
          const { isActive = false, isCurrent = false } = d;
          return (
            <li>
              <div className={`step ${isActive ? 'active' : ''}`}>
                <div className={`bar ${isCurrent ? 'current' : ''}`} />
                <div className="icon">
                  {isCurrent ? <FA className="fa-sm" name="check" /> : ''}
                </div>
              </div>
              <div className="step-label">
                {d.label}
              </div>
              <div className="step-description">
                {d.description}
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

Tracker.propTypes = {
  data: PropTypes.shape([]),
};

Tracker.defaultProps = {
  data: [],
};

export default Tracker;
