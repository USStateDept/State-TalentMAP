import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionsSectionTitle from './PositionsSectionTitle';

describe('PositionsSectionTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PositionsSectionTitle
        title="title"
        viewMoreLink="link"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const title = 'title';
    const wrapper = shallow(
      <PositionsSectionTitle
        title={title}
        viewMoreLink="link"
      />,
    );
    expect(wrapper.instance().props.title).toBe(title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionsSectionTitle
        title="title"
        viewMoreLink="link"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
