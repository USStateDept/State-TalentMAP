import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SearchBar from './SearchBar';

['small', 'medium', 'big'].forEach((size) => {
  describe(`SearchBarComponent ${size}`, () => {
    let wrapper = null;

    it('can receive props', () => {
      wrapper = shallow(
        <SearchBar
          id="search"
          type={size}
          submitDisabled
          submitText="Submit"
          alertText="Search disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(wrapper.instance().props.id).toBe('search');
    });

    it('handles different props', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          label="Label"
          type={size}
          submitDisabled={false}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(wrapper.instance().props.id).toBe('search-2');
    });

    it('can change text', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          type={size}
          submitDisabled={false}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      wrapper.instance().changeText({ target: { value: 'test' } });
      expect(wrapper.instance().state.searchText.value).toBe('test');
    });

    it('matches snapshot', () => {
      wrapper = shallow(
        <SearchBar
          id="search-2"
          label="Label"
          type={size}
          submitDisabled={false}
          submitText="Submit 2"
          alertText="Search is disabled"
          onChangeText={() => {}}
          onSubmitSearch={() => {}}
        />,
      );
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
