import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentUser from './CurrentUser';

describe('CurrentUserComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUser />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<CurrentUser />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
