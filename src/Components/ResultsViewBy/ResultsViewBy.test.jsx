import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsViewBy from './ResultsViewBy';

describe('ResultsViewByComponent', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsViewBy />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
