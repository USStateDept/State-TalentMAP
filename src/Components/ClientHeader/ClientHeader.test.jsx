import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { includes } from 'lodash';
import ClientHeaderContainer, { ClientHeader, mapDispatchToProps } from './ClientHeader';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ClientHeader', () => {
  let props;
  beforeEach(() => {
    props = {
      id: 1,
      unset: () => {},
      history: { listen: () => {} },
      client: { perdet_seq_number: 1, name: 'Mary' },
    };
  });

  it('is defined', () => {
    const wrapper = shallow(<ClientHeader {...props} />);
    expect(wrapper).toBeDefined();
  });

  it("displays a proxied CDO's name", () => {
    const wrapper = shallow(<ClientHeader {...props} bidderPortfolioSelectedCDO={{ name: 'Andrew Proxy' }} />);
    expect(wrapper.find('#search-as-name').text()).toMatch(/Proxying as Andrew Proxy/);
    expect(wrapper).toBeDefined();
  });

  it('uses different colors when proxied as another CDO', () => {
    const wrapper = shallow(<ClientHeader {...props} bidderPortfolioSelectedCDO={{ name: 'Andrew Proxy' }} />);
    expect(wrapper.find('SkeletonTheme').at(0).props().color).toBe('#FFF1D2');
    wrapper.setProps({ ...props, bidderPortfolioSelectedCDO: { name: 'Self', isCurrentUser: true } });
    wrapper.update();
    expect(wrapper.find('SkeletonTheme').at(0).props().color).toBe('#DCE4EF');
    expect(wrapper).toBeDefined();
  });

  it('is displays the proxy CDO when is exists and is not the current user', () => {
    const wrapper = shallow(<ClientHeader {...props} bidderPortfolioSelectedCDO={{ name: 'Mike', isCurrentUser: false }} />);
    const text = wrapper.find('#search-as-name').text();
    expect(includes(text, '(Proxying as Mike)')).toBe(true);
  });

  it('calls unset() on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ClientHeader
      {...props}
      unset={spy}
      client={{ perdet_seq_number: 1 }}
    />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('it mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({ clientView: { client: {} } })}>
        <MemoryRouter>
          <ClientHeaderContainer {...props} />
        </MemoryRouter>
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ClientHeader {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when proxying as another CDO', () => {
    const wrapper = shallow(<ClientHeader {...props} bidderPortfolioSelectedCDO={{ name: 'Andrew Proxy' }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
