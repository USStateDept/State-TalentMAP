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
    expect(wrapper.instance().props.result.id).toBe(6);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[1]}
        onToggle={() => {}}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.id).toBe(60);
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
        result={{ id: 1 }}
        onToggle={() => {}}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
