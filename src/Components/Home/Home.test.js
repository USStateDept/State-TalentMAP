import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from './Home';

const api = 'http://localhost:8000/api/v1';

describe('HomeComponent', () => {
  let home = null;

  beforeEach(() => {
    home = TestUtils.renderIntoDocument(<Home api={api} location={{}} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home api={api} />, div);
  });

  it('is defined', () => {
    expect(home).toBeDefined();
  });

  it('can change text', () => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/skills/').reply(200, [
          { id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
          { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' },
    ],
    );
    const wrapper = shallow(<Home api={api} />);
    wrapper.find('#search-field').simulate('change', { target: { value: 'info Tech' } });
    expect(wrapper.find('#search-field').props().value).toBe('info Tech');
  });

  it('can create a query string', () => {
    const wrapper = shallow(<Home api={api} />);
    wrapper.instance().changeText({ target: { value: 'info Tech' } });
    expect(wrapper.instance().state.qString).toBe('position_number__icontains=info%20Tech');
  });

  it('can check a checkbox', () => {
    const wrapper = shallow(<Home api={api} />);
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/skills/').reply(200, [
          { id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
          { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' },
    ],
    );
    setTimeout(() => {
      wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
      expect(wrapper.instance().state.selection.skill__code__in.length).toBe(1);
    }, 10);
  });

  it('can check and then uncheck a checkbox', () => {
    const wrapper = shallow(<Home api={api} />);
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: false, value: '0010' } }));
    expect(wrapper.instance().state.selection.skill__code__in.length).toBe(1);
  });

  it('should disable search if less than two filters are selected', () => {
    const wrapper = shallow(<Home api={api} />);
    // no filters are initially set, so should return true
    expect(wrapper.instance().shouldDisableSearch()).toBe(true);
    // enable search filter
    wrapper.find('#search-field').simulate('change', { target: { value: 'test' } });
    // select a checkbox filter
    wrapper.find('#1-1').simulate('change', (1, { target: { checked: true, value: 1 } }));
    expect(wrapper.instance().shouldDisableSearch()).toBe(false);
    // remove the original search filter
    wrapper.find('#search-field').simulate('change', { target: { value: '' } });
    // one filter is selected, should return false
    expect(wrapper.instance().shouldDisableSearch()).toBe(true);
  });

  it('should be able to enable language proficiency filters', () => {
    const wrapper = shallow(<Home api={api} />);
    // change English written to 1
    wrapper.find('#English-written-1').simulate('click', ('English-written', '1', 1));
    // change English spoken to 1
    wrapper.find('#English-spoken-1').simulate('click', ('English-written', '1', 1));
    // English written should be 1
    expect(wrapper.instance().state.proficiency['English-written']).toBe('1');
    // English spoken should be 1
    expect(wrapper.instance().state.proficiency['English-spoken']).toBe('1');
  });
});
