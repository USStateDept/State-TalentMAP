import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import userObject from '../../../__mocks__/userObject';
import CurrentUser from './CurrentUser';

describe('CurrentUserComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUser userProfile={userObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<CurrentUser userProfile={userObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
