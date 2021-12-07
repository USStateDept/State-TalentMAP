import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import ProfilePublic, { mapDispatchToProps } from './ProfilePublic';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ProfilePublic', () => {
  const userProfile = {
    assignments: [],
    bidList: [],
  };
  it('is defined', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ProfilePublic
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        userProfile={userProfile}
      />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <ProfilePublic
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        userProfile={userProfile}
      />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: [1],
    onNavigateTo: ['/results'],
    deleteBid: [12],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
