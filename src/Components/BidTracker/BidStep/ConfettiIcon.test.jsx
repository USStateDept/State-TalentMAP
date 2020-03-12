import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ConfettiIcon from './ConfettiIcon';

describe('ConfettiIconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ConfettiIcon><div /></ConfettiIcon>,
    );
    expect(wrapper).toBeDefined();
  });

  it('when colors are provided', () => {
    const wrapper = shallow(
      <ConfettiIcon colors={['#fff', '#000']}><div /></ConfettiIcon>,
    );
    expect(wrapper).toBeDefined();
  });

  it('updates state on mouseover', (done) => {
    const wrapper = shallow(
      <ConfettiIcon><div /></ConfettiIcon>,
    );
    wrapper.simulate('mouseover');
    expect(wrapper.instance().state.isPartyTime).toBe(true);
    setTimeout(() => {
      expect(wrapper.instance().state.isPartyTime).toBe(false);
      done();
    }, 1);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ConfettiIcon><div /></ConfettiIcon>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when colors are provided', () => {
    const wrapper = shallow(
      <ConfettiIcon colors={['#fff', '#000']}><div /></ConfettiIcon>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
