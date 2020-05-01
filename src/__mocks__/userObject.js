export const bidderUserObject = {
  emp_id: '1',
  employee_info: {
    skills: [
      {
        code: '6218',
        description: 'CONSTRUCTION ENGINEERING',
      },
      {
        code: '6211',
        description: 'COMPUTER SCIENCE',
      },
    ],
    grade: '00',
  },
  id: 1,
  grade: '03',
  skills: [63, 40],
  user: {
    initials: 'JD',
    first_name: 'John',
    last_name: 'Doe',
    email: 'doej@state.gov',
    username: 'jdoe',
  },
  display_name: 'John',
  initials: 'JD',
  is_cdo: false,
  cdo: {
    username: 'shadtrachl',
    initials: 'LS',
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
  favorite_positions: [
    {
      id: 1,
      representation: '[00003026] OMS (COM) (Freetown, Sierra Leone)',
    },
    {
      id: 4,
      representation: '[00180000] OMS (DCM) (Addis Ababa, Ethiopia)',
    },
  ],
  favorite_positions_pv: [
    {
      id: 10,
    },
    {
      id: 20,
    },
  ],
};

export const cdoUserObject = Object.assign({}, bidderUserObject, { cdo: null, is_cdo: true });
