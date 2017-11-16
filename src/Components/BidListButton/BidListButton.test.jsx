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
});
