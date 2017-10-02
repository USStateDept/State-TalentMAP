import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionsSectionTitleHeader from './PositionsSectionTitleHeader';

describe('PositionsSectionTitleHeaderComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PositionsSectionTitleHeader
        title="title"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const title = 'title';
    const wrapper = shallow(
      <PositionsSectionTitleHeader
        title={title}
      />,
    );
    expect(wrapper.instance().props.title).toBe(title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionsSectionTitleHeader
        title="title"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
