import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Details from './Details';

describe('DetailsComponent', () => {
  let detailsItem = null;

  const id = '00003026';

  const api = 'http://localhost:8000/api/v1';

  const details = {
    id: 4,
    grade: '05',
    skill: 'OFFICE MANAGEMENT (9017)',
    bureau: '150000',
    organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
    position_number: '00003026',
    is_overseas: true,
    create_date: '2006-09-20',
    update_date: '2017-06-08',
    languages: [],
  };

  beforeEach(() => {
    detailsItem = TestUtils.renderIntoDocument(<Details id={id} api={api} />);
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number=00003026').reply(200, [
      details,
    ],
    );
  });

  it('is defined', () => {
    const f = () => {
      setTimeout(() => {
        expect(detailsItem).toBeDefined();
      }, 0);
    };
    f();
  });

  it('can set state of details', (done) => {
    const wrapper = shallow(<Details match={{ params: { id } }} api={api} />);

    const f = () => {
      setTimeout(() => {
        expect(wrapper.instance().state.details.id).toBe(4);
        done();
      }, 0);
    };
    f();
  });
});
