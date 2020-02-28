import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ListItem from './ListItem';

describe('BidControlsComponent', () => {
  const props = {
    item: 'label 1',
    selectValue: () => {},
    getIsSelected: () => false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ListItem {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls selectValue() on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ListItem {...props} selectValue={spy} />,
    );
    wrapper.find('InteractiveElement').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('applies props when getIsSelected returns true', () => {
    const getIsSelected = () => true;
    const wrapper = shallow(
      <ListItem {...props} getIsSelected={getIsSelected} />,
    );
    expect(wrapper.find('InteractiveElement').props()['data-selected']).toBe('selected');
    expect(wrapper.find('InteractiveElement').props()['aria-selected']).toBe(true);
  });

  it('applies props when getIsSelected returns false', () => {
    const getIsSelected = () => false;
    const wrapper = shallow(
      <ListItem {...props} getIsSelected={getIsSelected} />,
    );
    expect(wrapper.find('InteractiveElement').props()['data-selected']).toBe('');
    expect(wrapper.find('InteractiveElement').props()['aria-selected']).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ListItem {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
