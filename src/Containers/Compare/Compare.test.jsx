import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Compare, { Compare as CompareComponent, mapDispatchToProps } from './Compare';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  it('is defined', () => {
    const compare = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Compare
        isAuthorized={() => true}
        onNavigateTo={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(compare).toBeDefined();
  });

  it('passes the correct value to getComparisons when onToggle is called', () => {
    const compare = shallow(
      <CompareComponent
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        match={{ params: { ids: '1,2,3' } }}
        fetchData={() => {}}
        hasErrored={false}
        isLoading={false}
        fetchFavorites={() => {}}
        fetchBidList={() => {}}
      />,
    );
    const instance = compare.instance();
    const input = '1';
    const getComparisonsSpy = sinon.spy(instance, 'getComparisons');
    instance.onToggle(input);
    const exp = '2,3';
    expect(getComparisonsSpy.getCall(0).args[0]).toBe(exp);
  });

  it('can handle authentication redirects', () => {
    const compare = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Compare
        isAuthorized={() => false}
        onNavigateTo={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(compare).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1,2'],
    onNavigateTo: ['/obc/post/1/'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
