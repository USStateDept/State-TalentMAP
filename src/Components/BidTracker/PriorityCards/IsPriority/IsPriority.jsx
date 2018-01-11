import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const IsPriority = ({ children }) => (
  <div className="usa-grid-full bid-tracker-priority-wrapper-container">
    <div className="usa-grid-full bid-tracker-priority-wrapper">
      <div className="usa-grid-full padded-container-inner priority-banner">
        <div className="usa-width-one-half priority-banner-container-left">
          Priority Assignment
        </div>
        <div className="usa-width-one-half priority-banner-container-right">
          <div className="priority-banner-question-text">
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
