import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ResultsCardDataSection from './ResultsCardDataSection';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCardDataSectionComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsCardDataSection result={resultsObject.results[0]} />
    </MemoryRouter>);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper =
      shallow(<ResultsCardDataSection result={resultsObject.results[0]} />);
    expect(wrapper.instance().props.result.id).toBe(6);
  });

  it('can receive different types of results', () => {
    const wrapper =
      shallow(<ResultsCardDataSection result={resultsObject.results[1]} />);
    expect(wrapper.instance().props.result.id).toBe(60);
  });
});
