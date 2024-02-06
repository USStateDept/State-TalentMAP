import { has } from 'lodash';
import { ENDPOINT_PARAMS, ENDPOINT_PARAMS_TANDEM } from '../../Constants/EndpointParams';

const filterAPFilters = (data) => {
  const filters$ = data.filters.map((m) => {
    const hasAPEndpoint = has(m, 'item.endpointAP');
    const hasAltData = has(m, 'item.dataAP');
    const hasAPRef = has(m, 'item.selectionRefAP');
    return {
      ...m,
      item: {
        ...m.item,
        endpoint: hasAPEndpoint ? m.item.endpointAP : m.item.endpoint,
        selectionRef: hasAPRef ? m.item.selectionRefAP : m.item.selectionRef,
      },
      data: hasAltData ? m.dataAP : m.data,
    };
  });
  const output = { ...data, filters: filters$ };
  return output;
};

// Set what filters we want to fetch
const items =
  {
    filters: [
      {
        item: {
          title: 'Projected Vacancy',
          sort: 50,
          isToggle: true,
          description: 'projectedVacancy',
          selectionRef: ENDPOINT_PARAMS.projectedVacancy,
          isCommon: true,
          text: 'Toggle between available and projected vacancy positions',
          choices: [
          ],
        },
        data: [
          { code: 'open', short_description: 'Open Positions' },
          { code: 'projected', short_description: 'Projected Vacancies' },
        ],
      },
      {
        item: {
          title: 'Tandem',
          sort: 5000,
          isToggle: true,
          description: 'tandem-toggle',
          selectionRef: ENDPOINT_PARAMS.tandem,
          isCommon: true,
          text: 'Toggle between available and projected vacancy positions',
          choices: [
          ],
        },
        data: [
          { code: 'individual', short_description: 'Individual' },
          { code: 'tandem', short_description: 'Tandem' },
        ],
      },
      {
        item: {
          title: 'Bid Cycle',
          sort: 100,
          description: 'bidCycle',
          endpoint: 'bidcycle/?active=true&ordering=name',
          endpointAP: 'fsbid/reference/cycles/?active=true&ordering=name',
          selectionRef: ENDPOINT_PARAMS.bidCycle,
          onlyAvailablePositions: true,
          text: 'Choose Bid Cycles',
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Bid Cycle',
          sort: 100,
          description: 'bidCycle-tandem',
          isTandem: true,
          endpointAP: 'fsbid/reference/cycles/?active=true&ordering=name',
          selectionRef: ENDPOINT_PARAMS_TANDEM.bidCycle,
          onlyAvailablePositions: true,
          text: 'Choose Bid Cycles',
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Bid Season',
          sort: 150,
          description: 'bidSeason',
          endpoint: 'fsbid/bid_seasons/',
          selectionRef: ENDPOINT_PARAMS.bidSeason,
          text: 'Choose Bid Seasons',
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Bid Season',
          sort: 150,
          description: 'bidSeason-tandem',
          isTandem: true,
          endpoint: 'fsbid/bid_seasons/',
          selectionRef: ENDPOINT_PARAMS_TANDEM.bidSeason,
          text: 'Choose Bid Seasons',
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Skill',
          sort: 200,
          description: 'skill',
          endpoint: 'skill/',
          endpointAP: null, // because we check for 'has' in filterAPFilters()
          selectionRef: ENDPOINT_PARAMS.skill,
          text: 'Choose Skills',
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Skill',
          sort: 200,
          description: 'skill-tandem',
          endpoint: 'skill/',
          isTandem: true,
          endpointAP: null, // because we check for 'has' in filterAPFilters()
          selectionRef: ENDPOINT_PARAMS_TANDEM.skill,
          text: 'Choose Skills',
          tryCache: true,
        },
        data: [
        ],
      },
      {
        // we won't query position directly on cone, but instead
        // use the individual Skill codes
        item: {
          title: 'Skill Cone',
          description: 'skillCone',
          endpoint: 'skill/cone/',
          endpointAP: 'fsbid/reference/cones/',
          tryCache: true,
        },
        data: [
        ],
      },
      {
        // we won't query position directly on cone, but instead
        // use the individual Skill codes
        item: {
          title: 'Skill Cone',
          description: 'skillCone-tandem',
          endpoint: 'skill/cone/',
          endpointAP: 'fsbid/reference/cones/',
          isTandem: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 500,
          description: 'language',
          endpoint: 'language/?is_available=true',
          endpointAP: 'fsbid/reference/languages/?is_available=true',
          selectionRef: ENDPOINT_PARAMS.language,
          text: 'Choose languages',
          onlyAvailablePositions: true,
          tryCache: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
        ],
        initialDataAP: [
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 500,
          description: 'language-tandem',
          endpoint: 'language/?is_available=true',
          endpointAP: 'fsbid/reference/languages/?is_available=true',
          selectionRef: ENDPOINT_PARAMS_TANDEM.language,
          text: 'Choose languages',
          isTandem: true,
          onlyAvailablePositions: true,
          tryCache: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
        ],
        initialDataAP: [
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 500,
          description: 'language',
          endpoint: 'language/',
          endpointAP: 'fsbid/reference/languages/',
          selectionRef: ENDPOINT_PARAMS.language,
          text: 'Choose languages',
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 500,
          description: 'language-tandem',
          endpoint: 'language/',
          endpointAP: 'fsbid/reference/languages/',
          selectionRef: ENDPOINT_PARAMS_TANDEM.language,
          text: 'Choose languages',
          isTandem: true,
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
        ],
      },
      {
        // This is primarily to allow the user to "select all" languages,
        // but could also be extended to group the languages, like we do
        // with skills/cones.
        item: {
          title: 'Language Group',
          altTitle: 'Language',
          description: 'languageGroup',
        },
        data: [
          { id: 1, code: 'languages', name: 'Languages', isSelected: false },
          { id: 2, code: 'no-language', name: 'No Language', isSelected: false },
        ],
      },
      {
        item: {
          title: 'Grade',
          sort: 300,
          description: 'grade',
          endpoint: 'grade/?is_available=true',
          endpointAP: 'fsbid/reference/grades/?is_available=true',
          selectionRef: ENDPOINT_PARAMS.grade,
          text: 'Choose grades',
          onlyAvailablePositions: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Grade',
          sort: 300,
          description: 'grade-tandem',
          endpoint: 'grade/?is_available=true',
          endpointAP: 'fsbid/reference/grades/?is_available=true',
          selectionRef: ENDPOINT_PARAMS_TANDEM.grade,
          text: 'Choose grades',
          isTandem: true,
          onlyAvailablePositions: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Grade',
          sort: 300,
          description: 'grade',
          endpoint: 'grade/',
          endpointAP: 'fsbid/reference/grades/',
          selectionRef: ENDPOINT_PARAMS.grade,
          text: 'Choose grades',
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Grade',
          sort: 300,
          description: 'grade-tandem',
          endpoint: 'grade/',
          endpointAP: 'fsbid/reference/grades/',
          selectionRef: ENDPOINT_PARAMS_TANDEM.grade,
          text: 'Choose grades',
          isTandem: true,
          onlyProjectedVacancy: true,
          tryCache: true,
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Tour of Duty',
          sort: 400,
          description: 'tod',
          endpoint: 'tour_of_duty/?is_available=true&ordering=months',
          endpointAP: 'fsbid/reference/tourofduties/?is_available=true&ordering=months',
          selectionRef: ENDPOINT_PARAMS.tod,
          text: 'Choose Tour of Duty length',
          onlyAvailablePositions: true,
          tryCache: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Tour of Duty',
          sort: 400,
          description: 'tod-tandem',
          endpoint: 'tour_of_duty/?is_available=true&ordering=months',
          endpointAP: 'fsbid/reference/tourofduties/?is_available=true&ordering=months',
          selectionRef: ENDPOINT_PARAMS_TANDEM.tod,
          text: 'Choose Tour of Duty length',
          onlyAvailablePositions: true,
          isTandem: true,
          tryCache: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Tour of Duty',
          sort: 400,
          description: 'tod',
          endpoint: 'tour_of_duty/?ordering=months',
          endpointAP: 'fsbid/reference/tourofduties/?ordering=months',
          selectionRef: ENDPOINT_PARAMS.tod,
          text: 'Choose Tour of Duty length',
          tryCache: true,
          onlyProjectedVacancy: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Tour of Duty',
          sort: 400,
          description: 'tod-tandem',
          endpoint: 'tour_of_duty/?ordering=months',
          endpointAP: 'fsbid/reference/tourofduties/?ordering=months',
          selectionRef: ENDPOINT_PARAMS_TANDEM.tod,
          text: 'Choose Tour of Duty length',
          isTandem: true,
          tryCache: true,
          onlyProjectedVacancy: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Bureau',
          sort: 100,
          description: 'region',
          endpoint: 'organization/?is_bureau=true&is_regional=true',
          endpointAP: 'fsbid/reference/bureaus/?is_regional=true',
          selectionRef: ENDPOINT_PARAMS.org,
          tryCache: true,
          text: 'Choose bureau',
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Bureau',
          sort: 100,
          description: 'region-tandem',
          endpoint: 'organization/?is_bureau=true&is_regional=true',
          endpointAP: 'fsbid/reference/bureaus/?is_regional=true',
          selectionRef: ENDPOINT_PARAMS_TANDEM.org,
          tryCache: true,
          isTandem: true,
          text: 'Choose bureau',
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Functional Bureaus',
          sort: 105,
          description: 'functionalRegion',
          endpoint: 'organization/group/',
          endpointAP: 'fsbid/reference/bureaus/?is_regional=false',
          selectionRef: ENDPOINT_PARAMS.functionalOrg,
          selectionRefAP: ENDPOINT_PARAMS.org,
          tryCache: true,
          text: 'Choose functional bureau',
          choices: [
          ],
        },
        data: [],
      },
      {
        item: {
          title: 'Functional Bureaus',
          sort: 105,
          description: 'functionalRegion-tandem',
          endpoint: 'organization/group/',
          endpointAP: 'fsbid/reference/bureaus/?is_regional=false',
          selectionRef: ENDPOINT_PARAMS.functionalOrg,
          selectionRefAP: ENDPOINT_PARAMS_TANDEM.org,
          tryCache: true,
          isTandem: true,
          text: 'Choose functional bureau',
          choices: [
          ],
        },
        data: [],
      },
      {
        item: {
          title: 'COLA',
          sort: 800,
          bool: true, // use bool: true to share a common HTML template
          description: 'COLA',
          selectionRef: ENDPOINT_PARAMS.cola,
          text: 'Include only positions with COLA',
          isCommon: true,
          choices: [
          ],
        },
        data: [
          { code: '0', short_description: 'Yes' }, // use a code of 0 to specify we want to return results where COLA > 0
        ],
      },
      {
        item: {
          title: 'Post Differential',
          sort: 600,
          description: 'postDiff',
          endpoint: 'fsbid/reference/differentialrates/',
          selectionRef: ENDPOINT_PARAMS.postDiff,
          text: 'Include only positions with a post differential',
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [
          { id: 0, code: '0', description: 'No post differential' },
          { id: 5, code: '5', description: '5%' },
          { id: 10, code: '10', description: '10%' },
          { id: 15, code: '15', description: '15%' },
          { id: 20, code: '20', description: '20%' },
          { id: 25, code: '25', description: '25%' },
          { id: 30, code: '30', description: '30%' },
          { id: 35, code: '35', description: '35%' },
        ],
        dataAP: [],
      },
      {
        item: {
          title: 'Danger Pay',
          sort: 700,
          description: 'dangerPay',
          endpointAP: 'fsbid/reference/dangerpay/',
          selectionRef: ENDPOINT_PARAMS.danger,
          text: 'Include only positions with danger pay',
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [
          { id: 100, code: '0', description: 'No danger pay' },
          { id: 150, code: '15', description: '15%' },
          { id: 200, code: '20', description: '20%' },
          { id: 250, code: '25', description: '25%' },
          { id: 350, code: '35', description: '35%' },
        ],
        dataAP: [],
      },
      {
        item: {
          title: 'Post Indicators',
          sort: 750,
          description: 'postIndicators',
          endpoint: 'fsbid/reference/postindicators/',
          selectionRef: ENDPOINT_PARAMS.postIndicators,
          text: 'Include positions with selected post indicators',
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [],
        dataAP: [],
      },
      {
        item: {
          title: 'Unaccompanied Status',
          sort: 780,
          description: 'unaccompaniedStatus',
          endpoint: 'fsbid/reference/unaccompaniedstatuses/',
          selectionRef: ENDPOINT_PARAMS.usCodes,
          text: 'Include positions with selected unaccompanied status',
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [],
        dataAP: [],
      },
      {
        item: {
          title: 'Domestic',
          sort: 900,
          description: 'domestic',
          selectionRef: ENDPOINT_PARAMS.domestic,
          text: 'Include only domestic positions',
          isCommon: true,
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Domestic' },
          { code: 'false', short_description: 'Overseas' },
        ],
      },
      /* Currently we don't display this as a filter, but will appear
      as a pill if the query param exists (e.g., the user clicked on Featured positions
      positions from the home page). */
      {
        item: {
          title: 'Featured',
          sort: 1000,
          bool: true,
          description: 'service_needs',
          selectionRef: ENDPOINT_PARAMS.highlighted,
          text: 'Include only featured positions',
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Featured' },
        ],
      },
      {
        item: {
          title: 'Post',
          altTitle: 'Location',
          sort: 1100,
          bool: false,
          description: 'post',
          endpoint: 'orgpost/?limit=500&is_available=true',
          endpointAP: 'fsbid/reference/locations/',
          selectionRef: ENDPOINT_PARAMS.post,
          selectionRefAP: ENDPOINT_PARAMS.postAP,
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Commuter Posts',
          sort: 1150,
          description: 'commuterPosts',
          endpoint: 'fsbid/reference/commuterposts/',
          selectionRef: ENDPOINT_PARAMS.commuterPosts,
          text: 'Include positions with selected Commuter Posts',
          isTandem: true,
          tryCache: true,
          isCommon: true,
          choices: [
          ],
        },
        data: [],
      },
      {
        item: {
          title: 'Handshake Registered',
          sort: 1200,
          description: 'handshake',
          selectionRef: ENDPOINT_PARAMS.handshake,
          text: 'Include positions with handshakes',
          onlyAvailablePositions: true,
        },
        data: [
          { code: 'HS', description: 'Has Handshake' },
          { code: 'OP', description: 'No Handshake' },
        ],
        dataAP: [],
      },
      {
        item: {
          title: 'Handshake Registered',
          sort: 1200,
          description: 'handshake-tandem',
          selectionRef: ENDPOINT_PARAMS_TANDEM.handshake,
          text: 'Include positions with handshakes',
          isTandem: true,
          onlyAvailablePositions: true,
        },
        data: [
          { code: 'HS', description: 'Has Handshake' },
          { code: 'OP', description: 'No Handshake' },
        ],
        dataAP: [],
      },
      {
        item: {
          title: 'TM Handshake',
          sort: 1300,
          description: 'tmHandshake',
          selectionRef: ENDPOINT_PARAMS.tmHandshake,
          text: 'Include positions with TM handshakes',
          onlyAvailablePositions: true,
        },
        data: [
          { code: 'A', description: 'Accepted', isSelected: false },
          { code: 'D', description: 'Declined', isSelected: false },
          { code: 'O', description: 'Offered', isSelected: false },
          { code: 'R', description: 'Revoked', isSelected: false },
        ],
      },
      {
        item: {
          title: 'Organization',
          sort: 1300,
          description: 'organization',
          selectionRef: ENDPOINT_PARAMS.organization,
          tryCache: true,
          text: 'Choose Organization',
          choices: [
          ],
        },
        data: [],
      },
      {
        item: {
          title: 'Hard to Fill',
          sort: 1400,
          description: 'hardToFill',
          selectionRef: ENDPOINT_PARAMS.hardToFill,
          text: 'Include Hard to Fill Positions',
          onlyAvailablePositions: true,
          choices: [
          ],
        },
        data: [
          { code: 'Y', description: 'Hard to Fill' },
          { code: 'N', description: 'Not Hard to Fill' },
        ],
      },
      {
        item: {
          title: 'Hard to Fill',
          sort: 1400,
          description: 'hardToFill-tandem',
          selectionRef: ENDPOINT_PARAMS_TANDEM.hardToFill,
          text: 'Include Hard to Fill Positions',
          isTandem: true,
          onlyAvailablePositions: true,
        },
        data: [
          { code: 'Y', description: 'Hard to Fill' },
          { code: 'N', description: 'Not Hard to Fill' },
        ],
      },
      {
        item: {
          title: 'DETO/RWA',
          sort: 1400,
          description: 'detoRwa',
          selectionRef: ENDPOINT_PARAMS.detoRWA,
          text: 'RWA/DETO Eligible',
        },
        data: [
          { code: true, description: 'Eligible' },
          { code: false, description: 'Not Eligible' },
        ],
      },
      {
        item: {
          title: 'DETO/RWA',
          sort: 1400,
          description: 'detoRwa-tandem',
          selectionRef: ENDPOINT_PARAMS_TANDEM.detoRWA,
          text: 'RWA/DETO Eligible',
          isTandem: true,
        },
        data: [
          { code: true, description: 'Eligible' },
          { code: false, description: 'Not Eligible' },
        ],
      },
    ],
  };

export const staticFilters = filterAPFilters(items);

export function filtersHasErrored(state = false, action) {
  switch (action.type) {
    case 'FILTERS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function filtersIsLoading(state = true, action) {
  switch (action.type) {
    case 'FILTERS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function filters(state = staticFilters, action) {
  switch (action.type) {
    case 'FILTERS_FETCH_DATA_SUCCESS':
      return action.filters;
    default:
      return state;
  }
}
