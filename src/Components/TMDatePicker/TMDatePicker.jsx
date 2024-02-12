import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import FA from 'react-fontawesome';

const TMDatePicker = ({
  selected,
  onChange,
  type,
  value,
  selectsRange,
  showTimeSelect,
  showMonthDropdown,
  showYearDropdown,
  placeholderText,
  showIcon,
  icon,
  isClearable,
  excludeDates,
}) => {
  const typeClasses = {
    filter: {
      wrapper: 'larger-date-picker',
      datePicker: 'tm-date-picker-range',
    },

  };
  return (
    <div className={`tm-datepicker-wrapper ${typeClasses[type].wrapper}`}>
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
        className={`tm-datepicker ${typeClasses[type].datePicker}`}
        placeholderText={placeholderText}
        excludeDates={excludeDates}
      />
    </div>
  );
}
;

export default TMDatePicker;

TMDatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date),
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  placeholderText: PropTypes.string,
  selectsRange: PropTypes.bool,
  showIcon: PropTypes.bool,
  icon: PropTypes.element,
  isClearable: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

TMDatePicker.defaultProps = {
  value: [null, null],
  selected: null,
  showMonthDropdown: false,
  showYearDropdown: false,
  placeholderText: 'Select Date',
  selectsRange: false,
  showIcon: false,
  icon: <FA name="fa fa-calendar" />,
  isClearable: false,
  showTimeSelect: false,
  excludeDates: [],
};
