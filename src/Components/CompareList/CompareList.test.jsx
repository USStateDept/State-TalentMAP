import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CompareList from './CompareList';

describe('CompareListComponent', () => {
  let compare = null;
  let wrapper = null;

  const compareArray = [
    { id: 6,
      grade: '05',
      skill: 'OFFICE MANAGEMENT (9017)',
      bureau: '150000',
      organization: 'YAOUNDE CAMEROON (YAOUNDE)',
      position_number: '00025003',
      is_overseas: true,
      create_date: '2006-09-20',
      update_date: '2017-06-08',
      post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', location: 'MASERU, LESOTHO', cost_of_living_adjustment: 10, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
      languages: [
        { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
        { id: 1, language: 'German (GM)', written_proficiency: '2', spoken_proficiency: '2', representation: 'German (GM) 2/2' },
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
  ];

  beforeEach(() => {
    compare = TestUtils.renderIntoDocument(<MemoryRouter>
      <CompareList compare={compareArray} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(compare).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<CompareList compare={compareArray} />);
    expect(wrapper.instance().props.compare[0].id).toBe(6);
  });

  it('can call the onChildToggle function', () => {
    wrapper = shallow(<CompareList compare={compareArray} />);
    wrapper.instance().onChildToggle();
    expect(wrapper).toBeDefined();
  });
});
