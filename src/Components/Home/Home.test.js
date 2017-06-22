import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Home from './Home';
import items from './items.json';

describe('HomeComponent', () => {
  let home = null;

  beforeEach(() => {
    home = TestUtils.renderIntoDocument(<Home items={items} location={{}} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home items={items} />, div);
  });

  it('is defined', () => {
    expect(home).toBeDefined();
  });

  it('can change text', () => {
    const wrapper = shallow(<Home items={items} />);
    wrapper.find('#search-field-big').simulate('change', { target: { value: 'info Tech' } });
    expect(wrapper.find('#search-field-big').props().value).toBe('info Tech');
  });

  it('can create a query string', () => {
    const wrapper = shallow(<Home items={items} />);
    wrapper.instance().changeText({ target: { value: 'info Tech' } });
    expect(wrapper.instance().state.qString).toBe('q=info%20Tech');
  });

  it('can check a checkbox', () => {
    const wrapper = shallow(<Home items={items} />);
    wrapper.find('#1-1').simulate('change', (1, { target: { checked: true, value: 1 } }));
    expect(wrapper.instance().state.selection.language[0]).toBe(1);
  });

  it('can check and then uncheck a checkbox', () => {
    const wrapper = shallow(<Home items={items} />);
    wrapper.find('#1-1').simulate('change', (1, { target: { checked: true, value: 1 } }));
    wrapper.find('#1-1').simulate('change', (1, { target: { checked: false, value: 1 } }));
    expect(wrapper.instance().state.selection.language.length).toBe(0);
  });
});
