import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfileDashboard from './ProfileDashboard';

describe('ProfileDashboardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ProfileDashboard />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<ProfileDashboard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
