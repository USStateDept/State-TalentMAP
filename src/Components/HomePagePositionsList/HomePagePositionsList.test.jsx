import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HomePagePositionsList from './HomePagePositionsList';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('HomePagePositionsList', () => {
  const props = {
    bidList: bidListObject.results,
    type: 'default',
    title: 'title',
  };

  it('is defined', () => {
    const wrapper = shallow(<HomePagePositionsList
      positions={resultsObject.results}
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('renders the results-loading class if isLoading is true', () => {
    const wrapper = shallow(<HomePagePositionsList
      positions={resultsObject.results}
      {...props}
      isLoading
    />);
    expect(wrapper.find('.results-loading').exists()).toBe(true);
  });

  it('displays two rows', () => {
    // test with 7 positions and a max of 6
    const positions = Array(7).fill(resultsObject.results[0]);

    const wrapper = shallow(<HomePagePositionsList
      positions={positions}
      {...props}
    />);
    expect(wrapper.find('.condensed-card').length).toEqual(positions.length);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
