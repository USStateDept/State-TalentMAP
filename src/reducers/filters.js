const items =
  {
    filters: [
      {
        item: {
          title: 'Skill code',
          sort: 100,
          description: 'skill',
          endpoint: 'skill/',
          selectionRef: 'skill__code__in',
          text: 'Choose skill codes',
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Language',
          sort: 200,
          description: 'language',
          endpoint: 'language/?is_available=true',
          selectionRef: 'languages__language__code__in',
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
          selectionRef: 'grade__code__in',
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
          endpoint: 'tour_of_duty/',
          selectionRef: 'post__tour_of_duty__code__in',
          text: 'Choose tour of duty length',
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'Region',
          sort: 500,
          description: 'region',
          endpoint: 'organization/?is_available=true',
          selectionRef: 'organization__code__in',
          text: 'Choose region',
          choices: [
          ],
        },
        data: [
        ],
      },
      {
        item: {
          title: 'COLA',
          sort: 600,
          bool: true, // use bool: true to share a common HTML template
          description: 'COLA',
          selectionRef: 'post__cost_of_living_adjustment__gt',
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
          sort: 700,
          bool: true,
          description: 'postDiff',
          selectionRef: 'post__differential_rate__gt',
          text: 'Include only positions with a post differential',
          choices: [
          ],
        },
        data: [
          { code: '0', short_description: 'Yes' },
        ],
      },
      {
        item: {
          title: 'Danger pay',
          sort: 800,
          bool: true,
          description: 'dangerPay',
          selectionRef: 'post__danger_pay__gt',
          text: 'Include only positions with danger pay',
          choices: [
          ],
        },
        data: [
          { code: '0', short_description: 'Yes' },
        ],
      },
      {
        item: {
          title: 'Domestic',
          sort: 900,
          bool: true,
          description: 'domestic',
          selectionRef: 'is_domestic',
          text: 'Include only domestic positions',
          choices: [
          ],
        },
        data: [
          { code: 'true', short_description: 'Yes' },
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
export function filtersIsLoading(state = false, action) {
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
