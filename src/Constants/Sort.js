import { filter } from 'lodash';

// BEGIN: KEEP THESE CONSTANTS TOGETHER IN THIS ORDER
const POSITION_SEARCH_SORTS$ = {
  options: [
    { value: '', text: 'Sort option', disabled: true },
    { value: '-position__post__has_service_needs_differential', text: 'Featured Positions', availableOnly: true }, // sort by service needs first
    { value: '-posted_date', text: 'Posted Date: Most Recent', availableOnly: true }, // sort by most recent posted_date
    { value: 'posted_date', text: 'Posted Date: Oldest', availableOnly: true }, // sort by oldest posted_date
    { value: 'position__bureau', text: 'Bureau: A-Z' }, // numbers first, then A-Z
    { value: '-position__bureau', text: 'Bureau: Z-A' },
    { value: '-position__grade', text: 'Grade: Low to High' }, // sort by grade "ranking"
    { value: 'position__grade', text: 'Grade: High to Low' }, // sort by grade "ranking"
    { value: 'location_city', text: 'Location: A-Z', nonTandemOnly: true },
    { value: '-location_city', text: 'Location: Z-A', nonTandemOnly: true },
    { value: 'position__position_number', text: 'Position Number: Low to High' },
    { value: '-position__position_number', text: 'Position Number: High to Low' }, // numbers first, then Z-A
    { value: 'position__title', text: 'Position Title: A-Z' },
    { value: '-position__title', text: 'Position Title: Z-A' },
    { value: 'ted', text: 'TED: Most Recent' },
    { value: '-ted', text: 'TED: Oldest' },
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

export const AGENDA_EMPLOYEES_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 250, text: '250' },
  ],
};

AGENDA_EMPLOYEES_PAGE_SIZES.defaultSize = AGENDA_EMPLOYEES_PAGE_SIZES.options[2].value;

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

SAVED_SEARCH_SORTS.defaultSort = SAVED_SEARCH_SORTS.options[2].value;

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
    { value: 'bidder_bid_submitted_date', text: 'Bid Submitted Date' },
    { value: 'bidder_hs', text: 'Handshake' },
    { value: 'bidder_ted', text: 'TED' },
    { value: 'bidder_grade', text: "Bidder's Grade" },
    { value: 'bidder_language', text: "Bidder's Language" },
    { value: 'bidder_name', text: "Bidder's Name" },
    { value: 'bidder_skill', text: "Bidder's Skill" },
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

export const AGENDA_EMPLOYEES_SORT = {
  options: [
    { value: 'agenda_employee_fullname', text: 'Full Name: A-Z' },
    { value: '-agenda_employee_fullname', text: 'Full Name: Z-A' },
    { value: 'agenda_employee_id', text: 'Employee ID' },
    { value: '-agenda_employee_panel_date', text: 'Panel Meeting Date: Most Recent' },
    { value: 'agenda_employee_panel_date', text: 'Panel Meeting Date: Oldest' },
    { value: '-agenda_employee_ted', text: 'TED: Most Recent' },
    { value: 'agenda_employee_ted', text: 'TED: Oldest' },
  ],
};

AGENDA_EMPLOYEES_SORT.defaultSort = AGENDA_EMPLOYEES_SORT.options[0].value;

export const PANEL_MEETINGS_SORT = {
  options: [
    { value: 'meeting_date', text: 'Meeting Date Asc.' },
    { value: '-meeting_date', text: 'Meeting Date Desc.' },
    { value: 'meeting_status', text: 'Meeting Status A-Z' },
    { value: '-meeting_status', text: 'Meeting Status Z-A' },
  ],
};

PANEL_MEETINGS_SORT.defaultSort = PANEL_MEETINGS_SORT.options[0].value;

export const PANEL_MEETINGS_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

PANEL_MEETINGS_PAGE_SIZES.defaultSize = PANEL_MEETINGS_PAGE_SIZES.options[2].value;

export const EDIT_POSITION_DETAILS_SORT = {
  options: [
    { value: 'location', text: 'Location Asc.' },
    { value: '-location', text: 'Location Desc.' },
  ],
};

EDIT_POSITION_DETAILS_SORT.defaultSort = EDIT_POSITION_DETAILS_SORT.options[0].value;

export const EDIT_POSITION_DETAILS_PAGE_SIZES = {
  options: [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
  ],
};

EDIT_POSITION_DETAILS_PAGE_SIZES.defaultSize = EDIT_POSITION_DETAILS_PAGE_SIZES.options[2].value;
