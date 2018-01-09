import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ClosedAlert from './ClosedAlert';

describe('ClosedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ClosedAlert title="title" date="6.11.17" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ClosedAlert title="title" date="6.11.17" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
