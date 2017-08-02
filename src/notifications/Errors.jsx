import React from 'react';
import PropTypes from 'prop-types';

// Iterate over each error object and print them
// in an unordered list
const Errors = (props) => {
  const { errors } = props;
  return (
    <div>
      <ul>
        {errors.map(error => (
          <li key={error.time}>{error.body}</li>
        ))}
      </ul>
    </div>
  );
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
};

Errors.defaultProps = {
  errors: [{ body: null, time: null }],
};

export default Errors;
