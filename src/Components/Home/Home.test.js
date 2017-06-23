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
    wrapper.find('#search-field').simulate('change', { target: { value: 'info Tech' } });
    expect(wrapper.find('#search-field').props().value).toBe('info Tech');
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

  it('should disable search if less than two filters are selected', () => {
    const wrapper = shallow(<Home items={items} />);
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
    const wrapper = shallow(<Home items={items} />);
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
