import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import PositionsSectionTitleViewMore from './PositionsSectionTitleViewMore';

describe('PositionsSectionTitleViewMoreComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <PositionsSectionTitleViewMore
        viewMoreLink="title"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const viewMoreLink = 'title';
    const wrapper = shallow(
      <PositionsSectionTitleViewMore
        viewMoreLink={viewMoreLink}
      />,
    );
    expect(wrapper.instance().props.viewMoreLink).toBe(viewMoreLink);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <PositionsSectionTitleViewMore
        viewMoreLink="title"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
