import createLoader from './Loader';

// TODO - Would like to be able to test the component after a timeout, but jest
// does not seem to play well with dynamic imports. There should be a babel config
// or a global to make System.import available to jest. Right now it returns
// "System.import is not defined".
describe('Loader', () => {
  it('is defined', () => {
    const path = () => System.import('../LoadingError');
    const LoadedComponent = createLoader({ path });
    expect(LoadedComponent).toBeDefined();
  });

  it('is defined when timeout shouldPreload is true', () => {
    const path = () => System.import('../LoadingError');
    const timeout = 500;
    const LoadedComponent = createLoader({ path, shouldPreload: true, timeout });
    expect(LoadedComponent).toBeDefined();
  });
});
