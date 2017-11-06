import React from 'react';
import PropTypes from 'prop-types';

const BorderedList = ({ contentArray }) => {
  const mappedContent = contentArray.slice().map(content => (
    <li>
      <div className="bordered-list-content">
        {content}
      </div>
    </li>
    ));
  return (
    <div className="usa-grid-full bordered-list">
      <ul>
        {mappedContent}
      </ul>
    </div>
  );
};

BorderedList.propTypes = {
  contentArray: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default BorderedList;
