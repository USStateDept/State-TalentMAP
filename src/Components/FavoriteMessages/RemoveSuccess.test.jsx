import { shallow } from 'enzyme';
import RemoveSuccess from './RemoveSuccess';
import detailsObject from '../../__mocks__/detailsObject';

describe('RemoveSuccess', () => {
  it('is defined', () => {
    const wrapper = shallow(<RemoveSuccess pos={detailsObject} onToggle={() => {}} />);
    expect(wrapper).toBeDefined();
  });
});
