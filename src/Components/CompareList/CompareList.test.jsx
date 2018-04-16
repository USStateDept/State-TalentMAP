import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CompareList from './CompareList';
import resultsObject from '../../__mocks__/resultsObject';

describe('CompareListComponent', () => {
  const props = {
    goBackLink: { text: 'Go back to search results' },
  };
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<MemoryRouter>
      <CompareList {...props} compare={resultsObject.results} />
    </MemoryRouter>);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(wrapper.instance().props.compare[0].id).toBe(6);
  });

  it('displays the comparison list when isLoading is false', () => {
    const wrapper = shallow(
      <CompareList {...props} compare={resultsObject.results} isLoading={false} />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(true);
    expect(wrapper.find('Spinner').exists()).toBe(false);
  });

  it('displays the Spinner when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(wrapper.find('.comparison-table-container').exists()).toBe(false);
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    const wrapper = shallow(<CompareList {...props} compare={resultsObject.results} isLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
