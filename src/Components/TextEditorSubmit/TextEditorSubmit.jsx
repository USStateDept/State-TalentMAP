import React from 'react';
import PropTypes from 'prop-types';

const TextEditorSubmit = ({ submit, cancel }) => (
  <div>
    <button className="usa-button" onClick={submit}>Submit</button>
    <button className="usa-button-secondary" onClick={cancel}>Cancel</button>
  </div>
);

TextEditorSubmit.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default TextEditorSubmit;
