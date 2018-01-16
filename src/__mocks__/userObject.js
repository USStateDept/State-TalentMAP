export const bidderUserObject = {
  skills: [
    {
      id: 63,
      cone: null,
      code: '6218',
      description: 'CONSTRUCTION ENGINEERING',
    },
    {
      id: 40,
      cone: null,
      code: '6211',
      description: 'COMPUTER SCIENCE',
    },
  ],
  user: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'doej@state.gov',
    username: 'jdoe',
  },
  is_cdo: false,
  cdo: {
    first_name: 'Leah',
    last_name: 'Shadtrach',
    email: 'shadtrachl@state.gov',
  },
  bid_statistics: [
    {
      draft: 1,
      submitted: 1,
    },
  ],
};

export const cdoUserObject = Object.assign({}, bidderUserObject, { cdo: null, is_cdo: true });
