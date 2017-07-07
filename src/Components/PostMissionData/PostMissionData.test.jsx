import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import PostMissionData from './PostMissionData';

describe('PostMissionDataComponent', () => {
  let postMissionData = null;
  let wrapper = null;

  const postObject = {
    id: 100,
    tour_of_duty: '1Y2RR',
    code: 'AF1000000',
    description: 'HERAT, AFGHANISTAN',
    cost_of_living_adjustment: 0,
    differential_rate: 35,
    danger_pay: 35,
    rest_relaxation_point: 'London',
    has_consumable_allowance: true,
    has_service_needs_differential: true,
    languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
  };

  beforeEach(() => {
    postMissionData = TestUtils.renderIntoDocument(<MemoryRouter>
      <PostMissionData post={postObject} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(postMissionData).toBeDefined();
  });

  it('is can receive props', () => {
    wrapper = shallow(<PostMissionData post={postObject} />);
    expect(wrapper.instance().props.post.id).toBe(100);
    expect(wrapper.instance().props.post.has_service_needs_differential).toBe(true);
  });

  it('is can receive props with false values', () => {
    Object.assign(postObject, {
      languages: [],
      has_consumable_allowance: null,
      has_service_needs_differential: false,
    });
    wrapper = shallow(<PostMissionData post={postObject} />);
    expect(wrapper.instance().props.post.languages.length).toBe(0);
    expect(wrapper.instance().props.post.has_service_needs_differential).toBe(false);
  });
});
