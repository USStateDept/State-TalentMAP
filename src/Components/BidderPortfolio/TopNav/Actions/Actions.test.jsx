import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Actions from './Actions';

describe('ActionsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Actions />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Actions />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
