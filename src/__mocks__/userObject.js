export const bidderUserObject = {
  skill_code: ['INFORMATION MANAGEMENT (2880)', 'ADMINISTRATIVE SUPPORT (2080)'],
  user: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'doej@state.gov',
    username: 'jdoe',
  },
  is_cdo: false,
  cdo: {
    email: 'shadtrachl@state.gov',
  },
  bid_statistics: [
    {
      draft: 1,
      submitted: 1,
    },
  ],
};

export const cdoUserObject = Object.assign({}, bidderUserObject, { is_cdo: true });
