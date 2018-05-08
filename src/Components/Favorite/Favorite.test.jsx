import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import Favorite from './Favorite';

describe('Favorite', () => {
  const refKey = 36;

  it('is defined', () => {
    const favorite = TestUtils.renderIntoDocument(
      <Favorite
        compareArray={[]}
        refKey={refKey}
        onToggle={() => {}}
      />);
    expect(favorite).toBeDefined();
  });

  it('is defined with different props', () => {
    const wrapper = shallow(
      <Favorite
        onToggle={() => {}}
        compareArray={[{ id: refKey }]}
        refKey={refKey}
        isLoading
        hasBorder
        hideText
      />);
    expect(wrapper).toBeDefined();
  });

  it('adds the correct class when useButtonClass is true', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Favorite onToggle={spy} compareArray={[{ id: refKey }]} refKey={refKey} useButtonClass />);
    expect(wrapper.find('.usa-button')).toBeDefined();
  });

  it('handles being in the enabled state', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Favorite onToggle={spy} compareArray={[{ id: refKey }]} refKey={refKey} />);
    expect(wrapper.find('.usa-button-secondary')).toBeDefined();
  });

  it('can call the onToggle function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Favorite onToggle={spy} compareArray={[]} refKey={refKey} />);
    wrapper.find('InteractiveElement').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot - Add state', () => {
    const wrapper = shallow(<Favorite onToggle={() => {}} compareArray={[]} refKey={refKey} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useButtonClass is true', () => {
    const wrapper = shallow(
      <Favorite onToggle={() => {}} compareArray={[]} refKey={refKey} useButtonClass />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useLongText is true - Add state', () => {
    const wrapper = shallow(<Favorite
      onToggle={() => {}}
      compareArray={[]}
      refKey={refKey}
      useLongText
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot - Remove state', () => {
    const array = [{ id: refKey }];
    const wrapper = shallow(<Favorite
      onToggle={() => {}}
      compareArray={array}
      refKey={refKey}
      useLongText
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useLongText is true - Remove state', () => {
    const array = [{ id: refKey }];
    const wrapper = shallow(<Favorite onToggle={() => {}} compareArray={array} refKey={refKey} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useSpinnerWhite is true', () => {
    const array = [{ id: refKey }];
    const wrapper = shallow(<Favorite
      onToggle={() => {}}
      compareArray={array}
      refKey={refKey}
      useSpinnerWhite
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot after clicking', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Favorite onToggle={spy} compareArray={[]} refKey={refKey} />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
