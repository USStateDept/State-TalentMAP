import { useState } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';

const InputActions = (props) => {
  const { handleDefault, handleClear } = props;
  const [inputAction, setInputAction] = useState();

  const handleInputActionChange = (type) => {
    if (type === 'default') {
      handleDefault();
      setInputAction('default');
    } else if (type === 'clear') {
      handleClear();
      setInputAction('clear');
    }
  };

  return (
    <div className="input-actions">
      <div>
        <input
          type="radio"
          id="default"
          name="default"
          checked={inputAction === 'default'}
          onClick={() => handleInputActionChange('default')}
        />
        <label htmlFor="default">Default</label>
      </div>
      <div>
        <input
          type="radio"
          id="clear"
          name="clear"
          checked={inputAction === 'clear'}
          onClick={() => handleInputActionChange('clear')}
        />
        <label htmlFor="clear">Clear All</label>
      </div>
    </div>
  );
};

InputActions.propTypes = {
  handleDefault: PropTypes.func,
  handleClear: PropTypes.func,
};

InputActions.defaultProps = {
  handleDefault: EMPTY_FUNCTION,
  handleClear: EMPTY_FUNCTION,
};

export default InputActions;
