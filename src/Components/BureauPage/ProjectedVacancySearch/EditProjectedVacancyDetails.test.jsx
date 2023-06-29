// import { shallow } from 'enzyme';
// import { EMPTY_FUNCTION } from 'Constants/PropTypes';
// import PositionManager from './EditProjectedVacancyDetails';

// describe('BureauPage', () => {
//   const props = {
//     fetchBureauPositions: EMPTY_FUNCTION,
//     fetchFilters: EMPTY_FUNCTION,
//     saveSelections: EMPTY_FUNCTION,
//     bureauPositions: {
//       count: 0,
//       results: [],
//     },
//     bureauFilters: {
//       filters: [
//         {
//           item: { description: 'tod' },
//           data: [
//             {
//               code: 'C',
//               id: 'C',
//               long_description: '1 YEAR',
//               short_description: '1 YEAR',
//             },
//           ],
//         },
//         {
//           item: { description: 'grade' },
//           data: [
//             {
//               code: '00',
//               custom_description: '00',
//               id: '00',
//             },
//           ],
//         },
//         {
//           item: { description: 'skill' },
//           data: [
//             {
//               code: '2880',
//               cone: 'Info Mgt Specialist',
//               custom_description: 'INFORMATION MANAGEMENT (2880)',
//               description: 'INFORMATION MANAGEMENT',
//               id: '16',
//             },
//           ],
//         },
//         {
//           item: { description: 'post' },
//           data: [
//             {
//               city: 'Ripley',
//               code: 'MX1150000',
//               country: 'USA',
//               custom_description: 'Ripley, Oklahoma',
//               id: 'MX1150000',
//               isSelected: false,
//               is_domestic: true,
//               location: { code: 'MX1150000', city: 'Ripley', state: 'Oklahoma', country: 'USA', is_domestic: true },
//               state: 'Oklahoma',
//             },
//           ],
//         },
//         {
//           item: { description: 'region' },
//           data: [
//             {
//               bureau_organization: null,
//               code: '200000',
//               custom_description: '(A) BUREAU OF ADMINISTRATION',
//               groups: [],
//               highlighted_positions: [],
//               id: '200000',
//               isSelected: false,
//               is_bureau: true,
//               is_regional: false,
//               location: null,
//               long_description: 'BUREAU OF ADMINISTRATION',
//               parent_organization: null,
//               short_description: 'A',
//             },
//           ],
//         },
//         {
//           item: { description: 'bidCycle' },
//           data: [
//             {
//               active: true,
//               custom_description: '2018 DCM/PO Cycle',
//               cycle_deadline_date: null,
//               cycle_end_date: null,
//               cycle_start_date: null,
//               id: 155,
//               isSelected: false,
//               name: '2018 DCM/PO Cycle',
//             },
//           ],
//         },
//         {
//           item: { description: 'language' },
//           data: [
//             {
//               code: 'AB',
//               custom_description: 'Albanian (AB)',
//               effective_date: null,
//               formal_description: 'Albanian',
//               group: 'languages',
//               id: 'AB',
//               isSelected: false,
//               long_description: 'Albanian',
//               short_description: 'Albanian',
//             },
//           ],
//         },
//         {
//           item: { description: 'postIndicators' },
//           data: [
//             {
//               code: 'BT_MOST_DIFFICULT_TO_STAFF_FLG',
//               description: 'Historic Diff. to Staff',
//               isSelected: false,
//             },
//           ],
//         },
//         {
//           item: {
//             title: 'Organization',
//             sort: 1300,
//             description: 'organization',
//             tryCache: true,
//             text: 'Choose Organization',
//             choices: [],
//           },
//           data: [
//             {
//               code: '201000',
//               long_description: 'ASSISTANT SECRETARY FOR ADMINISTRATION',
//               short_description: 'A',
//             },
//             {
//               code: '222210',
//               long_description: 'TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
//               short_description: 'A/LM/OPS/TTM',
//             },
//           ],
//         },
//         {
//           item: { description: 'handshake' },
//           data: [
//             {
//               code: 'HS',
//               description: 'Has Handshake',
//               isSelected: false,
//             },
//           ],
//         },
//         {
//           item: { description: 'tmHandshake' },
//           data: [
//             {
//               code: 'A',
//               description: 'Accepted',
//               isSelected: false,
//             },
//           ],
//         },
//         {
//           item: { description: 'hardToFill' },
//           data: [
//             {
//               code: 'Y',
//               description: 'Is Hard to Fill',
//               isSelected: false,
//             },
//           ],
//         },
//       ],
//     },
//     bureauPermissions: [
//       {
//         code: '120000',
//         long_description: 'BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
//         short_description: 'EUR',
//       },
//     ],
//   };

//   it('is defined', () => {
//     const wrapper = shallow(<PositionManager.WrappedComponent {...props} />);
//     expect(wrapper).toBeDefined();
//   });
// });

