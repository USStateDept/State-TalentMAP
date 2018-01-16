import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossarySearch from './GlossarySearch';

describe('GlossaryComponent', () => {
  const props = {
    changeText: () => {},
    searchTextValue: 'test',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <GlossarySearch
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <GlossarySearch
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
