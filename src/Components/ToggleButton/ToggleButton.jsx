import PropTypes from 'prop-types';
import Switch from 'react-switch';

const ToggleButton = props => {
  const { labelTextLeft, labelTextRight, labelSameLine, checked,
    onChange, height, width, onColor, offColor, checkedIcon, uncheckedIcon,
    onHandleColor, offHandleColor, boxShadow, activeBoxShadow } = props;

  const style = {
    display: 'flex',
    alignItems: 'center',
  };

  const labelStyle = {
    margin: '0 10px 0 10px',
    fontSize: height - (height / 5),
  };

  const labelLeft = labelTextLeft ? <label style={labelStyle} className={labelSameLine ? 'toggle-button-label-inline' : ''} htmlFor={'toggleSwitch'}>{labelTextLeft}</label> : '';
  const labelRight = labelTextRight ? <label style={labelStyle} className={labelSameLine ? 'toggle-button-label-inline' : ''} htmlFor={'toggleSwitch'}>{labelTextRight}</label> : '';

  return (
    <div style={style}>
      {labelLeft}
      <Switch
        id="toggleSwitch"
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        height={height}
        width={width}
        checked={checked}
        onChange={onChange}
        onColor={onColor}
        offColor={offColor}
        onHandleColor={onHandleColor}
        offHandleColor={offHandleColor}
        boxShadow={boxShadow}
        activeBoxShadow={activeBoxShadow}
      />
      {labelRight}
    </div>
  );
};

ToggleButton.propTypes = {
  labelTextLeft: PropTypes.string,
  labelTextRight: PropTypes.string,
  labelSameLine: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  checkedIcon: PropTypes.bool,
  uncheckedIcon: PropTypes.bool,
  onHandleColor: PropTypes.string,
  offHandleColor: PropTypes.string,
  boxShadow: PropTypes.string,
  activeBoxShadow: PropTypes.string,
};

ToggleButton.defaultProps = {
  labelText: '',
  labelToLeft: true,
  labelTextLeft: '',
  labelTextRight: '',
  labelSameLine: true,
  checked: false,
  checkedIcon: false,
  uncheckedIcon: false,
  height: 20,
  width: 40,
  onColor: '#008800',
  offColor: '#888888',
  onHandleColor: '#ffffff',
  offHandleColor: '#ffffff',
  boxShadow: '',
  activeBoxShadow: '',
};

export default ToggleButton;
