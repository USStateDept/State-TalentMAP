import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const TMDateRangePicker = ({
  value,
  onChange,
  wrapperClassName,
  datePickerClassName,
  showMonthDropdown,
  showYearDropdown,
  placeholderText,
}) => {
  const [startDate, endDate] = value;

  return (
    <>
      <div className={`tm-daterange-wrapper-${wrapperClassName}`}>
        <DatePicker
          isClearable
          selectsRange
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode="select"
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          className={`tm-daterange-${datePickerClassName}`}
          placeholderText={placeholderText}
        />
      </div>
    </>
  );
};

export default TMDateRangePicker;

TMDateRangePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onChange: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string,
  datePickerClassName: PropTypes.string,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  placeholderText: PropTypes.string,
};

TMDateRangePicker.defaultProps = {
  value: [null, null],
  wrapperClassName: '',
  datePickerClassName: '',
  showMonthDropdown: false,
  showYearDropdown: false,
  placeholderText: 'Select Date Range',
};
