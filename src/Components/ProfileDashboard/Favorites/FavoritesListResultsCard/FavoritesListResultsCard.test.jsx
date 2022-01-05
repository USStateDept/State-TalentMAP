import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import FavoritesListResultsCard from './FavoritesListResultsCard';
import resultsObject from '../../../../__mocks__/resultsObject';

describe('FavoritesListResultsCardComponent', () => {
  const position = resultsObject.results[0];
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritesListResultsCard
        position={position}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritesListResultsCard
        position={position}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
