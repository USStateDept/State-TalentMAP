import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CompareList from './CompareList';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareListComponent', () => {
  let compare = null;
  let wrapper = null;

  beforeEach(() => {
    compare = TestUtils.renderIntoDocument(<MemoryRouter>
      <CompareList compare={resultsObject.results} />
    </MemoryRouter>);
  });

  it('is defined', () => {
    expect(compare).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} />);
    expect(wrapper.instance().props.compare[0].id).toBe(6);
  });

  it('displays the comparison list when isLoading is false', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} isLoading={false} />);
    // h3 is an element in the comparison
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('Spinner').exists()).toBe(false);
  });

  it('displays the Spinner when isLoading is true', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} isLoading />);
    // h3 is an element in the comparison
    expect(wrapper.find('h3').exists()).toBe(false);
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    wrapper = shallow(<CompareList compare={resultsObject.results} isLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
