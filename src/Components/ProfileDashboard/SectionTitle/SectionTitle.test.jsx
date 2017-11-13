import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SectionTitle from './SectionTitle';

describe('SectionTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<SectionTitle title="title" />);
    expect(wrapper).toBeDefined();
  });

  it('can receive "small" prop', () => {
    const wrapper = shallow(<SectionTitle title="title" small />);
    expect(wrapper.find('.dashboard-section-title-small').exists()).toBe(true);
  });

  it('can receive "className" prop', () => {
    const wrapper = shallow(<SectionTitle title="title" className="my-class" />);
    expect(wrapper.find('.my-class').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SectionTitle title="title" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
