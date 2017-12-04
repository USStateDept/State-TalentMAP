import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../__mocks__/userObject';
import CurrentUser from './CurrentUser';

describe('CurrentUserComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUser userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUser userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
