import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import { SearchAsClientButton, genSearchParams, mapDispatchToProps } from './SearchAsClientButton';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('SearchAsClientButton', () => {
  const props = {
    user: { perdet_seq_number: 1 },
    set: () => {},
    fetchSuggestions: () => {},
    history: { push: () => {} },
  };

  it('is defined', () => {
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('sets pushes to history when newProps client.id matches id', (done) => {
    const spy = sinon.spy();
    global.document.getElementById = () => ({ offsetTop: '50px' });
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    wrapper.simulate('click');
    wrapper.setProps({
      ...props,
      client: { perdet_seq_number: 1 },
      history: { push: spy },
      isLoading: false,
      hasErrored: false,
      useRecommended: false,
    });
    setTimeout(() => {
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

  it('sets state and navigates on stringifyParamsAndNavigate()', (done) => {
    const params = { skill: '', grade: '03,04' };
    const history = { push: sinon.spy() };
    const wrapper = shallow(<SearchAsClientButton {...props} history={history} />);
    wrapper.setState({ clicked: true });
    wrapper.instance().stringifyParamsAndNavigate(params);
    expect(wrapper.instance().state.clicked).toBe(false);
    setTimeout(() => {
      sinon.assert.calledOnce(history.push);
      done();
    }, 0);
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

  it('matches snapshot', () => {
    const wrapper = shallow(<SearchAsClientButton {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    set: [1],
    fetchSuggestions: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
