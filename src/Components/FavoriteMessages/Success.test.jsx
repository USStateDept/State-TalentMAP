import { shallow } from 'enzyme';
import Success from './Success';
import detailsObject from '../../__mocks__/detailsObject';

describe('Success', () => {
  it('is defined', () => {
    const wrapper = shallow(<Success pos={detailsObject} />);
    expect(wrapper).toBeDefined();
  });
});
