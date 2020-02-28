import { setupAsyncMocks } from '../../testUtilities/testUtilities';
import * as actions from './filters';
import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';

const { mockStore, mockAdapter } = setupAsyncMocks();

const items = {
  filters: [
    { item: {
      title: 'Skill',
      sort: 100,
      description: 'skill',
      endpoint: 'skill/',
      selectionRef: 'skill__code__in',
      text: 'Choose Skill',
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
      { code: '0', description: 'Yes' }, // use a code of 0 to specify we want to return results where COLA > 0
      ],
    },
    {
      item: {
        title: 'Bureau',
        sort: 100,
        description: 'region',
        endpoint: 'organization/?is_bureau=true&is_regional=true',
        selectionRef: 'bureau__code__in',
        text: 'Choose bureau',
        choices: [
        ],
      },
      data: [
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
      ],
    },
  ],
};

describe('async actions', () => {
  const filters = {
    asyncParams: [{ codeRef: 1, selectionRef: ENDPOINT_PARAMS.post }],
    filters: [
      {
        item: { title: 'COLA', description: 'COLA', selectionRef: 'post__cost_of_living_adjustment__gt' },
        data: [{ code: '0', short_description: 'Yes', isSelected: false }],
      },
    ],
    asyncFilterCache: [],
  };

  beforeEach(() => {
    const skills = {
      count: 2,
      results: [
        {
          id: 2,
          code: '0010',
          description: 'EXECUTIVE (PAS)',
        },
        {
          id: 3,
          code: '0020',
          description: 'EXECUTIVE (CAREER)',
        },
      ],
    };

    const grades = {
      count: 2,
      results: [
        { id: 2, code: '00' },
        { id: 3, code: '01' },
      ],
    };

    const regions = {
      count: 1,
      results: [
        {
          long_description: 'test',
          short_description: 'test',
        },
      ],
    };

    const posts = {
      count: 292,
      next: 'http://localhost:8000/api/v1/orgpost/?page=2',
      previous: null,
      results: [
        {
          id: 1,
          code: '061980037',
          location: 'Los Angeles, CA, United States',
          tour_of_duty: null,
          cost_of_living_adjustment: 0,
          differential_rate: 0,
          danger_pay: 0,
          rest_relaxation_point: '',
          has_consumable_allowance: false,
          has_service_needs_differential: false,
        },
      ],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/skill/').reply(200,
      skills,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/organization/?is_bureau=true&is_regional=true').reply(200,
      regions,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/grade/').reply(200,
      grades,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/?limit=7').reply(200,
      posts,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/1/').reply(200,
      posts.results[0],
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/2/').reply(404,
      null,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/invalid/').reply(404,
      {},
    );
  });

  const queryParams = {
    post__cost_of_living_adjustment__gt: '0', skill__code__in: '0010,0020', post__location__country__in: '1', post__in: '1',
  };

  it('can fetch filters', (done) => {
    const store = mockStore({ filters: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(items));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch filters when some filters do not have data nested within the results property', (done) => {
    mockAdapter.onGet('http://localhost:8000/api/v1/grade/').reply(200,
      [{ id: 1 }],
    );

    const store = mockStore({ filters: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(items));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle returning a query param mapping', (done) => {
    const store = mockStore({ filters: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(items, queryParams));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failed fetches of filters', (done) => {
    const store = mockStore({ filters: [] });
    const invalidItems = Object.assign({}, items);
    invalidItems.filters[0].item.endpoint = 'invalid/'; // actually make one of the endpoints invalid

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(invalidItems));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle passing an optional savedResponses argument', (done) => {
    const store = mockStore({ filters: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(items, queryParams, filters));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle when fromResultsPage param is true', (done) => {
    const store = mockStore({ filters: [] });

    const fromResultsPage = true;

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.filtersFetchData(items, queryParams, filters, fromResultsPage));
        store.dispatch(actions.filtersIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
