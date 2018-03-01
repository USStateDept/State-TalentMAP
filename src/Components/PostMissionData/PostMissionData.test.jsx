import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import PostMissionData from './PostMissionData';
import postObject from '../../__mocks__/postObject';

describe('PostMissionDataComponent', () => {
  let postMissionData = null;
  let wrapper = null;

  beforeEach(() => {
    postMissionData = TestUtils.renderIntoDocument(<MemoryRouter>
      <PostMissionData post={postObject} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(postMissionData).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<PostMissionData post={postObject} />);
    expect(wrapper.instance().props.post.id).toBe(100);
    expect(wrapper.instance().props.post.has_service_needs_differential).toBe(true);
  });

  it('displays the OBC link if obc_id exists', () => {
    const newPostObject = { ...postObject };
    newPostObject.obc_id = 1;
    wrapper = shallow(<PostMissionData post={newPostObject} />);
    expect(wrapper.find('OBCUrl').exists()).toBe(true);
  });

  it('hides the OBC link if obc_id does not exist', () => {
    const newPostObject = { ...postObject };
    newPostObject.obc_id = 1;
    wrapper = shallow(<PostMissionData post={postObject} />);
    expect(wrapper.find('OBCUrl').exists()).toBe(false);
  });

  it('can receive props with false values', () => {
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
