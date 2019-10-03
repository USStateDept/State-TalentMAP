import { COMMON_PROPERTIES, ENDPOINT_PARAMS } from '../../Constants/EndpointParams';

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
          title: 'Bid Cycle',
          sort: 100,
          description: 'bidCycle',
          endpoint: 'bidcycle/?active=true&ordering=name',
          selectionRef: ENDPOINT_PARAMS.bidCycle,
          onlyAvailablePositions: true,
          text: 'Choose Bid Cycles',
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
          selectionRef: ENDPOINT_PARAMS.skill,
          text: 'Choose Skills',
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
          selectionRef: ENDPOINT_PARAMS.language,
          text: 'Choose languages',
          onlyAvailablePositions: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
          {
            code: COMMON_PROPERTIES.NULL_LANGUAGE,
            short_description: 'No language requirement',
            custom_description: 'No language requirement',
          },
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 500,
          description: 'language',
          endpoint: 'language/',
          selectionRef: ENDPOINT_PARAMS.language,
          text: 'Choose languages',
          onlyProjectedVacancy: true,
        },
        data: [
        ],
        // Allow users to include languages with no code. This option is not supplied from
        // the endpoint, so we define it here.
        initialData: [
          {
            code: COMMON_PROPERTIES.NULL_LANGUAGE,
            short_description: 'No language requirement',
            custom_description: 'No language requirement',
          },
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
          // useAll means that we don't need to explicitly list the languages here.
          { id: 1, name: 'Languages', isSelected: false, useAll: true },
        ],
      },
      {
        item: {
          title: 'Grade',
          sort: 300,
          description: 'grade',
          endpoint: 'grade/?is_available=true',
          selectionRef: ENDPOINT_PARAMS.grade,
          text: 'Choose grades',
          onlyAvailablePositions: true,
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
          selectionRef: ENDPOINT_PARAMS.grade,
          text: 'Choose grades',
          onlyProjectedVacancy: true,
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
          selectionRef: ENDPOINT_PARAMS.tod,
          text: 'Choose Tour of Duty length',
          onlyAvailablePositions: true,
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
          selectionRef: ENDPOINT_PARAMS.tod,
          text: 'Choose Tour of Duty length',
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
          selectionRef: ENDPOINT_PARAMS.org,
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
          selectionRef: ENDPOINT_PARAMS.functionalOrg,
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
          selectionRef: ENDPOINT_PARAMS.postDiff,
          text: 'Include only positions with a post differential',
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
      },
      {
        item: {
          title: 'Danger Pay',
          sort: 700,
          description: 'dangerPay',
          selectionRef: ENDPOINT_PARAMS.danger,
          text: 'Include only positions with danger pay',
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
      },
      {
        item: {
          title: 'Domestic',
          sort: 900,
          description: 'domestic',
          selectionRef: ENDPOINT_PARAMS.domestic,
          text: 'Include only domestic positions',
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Domestic' },
          { code: 'false', short_description: 'Overseas' },
        ],
      },
      {
        item: {
          title: 'Available (No handshakes)',
          sort: 950,
          bool: true,
          description: 'available',
          selectionRef: ENDPOINT_PARAMS.available,
          text: 'Include only available positions',
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Yes' },
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
          selectionRef: ENDPOINT_PARAMS.post,
          onlyAvailablePositions: true,
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Post',
          altTitle: 'Location',
          sort: 1100,
          bool: false,
          description: 'post',
          endpoint: 'orgpost/?limit=500',
          selectionRef: ENDPOINT_PARAMS.post,
          onlyProjectedVacancy: true,
          choices: [
          ],
        },
        data: [
        ],
      },
    ],
  };

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
export function filters(state = items, action) {
  switch (action.type) {
    case 'FILTERS_FETCH_DATA_SUCCESS':
      return action.filters;
    default:
      return state;
  }
}
