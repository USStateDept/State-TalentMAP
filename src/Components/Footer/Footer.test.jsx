import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = '/talentmap/';
  });

  it('is defined', () => {
    const footer = shallow(<Footer />);
    expect(footer).toBeDefined();
  });

  it('matches snapshot', () => {
    const footer = shallow(<Footer />);
    expect(toJSON(footer)).toMatchSnapshot();
  });
});
