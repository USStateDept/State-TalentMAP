import PropTypes from 'prop-types';
import FA from 'react-fontawesome';

const Tracker = (props) => {
  const { data } = props;

  return (
    <ul className="tracker">
      <div className="bar" />
      {
        data.map(d => (
          <li>
            <div className={`step ${d.isActive ? 'active' : ''}`}>
              <div className="icon">
                {d.isActive ? <FA className="fa-sm" name="check" /> : ''}
              </div>
            </div>
            <div className="step-label">
              {d.label}
            </div>
            <div className="step-description">
              {d.description}
            </div>
          </li>
        ))
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
