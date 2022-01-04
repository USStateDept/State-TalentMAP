import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardTop from './ResultsCondensedCardTop';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('ResultsCondensedCardTopComponent', () => {
  const type = 'default';
  const favorites = [];
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        favorites={favorites}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isProjectedVacancy is true', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        favorites={favorites}
        bidList={bidListObject.results}
        isProjectedVacancy
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isRecentlyAvailable is true', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        favorites={favorites}
        bidList={bidListObject.results}
        isRecentlyAvailable
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
        favorites={favorites}
        bidList={bidListObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is serviceNeed', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        favorites={favorites}
        bidList={bidListObject.results}
        type="serviceNeed"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
