import { useState } from 'react';

const MonthYearDropdown = (date) => {
  const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Generate years from current year up to 10 years in the future
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

  const handleMonthChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(months.indexOf(e.target.value));
    newDate.setDate(1);
    setSelectedDate(newDate);
  };

  // Handle year change
  const handleYearChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(e.target.value);
    newDate.setDate(1);
    setSelectedDate(newDate);
  };

  return (
    <div>
      <select value={months[selectedDate.getMonth()]} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {months.map((month) => (
          <option value={month}>{month}</option>
        ))}
      </select>
      <select value={selectedDate.getFullYear()} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearDropdown;
