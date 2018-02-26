import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ArchiveIcon from './ArchiveIcon';

describe('ArchiveIconComponent', () => {
  const props = {
    onSubmitOption: () => {},
    isArchived: false,
    id: 1,
  };

  it('is defined', () => {
    const wrapper = shallow(<ArchiveIcon {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('can call the onSubmitOption function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ArchiveIcon {...props} onSubmitOption={spy} />);
    wrapper.find('InteractiveElement').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('sets the correct values when isArchived is true', () => {
    const wrapper = shallow(<ArchiveIcon {...props} isArchived />);
    expect(wrapper.find('InteractiveElement').render().text()).toBe('Un-archive this term');
    expect(wrapper.find('.term-archived').exists()).toBe(true);
  });

  it('sets the correct values when isArchived is false', () => {
    const wrapper = shallow(<ArchiveIcon {...props} isArchived={false} />);
    expect(wrapper.find('InteractiveElement').render().text()).toBe('Archive this term');
    expect(wrapper.find('.term-not-archived').exists()).toBe(true);
  });

  it('resets the isArchived state if an error is passed after initial mount', () => {
    const wrapper = shallow(<ArchiveIcon {...props} isArchived={false} />);
    expect(wrapper.instance().state.isArchived).toBe(false);
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.isArchived).toBe(true);
    wrapper.setProps({ hasErrored: true });
    expect(wrapper.instance().state.isArchived).toBe(false);
  });

  it('matches snapshot when isArchived is false', () => {
    const wrapper = shallow(<ArchiveIcon {...props} isArchived={false} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isArchived is true', () => {
    const wrapper = shallow(<ArchiveIcon {...props} isArchived />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
