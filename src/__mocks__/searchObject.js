export const searchObject = {
  id: 7,
  owner: 'Jenny Townpost',
  name: 'Test 33',
  endpoint: '/api/v1/position/',
  filters: {
    q: 'german',
    post__in: '151',
    is_domestic: 'true',
    grade__code__in: '02',
    skill__code__in: '6080,2080',
    post__tour_of_duty__code__in: 'O,Q',
    post__cost_of_living_adjustment__gt: '0',
  },
  count: 0,
  date_created: '2018-03-09T17:47:07.133624Z',
  date_updated: '2018-03-09T17:47:07.133651Z',
};

export const searchObjectParent = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 7,
      owner: 'Jenny Townpost',
      name: 'Test 33',
      endpoint: '/api/v1/position/',
      filters: {
        q: 'german',
        skill__code__in: '6080',
        post__tour_of_duty__code__in: 'O',
      },
      count: 0,
      date_created: '2018-03-09T17:47:07.133624Z',
      date_updated: '2018-03-09T17:47:07.133651Z',
    },
    {
      id: 8,
      owner: 'Jenny Townpost',
      name: 'test 3',
      endpoint: '/api/v1/position/',
      filters: {
        grade__code__in: '02',
        skill__code__in: '6080',
      },
      count: 0,
      date_created: '2018-02-21T16:29:20.905425Z',
      date_updated: '2018-02-21T16:29:20.905461Z',
    },
  ],
};

export const mappedParams = [
{ selectionRef: 'skill__code__in', codeRef: '6080', description: 'ADMINISTRATIVE SUPPORT' },
{ selectionRef: 'post__tour_of_duty__code__in', codeRef: 'O', description: 'United States' },
{ selectionRef: 'grade__code__in', codeRef: '02', description: 'two' },
];

export default searchObject;
