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

  it('can call the onFilterChange function', () => {
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
    wrapper.instance().onFilterChange({ target: { value: 'test' } });
    sinon.assert.calledOnce(spy);
  });

  it('sets state when onSeasonChange() is called', () => {
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
    wrapper.instance().setState({ hasSeasons: false });

    const valTrue = ['test'];
    wrapper.instance().onSeasonChange(valTrue);
    expect(wrapper.instance().state.hasSeasons).toEqual(true);

    const valFalse = [];
    wrapper.instance().onSeasonChange(valFalse);
    expect(wrapper.instance().state.hasSeasons).toEqual(false);
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
