import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsDataPoint from './PositionDetailsDataPoint';

describe('PositionDetailsDataPoint', () => {
  let wrapper = null;

  it('is defined', () => {
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description="Text" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description="Text" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles numeric props', () => {
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description={1} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles element props', () => {
    const description = (<span>test</span>);
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description={description} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles an array of different prop types', () => {
    const description = ['test', 100, (<span key="a">test</span>)];
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description={description} />,
    );
    expect(wrapper).toBeDefined();
  });
});
