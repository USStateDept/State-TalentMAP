export const POSITION_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Select a sort option', disabled: true },
    { value: 'grade', text: 'Grade (Low to High)' },
    { value: 'position_number', text: 'Position Number (0 - Z)' },
    { value: 'create_date', text: 'Position Posted Date (New - Old)' },
    { value: 'post__has_service_needs_differential', text: 'Service Need Differential (T - F)' },
    { value: 'bureau__long_description', text: 'Bureau (A - Z)' },
  ],
};

POSITION_SEARCH_SORTS.defaultSort = POSITION_SEARCH_SORTS.options[0].value;

export const POSITION_PAGE_SIZES = {
  options: [
    { value: null, text: 'Select a page size', disabled: true },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

POSITION_PAGE_SIZES.defaultSort = POSITION_PAGE_SIZES.options[0].value;
