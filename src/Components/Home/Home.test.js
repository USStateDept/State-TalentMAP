import { shallow, render, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Home from './Home';

describe('HomeComponent', () => {

  let home = null;

  beforeEach(() => {
    home = TestUtils.renderIntoDocument(<Home location={{}} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
  });

  it('is defined', () => {
    expect(home).toBeDefined();
  });

  it('can change text', () => {
    const wrapper = shallow(<Home />);
    wrapper.instance().changeText({ target: { value: 'ch' } });
  });

  it('can create a query string', () => {
    const wrapper = shallow(<Home selection={{ selection: { skill: [1], language: [2], grade: [], q: 'test' } }} />);
    wrapper.instance().createQueryString();
  });

  it('can change a checkbox', () => {
    const wrapper = shallow(<Home />);
    wrapper.instance().changeCheck('1', { target: { value: '2' } });
  });
});
