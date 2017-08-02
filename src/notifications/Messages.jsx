import React from 'react';
import PropTypes from 'prop-types';

// Iterate over each message object and print them
// in an unordered list
const Messages = (props) => {
  const { messages } = props;
  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.time}>{message.body}</li>
        ))}
      </ul>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      time: PropTypes.date,
    })),
};

Messages.defaultProps = {
  messages: [{ body: null, time: null }],
};

export default Messages;
