import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidListButton from './BidListButton';

describe('BidListButtonComponent', () => {
  const bidList = [{ id: 1 }];
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

  it('can handle text change when savedState is true', () => {
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

  it('can handle text change when savedState is false', () => {
    const wrapper = shallow(
      <BidListButton
        id={1}
        toggleBidPosition={() => {}}
        compareArray={[{ id: 2 }]}
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
        compareArray={[{ id: 2 }]}
        isLoading={false}
      />,
    );
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
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
