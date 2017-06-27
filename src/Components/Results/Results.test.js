import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Results from './Results';

describe('ResultsComponent', () => {
  let results = null;

  const posts = [
    { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] },
    { id: 80, grade: '05', skill: 'INFORMATION MANAGEMENT (2880)', bureau: '110000', organization: 'SAO PAULO BRAZIL (SAO PAULO)', position_number: '55115002', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }] },
  ];

  const api = 'http://localhost:8000/api/v1';

  beforeEach(() => {
    results = TestUtils.renderIntoDocument(<Results results={posts} api={api} location={{ search: '' }} />);
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/').reply(200,
      posts,
    );
  });

  it('is defined', () => {
    const f = () => {
      setTimeout(() => {
        expect(results).toBeDefined();
      }, 0);
    };
    f();
  });

  it('can retrieve results via ajax', (done) => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/').reply(200,
      posts,
    );

    const wrapper = shallow(<Results api={api} location={{ search: '' }} />);
    const f = () => {
      setTimeout(() => {
        expect(wrapper.instance().state.posts.length).toBe(2);
        done();
      }, 0);
    };
    f();
  });

  it('can set state of posts', () => {
    const wrapper = shallow(<Results results={posts} api={api} location={{ search: '' }} />);
    expect(wrapper.instance().state.posts.length).toBe(2);
  });
});
