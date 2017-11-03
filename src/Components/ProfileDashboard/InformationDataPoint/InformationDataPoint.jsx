import React from 'react';
import PropTypes from 'prop-types';

const InformationDataPoint = ({ title, content, className }) => (
  <div className={`usa-grid-full data-point-container ${className}`}>
    {
      !!title.length &&
        <div className="data-point-title">
          {title}
        </div>
    }
    <div className="data-point-content">
      {content}
    </div>
  </div>
);

InformationDataPoint.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
};

InformationDataPoint.defaultProps = {
  title: '',
  className: '',
};

export default InformationDataPoint;
