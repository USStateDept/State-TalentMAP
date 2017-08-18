import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ResultsList from './ResultsList';

describe('ResultsListComponent', () => {
  let results = null;
  let wrapper = null;

  const resultsArray = {
    count: 2,
    results: [
      { id: 6,
        grade: '05',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', location: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
        languages: [
        { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
        ],
      },
      { id: 60,
        grade: '03',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: null,
        languages: [],
      },
    ],
  };

  beforeEach(() => {
    results = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsList results={resultsArray} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(results).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsList results={resultsArray} />);
    expect(wrapper.instance().props.results.results[0].id).toBe(6);
  });

  it('matches a snapshot with results', () => {
    wrapper = shallow(<ResultsList results={resultsArray} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can call the onChildToggle function', () => {
    wrapper = shallow(<ResultsList results={resultsArray} />);
    // define the instance
    const instance = wrapper.instance();
    // spy the logout function
    const handleClickSpy = sinon.spy(instance, 'onChildToggle');
    wrapper.instance().onChildToggle();
    sinon.assert.calledOnce(handleClickSpy);
  });

  it('can handle an empty result set', () => {
    wrapper = shallow(<ResultsList results={{}} />);
    expect(wrapper.find('div').hasClass('results-loading')).toBe(false);
  });

  it('matches a snapshot with an empty result set', () => {
    wrapper = shallow(<ResultsList results={{}} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
