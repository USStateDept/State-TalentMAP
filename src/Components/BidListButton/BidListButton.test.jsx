import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidListButton from './BidListButton';

describe('BidListButtonComponent', () => {
  const bidList = [{ position: { id: 1 } }];
  const bidListFalse = [{ position: { id: 2 } }];

  it('is defined', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidList}
        isLoading={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles text change when savedState is true', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidList}
        isLoading={false}
      />,
    );
    expect(wrapper.find('Add')).toBeDefined();
  });

  it('handles text change when savedState is false', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidListFalse}
        isLoading={false}
      />,
    );
    expect(wrapper.find('Remove')).toBeDefined();
  });

  it('can call the toggleSaved function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={spy}
        compareArray={bidListFalse}
        isLoading={false}
      />,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('is disabled and correctly styled when disabled === true', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={spy}
        compareArray={bidListFalse}
        isLoading={false}
        disabled
      />,
    );
    wrapper.find('.usa-button-disabled').simulate('click');
    sinon.assert.notCalled(spy);
  });

  it('displays the spinner when isLoading is true', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={spy}
        compareArray={bidListFalse}
        isLoading
      />,
    );
    expect(wrapper.find('.ds-c-spinner').exists()).toBe(true);
  });

  it('hides the spinner when isLoading is false', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={spy}
        compareArray={bidListFalse}
        isLoading={false}
      />,
    );
    expect(wrapper.find('.ds-c-spinner').exists()).toBe(false);
  });

  it('matches snapshot when the user can add the position', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidListFalse}
        isLoading={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when the user can remove the position', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidList}
        isLoading={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when context.client === true', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={bidList}
        isLoading={false}
      />, { context: { isClient: true } },
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
