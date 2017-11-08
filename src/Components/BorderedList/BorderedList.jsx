import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';

// allows us to take an arbitrary array of elements and place them inside a list
const BorderedList = ({ contentArray }) => {
  const mappedContent = contentArray.slice().map(content => (
    // take the parentClassName prop as the class
    <li key={shortId.generate()} className={content.props.parentClassName}>
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
