import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InformationDataPoint from './InformationDataPoint';

describe('InformationDataPointComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<InformationDataPoint content="content" />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when titleOnBottom is true', () => {
    const wrapper = shallow(<InformationDataPoint content="content" titleOnBottom />);
    expect(wrapper).toBeDefined();
  });

  it('receives the className prop', () => {
    const wrapper = shallow(<InformationDataPoint content="content" className="test-class" />);
    expect(wrapper.find('.test-class').exists()).toBe(true);
  });

  it('renders the data-point-title div when title is present', () => {
    const wrapper = shallow(<InformationDataPoint content="c" title="t" className="test-class" />);
    expect(wrapper.find('.data-point-title').exists()).toBe(true);
  });

  it('does not render the data-point-title div when title is not present', () => {
    const wrapper = shallow(<InformationDataPoint content="content" className="test-class" />);
    expect(wrapper.find('.data-point-title').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<InformationDataPoint content="content" title="title" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when titleOnBottom is true', () => {
    const wrapper = shallow(<InformationDataPoint content="content" titleOnBottom title="title" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when sideBySide is true', () => {
    const wrapper = shallow(<InformationDataPoint content="content" sideBySide title="title" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
