import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import BackButton from './BackButton';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BackButton', () => {
  const props = {
    routerLocations: [
      { pathname: '/' },
      { pathname: '/results' },
    ],
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BackButton {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('renders the button', () => {
    const wrapper = shallow(<BackButton.WrappedComponent {...props} />);
    expect(wrapper.find('.button-back-link').exists()).toBe(true);
  });

  it('calls window.history.back on click', () => {
    const wrapper = shallow(<BackButton.WrappedComponent {...props} />);
    const spy = sinon.spy();
    window.history.back = spy;
    expect(wrapper.find('button').simulate('click'));
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BackButton.WrappedComponent {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
