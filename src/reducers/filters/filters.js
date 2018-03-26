import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';

// Set what filters we want to fetch
const items =
  {
    filters: [
      {
        item: {
          title: 'Bid Cycle',
          sort: 100,
          description: 'bidCycle',
          endpoint: 'bidcycle/',
          selectionRef: ENDPOINT_PARAMS.bidCycle,
          text: 'Choose Bid Cycles',
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Skill Code',
          sort: 200,
          description: 'skill',
          endpoint: 'skill/',
          selectionRef: ENDPOINT_PARAMS.skill,
          text: 'Choose skill codes',
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
          text: 'Choose tour of duty length',
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
          { id: 150, code: '15', description: '15%' },
          { id: 250, code: '25', description: '25%' },
          { id: 350, code: '35', description: '35%' },
        ],
      },
      {
        item: {
          title: 'Domestic',
          sort: 900,
          bool: true,
          description: 'domestic',
          selectionRef: ENDPOINT_PARAMS.domestic,
          text: 'Include only domestic positions',
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Yes' },
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
      {
        item: {
          title: 'Post',
          sort: 1100,
          bool: false,
          description: 'post',
          endpoint: 'orgpost/?limit=7',
          selectionRef: ENDPOINT_PARAMS.post,
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
