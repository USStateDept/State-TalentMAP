import React, { PropTypes } from 'react';

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
  errors: PropTypes.arrayOf( // eslint-disable-line
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
};

export default Errors;
