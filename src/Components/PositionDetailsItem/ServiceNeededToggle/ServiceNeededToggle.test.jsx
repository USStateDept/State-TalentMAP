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
  beforeEach(() => {
    props.userProfile.is_superuser = true;
  });

  it('is defined', () => {
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toggle.html()).not.toBeNull();
  });

  it('only renders when user is superuser', () => {
    props.userProfile.is_superuser = false;
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toggle.html()).toBeNull();
  });

  it('verifies loading state renders and refreshes', () => {
    let toggle;

    toggle = shallow(<ServiceNeededToggle {...props} loading />);
    expect(toggle.find('.ds-c-spinner').length).toBe(1);

    toggle = shallow(<ServiceNeededToggle {...props} loading={false} />);
    expect(toggle.find('.ds-c-spinner').length).toBe(0);
  });

  it('matches snapshot', () => {
    const toggle = shallow(<ServiceNeededToggle {...props} />);
    expect(toJSON(toggle)).toMatchSnapshot();
  });
});
