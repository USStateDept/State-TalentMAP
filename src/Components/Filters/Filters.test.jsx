import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
import { createStore, combineReducers, applyMiddleware } from 'redux'; // eslint-disable-line
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'; // eslint-disable-line
import rootReducer from '../../reducers';
import Filters from './Filters';

const history = createHistory();

const middleware = routerMiddleware(history);

function configureStore(initialState) {
  return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware),
    );
}
const store = configureStore();

const context = createRouterContext();

const api = 'http://localhost:8000/api/v1';

let wrapper = null;

describe('FiltersComponent', () => {
  const items = [
    {
      item: {
        title: 'Skill code',
        sort: 100,
        description: 'skill',
        endpoint: 'position/skills',
        selectionRef: 'skill__code__in',
        text: 'Choose skill codes',
      },
      data: [
        { id: 2, code: '0010', description: 'EXECUTIVE (PAS)' },
        { id: 3, code: '0020', description: 'EXECUTIVE (CAREER)' },
      ],
    },
    {
      item: {
        title: 'Language',
        sort: 200,
        description: 'language',
        endpoint: 'language',
        selectionRef: 'languages__language__code__in',
        text: 'Choose languages',
      },
      data: [
        { id: 3, code: 'AB', long_description: 'Albanian', short_description: 'Albanian', effective_date: '1984-05-04' },
        { id: 4, code: 'AC', long_description: 'Amharic', short_description: 'Amharic', effective_date: '1984-05-04' },
      ],
    },
    {
      item: {
        title: 'Grade',
        sort: 300,
        description: 'grade',
        endpoint: 'position/grades',
        selectionRef: 'grade__code__in',
        text: 'Choose grades',
      },
      data: [
        { id: 2, code: '00' },
        { id: 3, code: '01' },
      ],
    },
  ];

  beforeEach(() => {

  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter>
      <Filters api={api} items={items} store={store} /></MemoryRouter>, div);
  });

  it('is defined', (done) => {
    const home = TestUtils.renderIntoDocument(<MemoryRouter>
      <Filters api={api} store={store} items={items} location={{}} />
    </MemoryRouter>, { context });
    const f = () => {
      setTimeout(() => {
        expect(home).toBeDefined();
        done();
      }, 0);
    };
    f();
  });

  it('can change text', (done) => {
    wrapper = shallow(<Filters store={store} items={items} api={api} />, { context });
    wrapper.find('#search-field').simulate('change', { target: { value: 'info Tech' } });
    expect(wrapper.find('#search-field').props().value).toBe('info Tech');
    wrapper.unmount();
    done();
  });

  it('can create a query string', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
        wrapper.instance().changeText({ target: { value: 'info Tech' } });
        expect(wrapper.instance().state.qString).toBe('q=info%20Tech');
        done();
      }, 0);
    };
    f();
  });

  it('can check a checkbox', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
        wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
        done();
      }, 0);
    };
    f();
  });

  it('can check and then uncheck a checkbox', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
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
        done();
      }, 0);
    };
    f();
  });

  it('should disable search if less than two filters are selected', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
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
        done();
      }, 0);
    };
    f();
  });

  it('should enable search if two filters are selected, excluding search text', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
    // no filters are initially set, so should return true
        expect(wrapper.instance().shouldDisableSearch()).toBe(true);
    // select a language filter
        wrapper.find('#AB').simulate('change', (1, { target: { checked: true, value: 'AB' } }));
    // select a skill filter
        wrapper.find('#S0010').simulate('change', (0, { target: { checked: true, value: '0010' } }));
        expect(wrapper.instance().shouldDisableSearch()).toBe(false);
        done();
      }, 0);
    };
    f();
  });

  it('should be able to enable language proficiency filters', (done) => {
    wrapper = shallow(<Filters api={api} items={items} />, { context });
    const f = () => {
      setTimeout(() => {
    // change English written to 1
        wrapper.find('#Albanian-written-1').simulate('click', ('Albanian-written', '1', 1));
    // change English spoken to 1
        wrapper.find('#Albanian-spoken-1').simulate('click', ('Albanian-written', '1', 1));
    // English written should be 1
        expect(wrapper.instance().state.proficiency['Albanian-written']).toBe('1');
    // English spoken should be 1
        expect(wrapper.instance().state.proficiency['Albanian-spoken']).toBe('1');
        done();
      }, 0);
    };
    f();
  });
});
