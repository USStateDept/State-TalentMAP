import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FeatureFlags, { mapDispatchToProps } from './FeatureFlags';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('FeatureFlags', () => {
  const props = {
    featureFlags: {
      a: true,
      b: true,
      c: false,
      d: true,
    },
    featureFlagsIsLoading: false,
    featureFlagsHasErrored: false,
  };

  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FeatureFlags {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<FeatureFlags.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('calls postData on this.submitData()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<FeatureFlags.WrappedComponent {...props} postData={spy} />);
    wrapper.instance().submitData();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <FeatureFlags {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
