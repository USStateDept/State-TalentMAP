import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider } from 'flag';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getFlags from '../flags';

const flags = () => getFlags();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const MockTestProvider = ({ flagProps, providerProps, memoryProps, children }) => (
  <FlagsProvider flags={flags()} {...flagProps}>
    <Provider store={mockStore({})} {...providerProps}>
      <MemoryRouter {...memoryProps}>
        {children}
      </MemoryRouter>
    </Provider>
  </FlagsProvider>
);

MockTestProvider.propTypes = {
  flagProps: PropTypes.shape({}),
  providerProps: PropTypes.shape({}),
  memoryProps: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

MockTestProvider.defaultProps = {
  flagProps: {},
  providerProps: {},
  memoryProps: {},
};

export default MockTestProvider;
