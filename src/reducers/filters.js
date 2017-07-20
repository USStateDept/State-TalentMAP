const items = [
  {
    item: {
      title: 'Skill code',
      sort: 100,
      description: 'skill',
      endpoint: 'position/skills/',
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
      endpoint: 'language/',
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
      endpoint: 'position/grades/',
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
      endpoint: 'organization/tod/',
      selectionRef: 'post__tour_of_duty__in',
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
      endpoint: 'organization/?available=true',
      selectionRef: 'organization__code__in',
      text: 'Choose region',
      choices: [
      ],
    },
    data: [
    ],
  },
];

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
