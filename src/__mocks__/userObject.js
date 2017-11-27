export const bidderUserObject = {
  skill_code: 'INFORMATION MANAGEMENT (2880)',
  user: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'doej@state.gov',
  },
  is_cdo: false,
};

export const cdoUserObject = Object.assign({}, bidderUserObject, { is_cdo: true });
