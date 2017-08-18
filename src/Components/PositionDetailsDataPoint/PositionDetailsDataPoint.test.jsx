import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionDetailsDataPoint from './PositionDetailsDataPoint';

describe('PositionDetailsDataPoint', () => {
  let wrapper = null;

  it('can receive props', () => {
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description="Text" />,
    );
    expect(wrapper.instance().props.title).toBe('Title');
    expect(wrapper.instance().props.description).toBe('Text');
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
    expect(wrapper.instance().props.description).toBe(1);
  });

  it('handles element props', () => {
    const description = (<span>test</span>);
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description={description} />,
    );
    expect(wrapper.instance().props.description).toBe(description);
  });

  it('handles an array of different prop types', () => {
    const description = ['test', 100, (<span key="a">test</span>)];
    wrapper = shallow(
      <PositionDetailsDataPoint title="Title" description={description} />,
    );
    expect(wrapper.instance().props.description).toBe(description);
  });
});
