import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InteractiveElement from './InteractiveElement';

describe('InteractiveElementComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<InteractiveElement type="div">text</InteractiveElement>);
    expect(wrapper).toBeDefined();
  });

  it('is defined with different type', () => {
    const wrapper = shallow(<InteractiveElement type="div">text</InteractiveElement>);
    expect(wrapper).toBeDefined();
  });

  it('is defined with arbitrary props', () => {
    const wrapper = shallow(
      <InteractiveElement tabIndex="0" onClick={() => {}} type="div">text</InteractiveElement>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<InteractiveElement type="span">text</InteractiveElement>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when type is "div"', () => {
    const wrapper = shallow(<InteractiveElement type="div">text</InteractiveElement>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
