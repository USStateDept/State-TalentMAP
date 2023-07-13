import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ResultsCard from './ResultsCard';
import resultsObject from '../../__mocks__/resultsObject';
import { renderBidCount } from 'utilities';

describe('ResultsCardComponent', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => { }}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.position.id).toBe(6);
  });

  it('is defined when isProjectedVacancy === true', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => { }}
        bidList={[]}
      />, { context: { isProjectedVacancy: true } });
    expect(wrapper).toBeDefined();
  });

  it('can receive different types of results', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[1]}
        onToggle={() => { }}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.position.id).toBe(60);
  });

  it('returns the offset px', () => {
    global.document.getElementById = () => ({ offsetTop: 50, offsetHeight: 80 });

    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[1]}
        onToggle={() => { }}
        bidList={[]}
      />);
    const output = wrapper.instance().getOffsetPx();

    // should be offsetTop minus offsetHeight
    expect(output).toBe('30px');
  });

  it('renders bid count', () => {
    expect(renderBidCount({})).toBeDefined();
    const BidCount = () => renderBidCount();
    expect(shallow(<BidCount />)).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => { }}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when context.isClient === true', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => { }}
        bidList={[]}
      />, { context: { isClient: true } });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with empty result', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={{ position: { id: 1 } }}
        onToggle={() => { }}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
