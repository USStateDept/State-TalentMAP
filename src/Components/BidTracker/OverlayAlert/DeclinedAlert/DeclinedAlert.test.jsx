import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import DeclinedAlert from './DeclinedAlert';

describe('DeclinedAlertComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <DeclinedAlert bureau="test" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <DeclinedAlert bureau="test" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
