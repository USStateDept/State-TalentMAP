import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import RescheduledIcon from './RescheduledIcon';

describe('RescheduledIconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <RescheduledIcon />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <RescheduledIcon />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
