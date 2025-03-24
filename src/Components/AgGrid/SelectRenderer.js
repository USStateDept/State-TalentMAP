import PropTypes from 'prop-types';

const SelectRenderer = (props) => {
  const { data, getData, getId, setData, className, options } = props;

  return (
    <select
      value={getData(data)}
      onChange={(e) => setData(e.target.value, getId(data))}
      className={className}
    >
      <option value="" />
      {options?.map(option => (
        <option value={option?.code} key={option?.code}>
          ({option.code}) {option.text}
        </option>
      ))}
    </select>
  );
};

SelectRenderer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setData: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

SelectRenderer.defaultProps = {
  className: '',
};

export default SelectRenderer;
