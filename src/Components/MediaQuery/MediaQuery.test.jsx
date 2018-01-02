import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import MediaQuery from './MediaQuery';

describe('MediaQueryComponent', () => {
  it('is defined when widthType is "max"', () => {
    const wrapper = shallow(
      <MediaQuery
        breakpoint="screenSmMin"
        widthType="max"
      >
        <div />
      </MediaQuery>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when widthType is "min"', () => {
    const wrapper = shallow(
      <MediaQuery
        breakpoint="screenSmMax"
        widthType="min"
      >
        <div />
      </MediaQuery>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MediaQuery
        breakpoint="screenSmMin"
        widthType="max"
      >
        <div />
      </MediaQuery>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
