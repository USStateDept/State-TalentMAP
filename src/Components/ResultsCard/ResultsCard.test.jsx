import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import TestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import ResultsCard from './ResultsCard';
import resultsObject from '../../__mocks__/resultsObject';

const mockStore = configureStore([thunk]);

describe('ResultsCardComponent', () => {
  let result = null;
  let wrapper = null;

  it('is defined', () => {
    result = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        bidList={[]}
      />
    </MemoryRouter></Provider>);
    expect(result).toBeDefined();
  });

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
