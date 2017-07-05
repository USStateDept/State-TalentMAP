import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ResultsList from './ResultsList';

describe('ResultsListComponent', () => {
  let results = null;
  let wrapper = null;

  const resultsArray = [
    { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] },
    { id: 80, grade: '05', skill: 'INFORMATION MANAGEMENT (2880)', bureau: '110000', organization: 'SAO PAULO BRAZIL (SAO PAULO)', position_number: '55115002', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }] },
  ];

  beforeEach(() => {
    results = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsList results={resultsArray} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(results).toBeDefined();
  });

  it('is can receive props', () => {
    wrapper = shallow(<ResultsList results={resultsArray} />);
    expect(wrapper.instance().props.results[0].id).toBe(6);
  });
});
