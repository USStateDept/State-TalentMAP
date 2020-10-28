import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const IsPriority = ({ isApproved, children }) => (
  <div className={`usa-grid-full bid-tracker-priority-wrapper-container ${isApproved ? 'bid-tracker-priority-wraper--aproved' : ''}`}>
    <div className="usa-grid-full bid-tracker-priority-wrapper">
      <div className="usa-grid-full padded-container-inner priority-banner">
        <div className="usa-width-one-half priority-banner-container-left">
          {isApproved ? 'Assignment' : 'Pending Assignment'}
        </div>
        <div className="usa-width-one-half priority-banner-container-right">
          <div className="priority-banner-question-text">
            {!isApproved && <span><FontAwesome name="question-circle" /> What is a Pending Assignment?</span>}
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
);

IsPriority.propTypes = {
  isApproved: PropTypes.bool,
  children: PropTypes.node.isRequired, // child element
};

IsPriority.defaultProps = {
  isApproved: false,
};

export default IsPriority;
