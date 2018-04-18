import { COMMON_PROPERTIES } from './EndpointParams';

export const POSITION_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'title', text: 'Position title: A-Z' },
    { value: '-grade', text: 'Grade: Low to high' }, // sort by grade "ranking"
    { value: '-bureau', text: 'Bureau: A-Z' }, // numbers first, then A-Z
    { value: `-${COMMON_PROPERTIES.posted}`, text: 'Posted date: Most recent' }, // sort by soonest posted_date
    { value: 'current_assignment__estimated_end_date', text: 'TED: Soonest' },
    { value: 'position_number', text: 'Position number: Low to high' }, // numbers first, then A-Z
    { value: '-post__has_service_needs_differential', text: 'Service need' }, // sort by service needs first
  ],
};

POSITION_SEARCH_SORTS.defaultSort = POSITION_SEARCH_SORTS.options.find(o =>
  o.value === 'current_assignment__estimated_end_date',
).value;

export const POSITION_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
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

export const SAVED_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'name', text: 'Name: A-Z' },
    { value: '-date_updated', text: 'Date created: Most recent' },
  ],
};

SAVED_SEARCH_SORTS.defaultSort = SAVED_SEARCH_SORTS.options[0].value;
