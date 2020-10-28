import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import CompareDrawerContainer, { Compare, mapDispatchToProps } from './CompareDrawerContainer';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CompareDrawerContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <CompareDrawerContainer
        fetchData={() => {}}
        comparisons={resultsObject.results}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls getComparisons() when lsListener() is called', () => {
    const wrapper = shallow(
      <CompareDrawerContainer.WrappedComponent
        fetchData={() => {}}
        comparisons={resultsObject.results}
      />,
    );
    const spy = sinon.spy(wrapper.instance(), 'getComparisons');
    wrapper.instance().lsListener();
    sinon.assert.calledOnce(spy);
  });

  it('is defined after calling componentWillUnmount()', () => {
    const wrapper = shallow(
      <CompareDrawerContainer.WrappedComponent
        fetchData={() => {}}
        comparisons={resultsObject.results}
      />,
    );
    wrapper.instance().componentWillUnmount();
    expect(wrapper).toBeDefined();
  });

  it('sets state after calling scrollListener()', () => {
    const wrapper = shallow(
      <CompareDrawerContainer.WrappedComponent
        fetchData={() => {}}
        comparisons={resultsObject.results}
      />,
    );
    wrapper.setState({ isHidden: true });
    wrapper.instance().scrollListener();
    expect(wrapper.instance().state.isHidden).toBe(false);
  });

  it('returns correct values for shouldComponentUpdate', () => {
    const props = {
      fetchData: () => {},
      comparisons: resultsObject.results,
      hasErrored: false,
    };
    const wrapper = shallow(
      <Compare
        {...props}
      />,
    );
    // check that new props return true
    const shouldReturnTrue = wrapper.instance().shouldComponentUpdate({}, {});
    expect(shouldReturnTrue).toBe(true);
    // check that new state values, excluding 'comparisons', returns true
    const shouldAlsoReturnTrue = wrapper.instance().shouldComponentUpdate({}, { prevComparisons: ['fake'],
      isHidden: true });
    expect(shouldAlsoReturnTrue).toBe(true);
    // if everything else is equal but 'comparisons' is new, should return false
    const shouldReturnFalse = wrapper.instance().shouldComponentUpdate(props, { ...wrapper.instance().state, comparisons: ['new'] });
    expect(shouldReturnFalse).toBe(false);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1,2'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
