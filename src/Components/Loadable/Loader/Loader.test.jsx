import { shallow } from 'enzyme';
import React from 'react';
import createLoader from './Loader';

describe('Loader', () => {
  it('is defined', () => {
    const path = () => System.import('../LoadingError');
    const LoadedComponent = createLoader({ path });
    expect(LoadedComponent).toBeDefined();
  });

  it('it renders the source component', (done) => {
    const path = () => System.import('../LoadingError');
    const LoadedComponent = createLoader({ path, timeout: 100 });
    const f = () => {
      setTimeout(() => {
        console.log(shallow(<LoadedComponent />));
        done();
      }, 4000);
    };
    f();
  });
});
