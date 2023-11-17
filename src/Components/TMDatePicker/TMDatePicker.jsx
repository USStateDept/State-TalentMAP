import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const TMDatePicker = ({
  selected,
  onChange,
  value,
  selectsRange,
  showTimeSelect,
  showMonthDropdown,
  showYearDropdown,
  placeholderText,
  showIcon,
  icon,
  wrapperClassName,
  datePickerClassName,
  isClearable,
}) =>
  (
    <>
      <div className={`tm-daterange-wrapper-${wrapperClassName}`}>
        {showIcon && icon}
        <DatePicker
          selected={selected}
          onChange={onChange}
          selectsRange={selectsRange}
          showTimeSelect={showTimeSelect}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          startDate={selectsRange ? value[0] : null}
          endDate={selectsRange ? value[1] : null}
          isClearable={isClearable}
          dropdownMode="select"
          className={`tm-daterange-${datePickerClassName}`}
          placeholderText={placeholderText}
        />
      </div>
    </>
  )
;

export default TMDatePicker;

TMDatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date),
  wrapperClassName: PropTypes.string,
  datePickerClassName: PropTypes.string,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  placeholderText: PropTypes.string,
  selectsRange: PropTypes.bool,
  showIcon: PropTypes.bool,
  icon: PropTypes.element,
  isClearable: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
};

TMDatePicker.defaultProps = {
  value: [null, null],
  selected: null,
  wrapperClassName: '',
  datePickerClassName: '',
  showMonthDropdown: false,
  showYearDropdown: false,
  placeholderText: 'Select Date',
  selectsRange: false,
  showIcon: false,
  icon: <></>,
  isClearable: false,
  showTimeSelect: false,
};
