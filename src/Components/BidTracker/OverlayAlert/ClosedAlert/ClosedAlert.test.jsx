import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ClosedAlert from './ClosedAlert';

describe('ClosedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ClosedAlert />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ClosedAlert />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
