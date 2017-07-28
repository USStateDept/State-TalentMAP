import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Footer from './Footer';

describe('DetailsComponent', () => {
  let footer = null;

  it('is defined', () => {
    footer = shallow(<Footer />);
    expect(footer).toBeDefined();
  });

  it('takes props', () => {
    footer = shallow(<Footer />);
    expect(toJSON(footer)).toMatchSnapshot();
  });
});
