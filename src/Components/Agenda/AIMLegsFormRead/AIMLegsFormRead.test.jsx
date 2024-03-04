import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AIMLegsFormRead from './AIMLegsFormRead';


const legs = [{
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
}];

describe('AgendaItemLegs Component', () => {
  it('is defined', () => {
    const wrapper = shallow(<AIMLegsFormRead legs={legs} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AIMLegsFormRead legs={legs} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
