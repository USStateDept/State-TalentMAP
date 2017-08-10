const POSITION_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Select a sort option', disabled: true },
    { value: 'sort_placeholder_1', text: 'Position Posted Date (New - Old)' },
    { value: 'sort_placeholder_2', text: 'Service Need Differential (T - F)' },
    { value: 'sort_placeholder_3', text: 'Bureau (A - Z)' },
  ],
};

POSITION_SEARCH_SORTS.defaultSort = POSITION_SEARCH_SORTS.options[0].value;

export default POSITION_SEARCH_SORTS;
