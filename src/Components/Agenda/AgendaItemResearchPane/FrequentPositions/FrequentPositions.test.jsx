import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import FrequentPositions from './FrequentPositions';

describe('FrequentPositionsComponent', () => {
  const props = {
    positions: [
      {
        org: 'AF',
        position_number: '010101010',
        position_title: 'Information Technology Spec',
      },
    ],
  };
  it('is defined', () => {
    const wrapper = shallow(<FrequentPositions {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<FrequentPositions {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
