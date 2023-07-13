import { shallow } from 'enzyme';
import ProjectedVacancyCard from './ProjectedVacancyCard';
import resultsObject from '../../__mocks__/resultsObject';

describe('ProjectedVacancyCard', () => {
  const result = resultsObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(<ProjectedVacancyCard result={result} />);
    expect(wrapper).toBeDefined();
  });
});
