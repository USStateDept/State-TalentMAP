export const bidderUserObject = {
  skill_code: 'INFORMATION MANAGEMENT (2880)',
  user: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'doej@state.gov',
  },
  is_cdo: false,
  bid_statistics: [
    {
      draft: 1,
      submitted: 1,
    },
  ],
};

export const cdoUserObject = Object.assign({}, bidderUserObject, { is_cdo: true });
