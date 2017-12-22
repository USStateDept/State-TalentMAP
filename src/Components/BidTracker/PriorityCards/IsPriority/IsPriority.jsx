import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const IsPriority = ({ children }) => (
  <div className="usa-grid-full bid-tracker-priority-wrapper-container">
    <div className="usa-grid-full bid-tracker-priority-wrapper">
      <div className="usa-grid-full padded-container-inner priority-banner">
        <div className="usa-width-one-half priority-banner-container-left" style={{ float: 'left', fontWeight: 'bold' }}>
          Priority Assignment
        </div>
        <div className="usa-width-one-half priority-banner-container-right" style={{ float: 'left', fontSize: '13px' }}>
          <div className="priority-banner-question-text" style={{ float: 'right', marginTop: '3px' }} >
            <FontAwesome name="question-circle" /> What is a priority Assignment?
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
);

IsPriority.propTypes = {
  children: PropTypes.node.isRequired, // child element
};

export default IsPriority;
