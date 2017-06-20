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

  it('can get results', () => {
    const wrapper = shallow(<Results />);
    wrapper.instance().getPosts('?language=3&language=2&skill=1&skill=3&q=ch');
  });
});
