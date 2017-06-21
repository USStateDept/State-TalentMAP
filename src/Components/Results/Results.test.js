import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Results from './Results';

describe('ResultsComponent', () => {
  let results = null;

  const posts = [
    {
      id: 84,
      skill: 1,
      skill_text: 'accounting',
      language: 1,
      language_text: 'english',
      grade: 1,
      city: 'Mazowe',
    },
    {
      id: 90,
      skill: 1,
      skill_text: 'accounting',
      language: 1,
      language_text: 'english',
      grade: 1,
      city: 'Karangparwa',
    },
  ];

  beforeEach(() => {
    results = TestUtils.renderIntoDocument(<Results posts={posts} location={{}} />);
  });

  it('is defined', () => {
    expect(results).toBeDefined();
  });

  it('can set state of posts', () => {
    const wrapper = shallow(<Results />);
    wrapper.setState({ posts });
    expect(wrapper.instance().state.posts.length).toBe(2);
  });
});
