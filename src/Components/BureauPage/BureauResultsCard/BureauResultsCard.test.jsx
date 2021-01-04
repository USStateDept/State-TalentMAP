import { shallow } from 'enzyme';
import BureauResultsCard from './BureauResultsCard';
import resultsObject from '../../../__mocks__/resultsObject';

describe('BureauResultsCard', () => {
  const props = {
    result: resultsObject.results[0],
  };

  it('is defined', () => {
    const wrapper = shallow(<BureauResultsCard {...props} />);
    expect(wrapper).toBeDefined();
  });
});
