import { toastSuccess, toastError } from './toast';
import api from '../api';

export function aboutContentHasErrored(bool) {
  return {
    type: 'ABOUT_CONTENT_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function aboutContentIsLoading(bool) {
  return {
    type: 'ABOUT_CONTENT_IS_LOADING',
    isLoading: bool,
  };
}

export function aboutContentFetchDataSuccess(data) {
  return {
    type: 'ABOUT_CONTENT_SUCCESS',
    data,
  };
}

export function aboutContentPatchHasErrored(bool) {
  return {
    type: 'ABOUT_CONTENT_PATCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function aboutContentPatchIsLoading(bool) {
  return {
    type: 'ABOUT_CONTENT_PATCH_IS_LOADING',
    isLoading: bool,
  };
}

export function aboutContentPatchSuccess(success) {
  return {
    type: 'ABOUT_CONTENT_PATCH_SUCCESS',
    success,
  };
}

export function aboutContentFetchData() {
  return (dispatch) => {
    dispatch(aboutContentIsLoading(true));
    api().get('/position/1/')
      .then(() => {
        dispatch(aboutContentHasErrored(false));
        dispatch(aboutContentIsLoading(false));
        dispatch(aboutContentFetchDataSuccess(ABOUT_CONTENT)); // eslint-disable-line
      })
      .catch(() => {
        // TODO update
        dispatch(aboutContentHasErrored(true));
        dispatch(aboutContentIsLoading(false));
      });
  };
}

export function aboutContentPatchData(data) {
  return (dispatch) => {
    dispatch(aboutContentPatchIsLoading(false));
    api().get('/position/1/', { data })
      .then(() => {
        dispatch(aboutContentPatchHasErrored(false));
        dispatch(aboutContentPatchIsLoading(false));
        dispatch(aboutContentPatchSuccess(true)); // eslint-disable-line
        dispatch(aboutContentFetchDataSuccess(data)); // eslint-disable-line
        dispatch(toastSuccess('You may now press the cancel button or leave this page.', 'Update successful'));
      })
      .catch(() => {
        // TODO update
        dispatch(aboutContentPatchHasErrored(true));
        dispatch(aboutContentPatchIsLoading(false));
        dispatch(aboutContentPatchSuccess(false)); // eslint-disable-line
        dispatch(toastError('Update unsuccessful. Please try again.', 'Error updating'));
      });
  };
}

const ABOUT_CONTENT = `# About TalentMAP

TalentMAP is a multi-year, department-wide talent management platform expanding the Foreign Service (FS) bidding and assignments concept to become a much greater strategy for managing our FS talent worldwide to:

* Manage our assignment processes
* Align our people to positions
* Project our workforce planning of the future

## Our Mission

HR/CDA supports the Department of State (DOS) mission by transparently and equitably assigning employees with the right skills to the right positions at the right time.

## TalentMAP Progress is Ongoing

For more information, visit [HR Systems Online](http://www.state.gov).

## How TalentMAP Works
The Bureau of Human Resources Executive Office (HR/EX) in partnership with the Bureau of Human Resources Office of Career Development and Assignments (HR/CDA) are developing a new application, TalentMAP, aimed at replacing the Foreign Service Bidding (FSBid) application. TalentMAP will serve as a unified source of information regarding available FS positions and post data for Foreign Service employees. HR/EX aims to ensure TalentMAP becomes a secure, reliable, and central system that will support the HR/CDA business processes.

TalentMAP will maintain the existing business functionality and meet evolving requirements while leveraging best practices in software development. As a result of TalentMAP, DOS will be able to better carry out its diplomatic mission by improving the matching process, reducing the amount of time it takes for FS employees to find jobs that align with their skills, and improving the workflow for administrative staff to manage FS employees.


## Help Build TalentMAP
The first phase of the TalentMAP release will be optional for bidders offering a search and view-only option. The DOS employee will have the ability to search for potential positions, research posts, and add positions as “favorites.” Favorited positions will organize the bidder in order to make a determination on which positions they intend to bid.

During the first phase, DOS employees will need to return to FSBid to submit their bid(s) and continue the assignment process. FS bidders can choose to pilot the TalentMAP application to better understand the functionality and have the opportunity to provide feedback.
`;
