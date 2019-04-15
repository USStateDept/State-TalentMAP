import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { ExportLink, mapDispatchToProps } from './ExportLink';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('SearchResultsExportLink', () => {
  it('is defined', () => {
    const wrapper = shallow(<ExportLink />);
    expect(wrapper).toBeDefined();
  });

  it('calls onClick on button click', () => {
    const wrapper = shallow(<ExportLink />);
    expect(wrapper.instance().state.isLoading).toBe(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().state.isLoading).toBe(true);
  });

  it('sets state when data is done loading', () => {
    const wrapper = shallow(<ExportLink isLoading />);
    const instance = wrapper.instance();
    const data = { results: [] };
    wrapper.setProps({ isLoading: false, hasErrored: false, data });
    expect(instance.state.isLoading).toBe(false);
    expect(instance.state.data).toEqual(data.results);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ExportLink />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
