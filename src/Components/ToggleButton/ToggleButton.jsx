import PropTypes from 'prop-types';
import Switch from 'react-switch';

const ToggleButton = props => {
  const { labelText, labelToLeft, labelSameLine, checked,
    onChange, height, width, onColor } = props;

  const style = {
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyle = {
    margin: '0 10px 0 10px',
    fontSize: height - (height / 5),
  };

  let labelLeft = <label style={labelStyle} className={labelSameLine ? 'toggle-button-label-inline' : ''} htmlFor={'toggleSwitch'}>{labelText}</label>;
  let labelRight = <label style={labelStyle} className={labelSameLine ? 'toggle-button-label-inline' : ''} htmlFor={'toggleSwitch'}>{labelText}</label>;

  if (labelToLeft) labelRight = '';
  else labelLeft = '';

  return (
    <div style={style}>
      {labelLeft}
      <Switch
        id="toggleSwitch"
        checkedIcon={false}
        uncheckedIcon={false}
        height={height}
        width={width}
        checked={checked}
        onChange={onChange}
        onColor={onColor}
      />
      {labelRight}
    </div>
  );
};

ToggleButton.propTypes = {
  labelText: PropTypes.string,
  labelToLeft: PropTypes.bool,
  labelSameLine: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  onColor: PropTypes.string,
};

ToggleButton.defaultProps = {
  labelText: '',
  labelToLeft: true,
  labelSameLine: true,
  checked: false,
  height: 20,
  width: 40,
  onColor: '#1ad142',
};

export default ToggleButton;
