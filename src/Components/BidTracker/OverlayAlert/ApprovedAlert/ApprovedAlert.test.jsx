import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ApprovedAlert from './ApprovedAlert';

describe('ApprovedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ApprovedAlert userName="test" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ApprovedAlert userName="test" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
