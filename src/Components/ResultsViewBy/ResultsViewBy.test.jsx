import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsViewBy from './ResultsViewBy';

describe('ResultsViewByComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ResultsViewBy />);
    expect(wrapper).toBeDefined();
  });

  it('can call the selectCard function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ResultsViewBy onClick={spy} />);
    wrapper.find('#select-card').simulate('click');
    expect(wrapper.instance().state.selected.value).toBe('card');
    sinon.assert.calledOnce(spy);
  });

  it('can call the selectGrid function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ResultsViewBy onClick={spy} />);
    wrapper.find('#select-grid').simulate('click');
    expect(wrapper.instance().state.selected.value).toBe('grid');
    sinon.assert.calledOnce(spy);
  });

  it('can set an initial value', () => {
    const initial = 'test';
    const wrapper = shallow(<ResultsViewBy initial={initial} />);
    expect(wrapper.instance().state.selected.value).toBe(initial);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsViewBy />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
