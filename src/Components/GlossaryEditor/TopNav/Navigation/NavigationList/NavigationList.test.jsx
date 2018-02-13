import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NavigationList from './NavigationList';

describe('NavigationListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NavigationList />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NavigationList />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
