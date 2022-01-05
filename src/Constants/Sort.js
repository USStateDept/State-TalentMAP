import { filter } from 'lodash';

// BEGIN: KEEP THESE CONSTANTS TOGETHER IN THIS ORDER
const POSITION_SEARCH_SORTS$ = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'position__title', text: 'Position title: A-Z' },
    { value: '-position__grade', text: 'Grade: Low to high' }, // sort by grade "ranking"
    { value: '-position__bureau', text: 'Bureau: A-Z' }, // numbers first, then A-Z
    { value: '-posted_date', text: 'Posted date: Most recent', availableOnly: true }, // sort by soonest posted_date
    { value: 'posted_date', text: 'Posted date: Oldest', availableOnly: true }, // sort by oldest posted_date
    { value: 'ted', text: 'TED: Soonest' },
    { value: '-ted', text: 'TED: Latest' },
    { value: 'position__position_number', text: 'Position number: Low to high' }, // numbers first, then A-Z
    { value: '-position__post__has_service_needs_differential', text: 'Featured positions', availableOnly: true }, // sort by service needs first
    { value: 'location_city', text: 'Location: A-Z', nonTandemOnly: true },
    { value: '-location_city', text: 'Location: Z-A', nonTandemOnly: true },
  ],
};

POSITION_SEARCH_SORTS$.defaultSort = POSITION_SEARCH_SORTS$.options.find(o =>
  o.value === '-posted_date',
).value;

export const POSITION_SEARCH_SORTS = POSITION_SEARCH_SORTS$;

export const POSITION_SEARCH_SORTS_DYNAMIC = {
  ...POSITION_SEARCH_SORTS,
  options: [
    ...POSITION_SEARCH_SORTS.options.map((m) => {
      const obj = { ...m };
      if (obj.value === '-position__bureau') {
        obj.value = 'position__bureau';
      }
      return obj;
    }),
  ],
};
// END: KEEP THESE CONSTANTS TOGETHER IN THIS ORDER

export const filterPVSorts = (sorts) => {
  const v = { ...sorts };
  v.options = filter(v.options, f => !f.availableOnly);
  return v;
};

export const filterTandemSorts = (sorts) => {
  const v = { ...sorts };
  v.options = filter(v.options, f => !f.nonTandemOnly);
  return v;
};

export const POSITION_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

POSITION_PAGE_SIZES.defaultSort = POSITION_PAGE_SIZES.options[1].value;

export const CLIENTS_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 250, text: '250' },
  ],
};

CLIENTS_PAGE_SIZES.defaultSort = CLIENTS_PAGE_SIZES.options[1].value;

export const BID_PORTFOLIO_SORTS = {
  options: [
    { value: 'client_last_name,client_first_name,client_middle_name', text: 'Last Name: A-Z' },
    { value: 'client_grade', text: 'Grade' },
    { value: 'client_skill', text: 'Skill' },
    { value: 'client_grade,client_skill', text: 'Grade & Skill' },
  ],
};

BID_PORTFOLIO_SORTS.defaultSort = BID_PORTFOLIO_SORTS.options[0].value;

export const BID_PORTFOLIO_FILTERS = {
  options: [
    { value: '', text: 'All' },
    { value: 'true', text: 'Handshake' },
    { value: 'false', text: 'No Handshake' },
    { value: 'unassigned_filters', text: 'Unassigned Filters' },
  ],
};

BID_PORTFOLIO_FILTERS.defaultSort = BID_PORTFOLIO_FILTERS.options[0].value;

export const UNASSIGNED_BIDDERS_FILTERS = {
  options: [
    { value: 'noHandshake', text: 'No Handshake' },
    { value: 'noPanel', text: 'No Panel' },
    { value: 'noBids', text: 'Has Not Placed Bids' },
  ],
};

export const SAVED_SEARCH_SORTS = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'name', text: 'Name: A-Z' },
    { value: '-date_created', text: 'Date created: Most recent' },
    { value: 'date_created', text: 'Date created: Oldest' },
  ],
};

SAVED_SEARCH_SORTS.defaultSort = SAVED_SEARCH_SORTS.options[0].value;

export const POSITION_SEARCH_SORTS_TYPE = 'POSITION_SEARCH_SORTS';
export const POSITION_PAGE_SIZES_TYPE = 'POSITION_PAGE_SIZES';
export const BID_PORTFOLIO_SORTS_TYPE = 'BID_PORTFOLIO_SORTS';
export const SAVED_SEARCH_SORTS_TYPE = 'SAVED_SEARCH_SORTS';
export const BID_PORTFOLIO_FILTERS_TYPE = 'BID_PORTFOLIO_FILTERS';

const SORT_OPTIONS = [
  [POSITION_SEARCH_SORTS, POSITION_SEARCH_SORTS_TYPE],
  [POSITION_PAGE_SIZES, POSITION_PAGE_SIZES_TYPE],
  [BID_PORTFOLIO_SORTS, BID_PORTFOLIO_SORTS_TYPE],
  [SAVED_SEARCH_SORTS, SAVED_SEARCH_SORTS_TYPE],
  [BID_PORTFOLIO_FILTERS, BID_PORTFOLIO_FILTERS_TYPE],
];

// sort config based on SORT_OPTIONS
export default Object.assign(
  {},
  ...SORT_OPTIONS.map(p => (
    { [p[1]]: { key: p[1], defaultSort: p[0].defaultSort, options: p[0].options } }
  )),
);

export const POSITION_MANAGER_PAGE_SIZES = {
  options: [
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

export const BUREAU_POSITION_SORT = {
  selectionRef: 'ordering',
  options: [
    { value: 'position__title', text: 'Position title: A-Z' },
    { value: '-position__grade', text: 'Grade: Low to high' },
    { value: 'position__bureau', text: 'Bureau: A-Z' },
    { value: '-posted_date', text: 'Posted date: Most recent', availableOnly: true },
    { value: 'posted_date', text: 'Posted date: Oldest', availableOnly: true },
    { value: 'ted', text: 'TED: Soonest' },
    { value: '-ted', text: 'TED: Latest' },
    { value: 'position__position_number', text: 'Position number: Low to high' },
    { value: '-position__post__has_service_needs_differential', text: 'Featured positions', availableOnly: true },
  ],
};

export const BUREAU_BIDDER_SORT = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: 'bidder_grade', text: "Bidder's Grade" },
    { value: 'bidder_skill', text: "Bidder's Skill" },
    { value: 'bidder_hs', text: 'Handshake' },
    { value: 'bidder_ted', text: 'TED' },
    { value: 'bidder_langauge', text: "Bidder's Langauge" },
    { value: 'bidder_name', text: "Bidder's Name" },
    { value: 'bidder_bid_submitted_date', text: 'Bid Submitted Date' },
    // What order do we want these in?
  ],
};

export const BUREAU_BIDDER_FILTERS = {
  options: [
    { value: '', text: 'All' },
    { value: 'HS', text: 'Handshake' },
    { value: 'OP', text: 'No Handshake' },
  ],
};

export const AGENDA_ITEM_HISTORY_FILTERS = {
  // values tbd, subject to what WS returns
  options: [
    { value: '-agenda_id', text: 'Created date: Latest' },
    { value: 'agenda_id', text: 'Created date: Earliest' },
    { value: 'agenda_status', text: 'Agenda Status' },
    // { value: '-panel_date', text: 'Panel date: Latest' },
    // { value: 'panel_date', text: 'Panel date: Earliest' },
  ],
};

AGENDA_ITEM_HISTORY_FILTERS.defaultSort = AGENDA_ITEM_HISTORY_FILTERS.options[0].value;
