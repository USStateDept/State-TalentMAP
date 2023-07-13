import { shallow } from 'enzyme';
import CyclePositionCard from './CyclePositionCard';
import resultsObject from '../../__mocks__/resultsObject';

describe('CyclePositionCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(<CyclePositionCard data={result} />);
    expect(wrapper).toBeDefined();
  });
});
