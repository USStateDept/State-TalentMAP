import PropTypes from 'prop-types';

const SelectRenderer = (props) => {
  const { data, setData, className, options } = props;

  return (
    <select
      value={data}
      onChange={(e) => setData(e.target.value)}
      className={className}
    >
      <option value="">None</option>
      {options?.map(option => (
        <option value={option?.code} key={option?.code}>
          {`(${option.code}) ${option.text}`}
        </option>
      ))}
    </select>
  );
};

SelectRenderer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  setData: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SelectRenderer.defaultProps = {
  className: '',
};

export default SelectRenderer;
