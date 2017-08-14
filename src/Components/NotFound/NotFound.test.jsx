import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('is defined', () => {
    const component = shallow(<NotFound />);
    expect(component).toBeDefined();
  });

  it('matches a snapshot', () => {
    const component = shallow(<NotFound />);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
