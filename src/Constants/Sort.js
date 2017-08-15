const POSITION_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Select a sort option', disabled: true },
    { value: 'grade', text: 'Grade (Low to High)' },
    { value: 'position_number', text: 'Position Number (0 - Z)' },
    { value: 'create_date', text: 'Position Posted Date (New - Old)' },
    { value: 'post__has_service_needs_differential', text: 'Service Need Differential (T - F)' },
    { value: 'bureau__description', text: 'Bureau (A - Z)' },
  ],
};

POSITION_SEARCH_SORTS.defaultSort = POSITION_SEARCH_SORTS.options[0].value;

export default POSITION_SEARCH_SORTS;
