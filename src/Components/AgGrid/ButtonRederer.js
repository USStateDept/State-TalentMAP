import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import InteractiveElement from 'Components/InteractiveElement';

const ButtonRenderer = (props) => {
  const { data, icon, label, onClick, className } = props;

  return (
    <InteractiveElement onClick={() => onClick(data)} className={className}>
      <FontAwesomeIcon icon={icon} />
      {label}
    </InteractiveElement>
  );
};

ButtonRenderer.propTypes = {
  data: PropTypes.shape({}),
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ButtonRenderer.defaultProps = {
  data: {},
  icon: null,
  label: '',
  className: '',
};

export default ButtonRenderer;
