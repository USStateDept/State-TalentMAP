import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ServiceNeededToggle from './ServiceNeededToggle';

import mock from '../../../__mocks__/detailsObject';

const userMock = {
  is_superuser: true,
};

const props = {
  position: mock,
  userProfile: userMock,
};

describe('ServiceNeededToggle', () => {
  it('is defined', () => {
    props.userProfile.is_superuser = true;
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toggle.html()).not.toBeNull();
  });

  it('Only renders when user is superuser', () => {
    props.userProfile.is_superuser = false;
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toggle.html()).toBeNull();
  });

  it('matches snapshot', () => {
    props.userProfile.is_superuser = true;
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toJSON(toggle)).toMatchSnapshot();
  });
});
