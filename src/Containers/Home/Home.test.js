import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from './Home';

const api = 'http://localhost:8000/api/v1';

describe('HomeComponent', () => {

  const filters = [
    [
          { id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
          { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' },
    ],
    [
          { id: 3, code: 'AB', long_description: 'Albanian', short_description: 'Albanian', effective_date: '1984-05-04' },
          { id: 4, code: 'AC', long_description: 'Amharic', short_description: 'Amharic', effective_date: '1984-05-04' },
    ],
    [
          { id: 2, code: '00' },
          { id: 3, code: '01' },
    ],
  ];

  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/grades/').reply(200, [
      filters[0],
    ],
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/language/').reply(200, [
      filters[1],
    ],
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/position/skills/').reply(200, [
      filters[2],
    ],
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Home api={api} /></MemoryRouter>, div);
  });

  it('is defined', () => {
    const home = TestUtils.renderIntoDocument(<MemoryRouter>
      <Home api={api} location={{}} />
    </MemoryRouter>);
    expect(home).toBeDefined();
  });

  it('can change text', () => {
    const wrapper = shallow(<Home api={api} />);
    wrapper.find('#search-field').simulate('change', { target: { value: 'info Tech' } });
    expect(wrapper.find('#search-field').props().value).toBe('info Tech');
  });

  it('can create a query string', () => {
    const wrapper = shallow(<Home api={api} filters={filters} />);
    wrapper.instance().changeText({ target: { value: 'info Tech' } });
    expect(wrapper.instance().state.qString).toBe('position_number__icontains=info%20Tech');
  });

  it('can check a checkbox', () => {
    const wrapper = shallow(<Home api={api} filters={filters} />);
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
    expect(wrapper.instance().state.selection.skill__code__in.length).toBe(1);
  });

  it('can check and then uncheck a checkbox', () => {
    const wrapper = shallow(<Home api={api} filters={filters} />);
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
    expect(wrapper.instance().state.selection.skill__code__in.length).toBe(1);
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: false, value: '0010' } }));
    wrapper.find('#AB').simulate('change', (1, { target: { checked: true, value: 'AB' } }));
    expect(wrapper.instance().state.selection.languages__language__code__in.length).toBe(1);
    wrapper.find('#AB').simulate('change', (1, { target: { checked: false, value: 'AB' } }));
    wrapper.find('#G00').simulate('change', (2, { target: { checked: true, value: '00' } }));
    expect(wrapper.instance().state.selection.grade__code__in.length).toBe(1);
    wrapper.find('#G00').simulate('change', (2, { target: { checked: false, value: '00' } }));
    expect(wrapper.instance().state.selection.skill__code__in.length).toBe(0);
    expect(wrapper.instance().state.selection.languages__language__code__in.length).toBe(0);
    expect(wrapper.instance().state.selection.grade__code__in.length).toBe(0);
  });

  it('should disable search if less than two filters are selected', () => {
    const wrapper = shallow(<Home api={api} filters={filters} />);
    // no filters are initially set, so should return true
    expect(wrapper.instance().shouldDisableSearch()).toBe(true);
    // enable search filter
    wrapper.find('#search-field').simulate('change', { target: { value: 'test' } });
    // select a checkbox filter
    wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
    expect(wrapper.instance().shouldDisableSearch()).toBe(false);
    // remove the original search filter
    wrapper.find('#search-field').simulate('change', { target: { value: '' } });
    // one filter is selected, should return false
    expect(wrapper.instance().shouldDisableSearch()).toBe(true);
  });

  it('should be able to enable language proficiency filters', () => {
    const wrapper = shallow(<Home api={api} filters={filters} />);
    // change English written to 1
    wrapper.find('#Albanian-written-1').simulate('click', ('Albanian-written', '1', 1));
    // change English spoken to 1
    wrapper.find('#Albanian-spoken-1').simulate('click', ('Albanian-written', '1', 1));
    // English written should be 1
    expect(wrapper.instance().state.proficiency['Albanian-written']).toBe('1');
    // English spoken should be 1
    expect(wrapper.instance().state.proficiency['Albanian-spoken']).toBe('1');
  });
});
