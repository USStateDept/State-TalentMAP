import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import TokenValidation, { mapDispatchToProps } from './TokenValidation';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)({});

describe('TokenValidation', () => {
  const loginObject = {
    requesting: true,
    successful: false,
    messages: [],
    errors: [],
  };

  const errors = [
    {
      body: 'Request failed with status code 400',
      time: '2017-07-27T20:02:27.683Z',
    },
  ];

  it('can render', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore}>
        <MemoryRouter>
          <TokenValidation login={loginObject} />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(
      <TokenValidation.WrappedComponent login={loginObject} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can handle other props', () => {
    const wrapper = shallow(
      <TokenValidation.WrappedComponent
        login={{ ...loginObject, requesting: false, errors, messages: errors }}
      />,
    );
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    tokenValidationRequest: ['token'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
