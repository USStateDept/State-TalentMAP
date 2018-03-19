export const POSITION_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'title', text: 'Title' },
    { value: 'grade', text: 'Grade' },
    { value: 'position_number', text: 'Number' },
    { value: 'description__date_created', text: 'Posted Date' },
    { value: 'post__has_service_needs_differential', text: 'Service Need' },
    { value: 'bureau__long_description', text: 'Bureau' },
  ],
};

POSITION_SEARCH_SORTS.defaultSort = POSITION_SEARCH_SORTS.options[0].value;

export const POSITION_PAGE_SIZES = {
  options: [
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

POSITION_PAGE_SIZES.defaultSort = POSITION_PAGE_SIZES.options[0].value;

export const BID_PORTFOLIO_SORTS = {
  options: [
    { value: '', text: 'Default sorting' },
    { value: 'date_of_birth', text: 'Age' },
    { value: 'bid_statistics__handshake_offered', text: 'Priority Need' },
  ],
};

BID_PORTFOLIO_SORTS.defaultSort = BID_PORTFOLIO_SORTS.options[0].value;
