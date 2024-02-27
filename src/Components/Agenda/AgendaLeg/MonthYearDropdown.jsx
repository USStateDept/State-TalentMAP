import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MonthYearDropdown = ({ date, updateDropdown, dropdownType }) => {
  const [selectedMonth, setSelectedMonth] = useState(date ? new Date(date).getMonth() : null);
  const [selectedYear, setSelectedYear] = useState(date ? new Date(date).getFullYear() : null);
  console.log('selectedYear', selectedYear);
  console.log('year', new Date(date).getFullYear());

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      // Day should always be set to the first of the month per FSBID
      const newDate = new Date(selectedYear, selectedMonth, 1);
      updateDropdown(dropdownType, newDate);
    }
  }, [selectedMonth, selectedYear]);

  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  // Generate years from current year up to 10 years in the future and 10 years past
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => (currentYear - 10) + index);

  return (
    <div className="month-year-dropdown-wrapper">
      <select className="leg-dropdown" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Month</option>
        {months.map((month, idx) => (
          <option value={idx}>{month}</option>
        ))}
      </select>
      <select className="leg-dropdown" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

MonthYearDropdown.propTypes = {
  date: PropTypes.string,
  updateDropdown: PropTypes.func.isRequired,
  dropdownType: PropTypes.string.isRequired,
};

MonthYearDropdown.defaultProps = {
  date: '',
};

export default MonthYearDropdown;
