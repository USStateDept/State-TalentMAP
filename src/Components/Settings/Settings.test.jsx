import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Settings from './Settings';

describe('SettingsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Settings />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Settings />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
