// import axios from 'axios';
// import { fetchUserToken } from '../utilities';
// import api from '../api';

// TODO - use real data from API

export function glossaryHasErrored(bool) {
  return {
    type: 'GLOSSARY_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function glossaryIsLoading(bool) {
  return {
    type: 'GLOSSARY_IS_LOADING',
    isLoading: bool,
  };
}
export function glossaryFetchDataSuccess(glossary) {
  return {
    type: 'GLOSSARY_FETCH_DATA_SUCCESS',
    glossary,
  };
}

// subset of terms from github
const items = [
  { id: 2, title: 'Assignment Officer (AO)', definition: 'The employee responsible for filling the position.' },
  { id: 3, title: 'Bidder', definition: 'An employee who is applying for a position.' },
  { id: 4, title: 'Cable', definition: 'A secure text-based message sent from one State department location to another.' },
  { id: 5, title: 'Bureau', definition: 'The organization sponsoring a position. Most bureaus oversee regional areas, such as Western Europe. Others, such as the Bureau of Consular Affairs, oversee functional groups. If referring to a regional bureau, include the acronym -- State Department employees often use acronyms to refer to regional bureaus. In UI copy, put the acronym before the full name, eg: (WHA) Bureau of Western Hemispheric Affairs.' },
  { id: 6, title: 'Career development officer (CDO)', definition: 'An employee responsible for helping others find and successfully bid for appropriate positions for their career goals.' },
  { id: 7, title: 'Career Track', definition: 'A chosen professional competency.' },
  { id: 8, title: 'Cone', definition: 'A cone is a colloquial synonym for a generalist or specialist functional field. Bids can be "in cone" (for a position whose skill code belongs to the bidders\' specialization) or "out of cone." Each cone contains multiple skill codes.' },
  { id: 9, title: 'Cost of living allowance (COLA)', definition: 'A salary increase to reimburse employees for prices at a foreign post that are higher than same costs in Washington, DC. The specific value of the allowance changes based on local prices. COLA is a colloquial shorthand for what is officially known as post allowance.' },
];

// fake async until API endpoint is created
export function glossaryFetchData() {
  return (dispatch) => {
    dispatch(glossaryIsLoading(true));
    dispatch(glossaryHasErrored(false));
    setTimeout(() => {
      dispatch(glossaryFetchDataSuccess(items));
      dispatch(glossaryIsLoading(false));
      dispatch(glossaryHasErrored(false));
    }, 400);
  };
}
