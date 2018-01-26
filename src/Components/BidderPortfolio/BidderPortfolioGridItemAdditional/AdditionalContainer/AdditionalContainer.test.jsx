import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AdditionalContainer from './AdditionalContainer';

describe('AdditionalContainerComponent', () => {
  const props = {
    clientId: 1,
    getClient: () => ({ id: 3 }),
  };
  it('is defined', () => {
    const wrapper = shallow(
      <AdditionalContainer
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('correctly sets state when getClient is successful', (done) => {
    const wrapper = shallow(
      <AdditionalContainer
        {...props}
      />);
    const f = () => {
      setTimeout(() => {
        expect(wrapper.instance().state.client.id).toBe(3);
        done();
      }, 0);
    };
    f();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <AdditionalContainer
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
