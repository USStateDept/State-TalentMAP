import React from 'react';
import PropTypes from 'prop-types';

const InformationDataPoint = ({ title, content, className, titleOnBottom, sideBySide }) => {
  const titleBody = (
  !!title.length &&
    <div className="data-point-title">
      {title}
    </div>
  );
  const contentBody = (
    <div className="data-point-content">
      {content}
    </div>
  );
  const topContent = titleOnBottom ? contentBody : titleBody;
  const bottomContent = titleOnBottom ? titleBody : contentBody;
  return (
    <div className={`usa-grid-full data-point-container ${sideBySide ? 'data-point-side-by-side' : ''} ${className}`}>
      {topContent}
      {bottomContent}
    </div>
  );
};

InformationDataPoint.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
  titleOnBottom: PropTypes.bool,
  sideBySide: PropTypes.bool,
};

InformationDataPoint.defaultProps = {
  title: '',
  className: '',
  titleOnBottom: false,
  sideBySide: false,
};

export default InformationDataPoint;
