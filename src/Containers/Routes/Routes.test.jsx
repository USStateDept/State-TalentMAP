import TestUtils from 'react-dom/test-utils';
import MockTestProvider from '../../testUtilities/MockProvider';
import Routes from './Routes';

describe('Routes', () => {
  it('handles a login route', () => {
    const routes = TestUtils.renderIntoDocument(<MockTestProvider>
      <Routes isAuthorized={() => false} />
    </MockTestProvider>);
    expect(routes).toBeDefined();
  });

  ['/', '/results', '/details/00011111', '/compare/00011111,00011112',
    '/profile/favorites', '/profile/searches', '/profile/dashboard',
    '/profile/bidderportfolio', '/profile/glossaryeditor', '/profile/bidtracker',
    '/about', '/fakeroute'].map(r => (
    it(`handles ${r} route`, () => {
      const routes = TestUtils.renderIntoDocument(
        <MockTestProvider memoryProps={{ initialEntries: [r] }}>
          <Routes isAuthorized={() => true} />
        </MockTestProvider>);
      expect(routes).toBeDefined();
    })
  ));
});
