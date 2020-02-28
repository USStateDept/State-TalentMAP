import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidControls from './BidControls';

describe('BidControlsComponent', () => {
  const props = {
    defaultHandshake: '',
    defaultOrdering: '',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidControls
        queryParamUpdate={() => {}}
        biddersNumerator={5}
        biddersDenominator={10}
        isLoading={false}
        viewType="card"
        changeViewType={() => {}}
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the onSortChange function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidControls
        queryParamUpdate={spy}
        biddersNumerator={5}
        biddersDenominator={10}
        isLoading={false}
        viewType="card"
        changeViewType={() => {}}
        {...props}
      />,
    );
    wrapper.instance().onSortChange({ target: { value: 'test' } });
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot when isLoading is false', () => {
    const wrapper = shallow(
      <BidControls
        queryParamUpdate={() => {}}
        biddersNumerator={5}
        biddersDenominator={10}
        isLoading={false}
        viewType="card"
        changeViewType={() => {}}
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading is true', () => {
    const wrapper = shallow(
      <BidControls
        queryParamUpdate={() => {}}
        biddersNumerator={5}
        biddersDenominator={10}
        isLoading={false}
        viewType="card"
        changeViewType={() => {}}
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
