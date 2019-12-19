import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import SearchAsClientButtonContainer, { SearchAsClientButton, genSearchParams, mapDispatchToProps } from './SearchAsClientButton';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SearchAsClientButton', () => {
  const props = {
    user: { perdet_seq_number: 1 },
    set: () => {},
    history: { push: () => {} },
  };

  it('is defined', () => {
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('sets state and pushes to history when newProps client.id matches id', (done) => {
    const spy = sinon.spy();
    global.document.getElementById = () => ({ offsetTop: '50px' });
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    wrapper.setProps({
      ...props,
      client: { perdet_seq_number: 1 },
      history: { push: spy },
      client: { perdet_seq_number: 1 },
      isLoading: false,
      hasErrored: false,
    });
    setTimeout(() => {
      expect(wrapper.instance().state.hasPushed).toBe(true);
      sinon.assert.calledOnce(spy);
      done();
    }, 1);
  });

  it('calls set() on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<SearchAsClientButton {...props} set={spy} />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('generates a query string on genSearchParams()', () => {
    const user = {
      perdet_seq_number: 2,
      skills: [{ code: 1 }, { code: '5A' }],
      grade: '03',
    };
    const result = () => genSearchParams(user);
    expect(result()).toBe('position__grade__code__in=03&position__skill__code__in=1%2C5A');

    user.grade = null;
    expect(result()).toBe('position__skill__code__in=1%2C5A');

    user.skills = null;
    expect(result()).toBe('');
  });

  it('it mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({ clientView: {} })}>
        <MemoryRouter>
          <SearchAsClientButtonContainer {...props} />
        </MemoryRouter>
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    set: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
