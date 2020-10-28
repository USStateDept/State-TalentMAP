import PropTypes from 'prop-types';

const TextEditorSubmit = ({ submit, cancel, submitProps, cancelProps }) => (
  <div>
    <button className="usa-button" onClick={submit} {...submitProps}>Submit</button>
    <button className="usa-button-secondary" onClick={cancel} {...cancelProps}>Cancel</button>
  </div>
);

TextEditorSubmit.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  submitProps: PropTypes.shape({}),
  cancelProps: PropTypes.shape({}),
};

TextEditorSubmit.defaultProps = {
  submitProps: {},
  cancelProps: {},
};

export default TextEditorSubmit;
