import PropTypes from 'prop-types';

const InputActions = (props) => {
  const { keys, handleDefaultClear, getCableValue, paragraphSelections, paragraphDefault } = props;

  const isDefault = () => {
    if (keys.includes('PARAGRAPHS')) {
      return paragraphSelections.sort().join(',') === paragraphDefault.sort().join(',');
    }
    let def = true;
    keys.forEach(key => {
      const value = getCableValue(key, true);
      if ((value?.NME_OVERRIDE_CLOB !== '' && value?.NME_CLEAR_IND === 'N') || value?.NME_CLEAR_IND === 'Y') {
        def = false;
      }
    });
    return def;
  };

  const isClear = () => {
    if (keys.includes('PARAGRAPHS')) {
      return paragraphSelections.length === 0;
    }
    let clear = true;
    keys.forEach(key => {
      const value = getCableValue(key, true);
      if (value?.NME_CLEAR_IND === 'N') {
        clear = false;
      }
    });
    return clear;
  };

  return (
    <div className="input-actions">
      <div>
        <input
          type="radio"
          id="default"
          name="default"
          checked={isDefault()}
          onChange={() => handleDefaultClear(keys)}
        />
        <label htmlFor="default">Default</label>
      </div>
      <div>
        <input
          type="radio"
          id="clear"
          name="clear"
          checked={isClear()}
          onChange={() => handleDefaultClear(keys, true)}
        />
        <label htmlFor="clear">Clear All</label>
      </div>
    </div>
  );
};

InputActions.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
  paragraphSelections: PropTypes.arrayOf(PropTypes.string),
  paragraphDefault: PropTypes.arrayOf(PropTypes.string),
};

InputActions.defaultProps = {
  paragraphSelections: [],
  paragraphDefault: [],
};

export default InputActions;
