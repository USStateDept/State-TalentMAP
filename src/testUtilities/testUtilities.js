import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from '../api';

// Tests all functions within a mapDispatchToProps function.
// We take two arguments, one is the entire mapDispatchToProps function, which
// can be exported from the Container/Component. The second is a config
// object with any parameters we want to pass to the function with the same name.
// For example, to pass the argument "test" to the getData() function, and "test"
// and {1} to submitData() function, we could create an object such as
// { getData: ["test"], submitData: ["test", 1] }
// Then we spy dispatch and call each property of the mapDispatchToProps
// object. Calling each property should trigger the call count on the spy,
// which we test. We reset call count between tests since we're using the
// calledOnce method.
export function testDispatchFunctions(mapDispatchToProps, config = {}) {
  it('should call all mapDispatchToProps actions', () => {
    // create spy
    const dispatchSpy = sinon.spy();
    // object with all functions
    const spiedProps = mapDispatchToProps(dispatchSpy);
    // iterate on each key
    Object.keys(spiedProps).forEach((prop) => {
      // set the prop to test
      const propToTest = spiedProps[prop];
      // set any params passed in the config object
      let params = [];
      // if there any arguments for that param, set them
      if (config[prop]) { params = config[prop]; }
      // call the prop
      propToTest(...params);
      // ensure it was called once
      sinon.assert.calledOnce(dispatchSpy);
      // reset so that called count is 0
      dispatchSpy.reset();
    });
  });
}

export function setupAsyncMocks() {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mockAdapter = new MockAdapter(api);

  return { mockStore, mockAdapter };
}
