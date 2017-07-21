import { shallow } from 'enzyme';
import React from 'react';
import PositionDetails from './PositionDetails';

describe('PositionDetailsComponent', () => {
  let wrapper = null;

  const api = 'localhost:8000/api/v1/';

  const detailsObject = {
    id: 6,
    grade: '05',
    skill: 'OFFICE MANAGEMENT (9017)',
    bureau: '150000',
    organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
    position_number: '00003027',
    is_overseas: true,
    create_date: '2006-09-20',
    update_date: '2017-06-08',
    post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', description: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
    languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
  };

  beforeEach(() => {
  });

  it('is can receive props', () => {
    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.id).toBe(6);
  });

  it('handles different props and different position objects', () => {
    Object.assign(detailsObject, { languages: [], post: null, is_overseas: false });

    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading={false} hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });

  it('handles different types of position objects', () => {
    Object.assign(detailsObject, { languages: [], is_overseas: true });

    wrapper = shallow(
      <PositionDetails api={api} details={detailsObject} isLoading hasErrored={false} />,
    );
    expect(wrapper.instance().props.details.languages.length).toBe(0);
  });
});
