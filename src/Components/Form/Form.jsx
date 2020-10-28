import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const Form = ({ children, className, onFormSubmit, ...rest }) => (
  <form className={className} onSubmit={onFormSubmit} {...rest}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node.isRequired, // should be valid form children
  className: PropTypes.string,
  onFormSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  onFormSubmit: EMPTY_FUNCTION,
};

export default Form;
