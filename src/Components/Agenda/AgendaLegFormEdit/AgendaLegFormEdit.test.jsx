import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaLegFormEdit from './AgendaLegFormEdit';

const props = {
  leg: {
    id: 41387,
    pos_title: 'REGIONAL SECURITY OFFICER',
    pos_num: '57019000',
    org: 'A',
    eta: '2019-05-05T00:00:00.000Z',
    ted: '2020-07-05T00:00:00.000Z',
    tod: '1 YEAR',
    grade: '00',
    action: 'Extend',
    travel: null,
  },
  legNum: 3,
  TODs: [
    '{code: "C", id: "C", is_active: true, long_descript…}',
    '{code: "V", id: "V", is_active: true, long_descript…}',
  ],
  legActionTypes: [
    '{abbr_desc_text: "Chg ETA", code: "G", desc_text: "…}',
    '{abbr_desc_text: "Reassign", code: "E", desc_text: …}',
  ],
  travelFunctions: [
    '{abbr_desc_text: "PostToPostNoHL", code: "1", desc_…}',
    '{abbr_desc_text: "PostToPostHL", code: "2", desc_te…}',
  ],
};


describe('AgendaLeg Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AgendaLegFormEdit {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaLegFormEdit {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
