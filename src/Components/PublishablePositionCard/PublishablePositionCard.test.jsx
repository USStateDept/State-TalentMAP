import { shallow } from 'enzyme';
import PublishablePositionCard from './PublishablePositionCard';
import resultsObject from '../../__mocks__/resultsObject';

describe('PublishablePositionCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(<PublishablePositionCard data={result} />);
    expect(wrapper).toBeDefined();
  });
});
