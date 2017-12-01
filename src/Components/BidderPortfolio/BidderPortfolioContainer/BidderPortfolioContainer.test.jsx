import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import BidderPortfolioContainer from './BidderPortfolioContainer';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioContainerComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioContainer
      bidderPortfolio={bidderListObject}
      pageSize={8}
      pageNumber={1}
      queryParamUpdate={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can call the onPageChange function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<BidderPortfolioContainer
      bidderPortfolio={bidderListObject}
      pageSize={8}
      pageNumber={1}
      queryParamUpdate={spy}
    />);
    wrapper.instance().onPageChange({});
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot when there are results', () => {
    const wrapper = shallow(<BidderPortfolioContainer
      bidderPortfolio={bidderListObject}
      pageSize={8}
      pageNumber={1}
      queryParamUpdate={() => {}}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are no results', () => {
    const wrapper = shallow(<BidderPortfolioContainer
      bidderPortfolio={Object.assign({}, bidderListObject, { count: 0, results: [] })}
      pageSize={8}
      pageNumber={1}
      queryParamUpdate={() => {}}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
