import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCard, { renderBidCount } from './ResultsCard';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCardComponent', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.position.id).toBe(6);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[1]}
        onToggle={() => {}}
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
        onToggle={() => {}}
        bidList={[]}
      />);
    const output = wrapper.instance().getOffsetPx();

    // should be offsetTop minus offsetHeight
    expect(output).toBe('30px');
  });

  it('renders bid count', () => {
    expect(renderBidCount({})).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with empty result', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={{ position: { id: 1 } }}
        onToggle={() => {}}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
