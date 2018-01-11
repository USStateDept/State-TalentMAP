import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidStepIcon from './BidStepIcon';

describe('BidStepIconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete needsAction isCurrent number={3} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('applies classes correctly when isComplete is true', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete needsAction isCurrent number={3} />,
    );
    expect(wrapper.find('.icon-complete').exists()).toBe(true);
  });

  it('applies classes correctly when isComplete is false', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete={false} needsAction isCurrent number={3} />,
    );
    expect(wrapper.find('.icon-incomplete').exists()).toBe(true);
  });

  it('applies classes correctly when isComplete and needsAction are false', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete={false} needsAction={false} isCurrent={false} number={3} />,
    );
    expect(wrapper.find('.number-icon-incomplete').exists()).toBe(true);
  });

  it('applies classes correctly when isComplete and needsAction are false, and isCurrent is true', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete={false} needsAction={false} isCurrent number={3} />,
    );
    expect(wrapper.find('.number-icon-is-current-no-action').exists()).toBe(true);
  });

  it('applies classes correctly when isComplete is false, and needsAction and isCurrent are true', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete={false} needsAction isCurrent number={3} />,
    );
    expect(wrapper.find('.number-icon-needs-action').exists()).toBe(true);
  });

  it('matches snapshot when isComplete is true', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete needsAction isCurrent number={3} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isComplete is false', () => {
    const wrapper = shallow(
      <BidStepIcon isComplete={false} needsAction isCurrent number={3} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
