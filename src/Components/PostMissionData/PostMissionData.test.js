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
    grade: '05',
    city: 'London',
    type: 'type',
    poc: 'John Doe',
    rr_alignment: 'Alignment',
    danger: 'True',
    post_diff: '1.5',
    sn_diff: '1.75',
    cola: '1.25',
    consumables: '1000',
    languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }],
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
  });
});
