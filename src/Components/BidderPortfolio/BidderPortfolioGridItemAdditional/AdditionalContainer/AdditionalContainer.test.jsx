import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AdditionalContainer from './AdditionalContainer';

describe('AdditionalContainerComponent', () => {
  const props = {
    clientId: 1,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <AdditionalContainer
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AdditionalContainer
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
