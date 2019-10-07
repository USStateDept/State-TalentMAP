import { shallow } from 'enzyme';
import React from 'react';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NotFound />,
    );
    expect(wrapper).toBeDefined();
  });
});
