import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidStatCard from './BidStatCard';

describe('BidStatCardComponent', () => {
  const props = {
    title: 'Example statistic',
    number: 2,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidStatCard
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when number is a string', () => {
    const wrapper = shallow(
      <BidStatCard
        {...props}
        number="50.17%"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the number in the .bid-stat-card-number div', () => {
    const wrapper = shallow(
      <BidStatCard
        {...props}
      />,
    );
    expect(wrapper.find('.bid-stat-card-number').text()).toBe(`${props.number}`);
  });

  it('renders the title in the .bid-stat-card-title div', () => {
    const wrapper = shallow(
      <BidStatCard
        {...props}
      />,
    );
    expect(wrapper.find('.bid-stat-card-title').text()).toBe(props.title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidStatCard
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
