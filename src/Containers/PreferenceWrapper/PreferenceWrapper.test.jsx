import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import MockTestProvider from '../../testUtilities/MockProvider';
import PreferenceWrapper, { mapDispatchToProps } from './PreferenceWrapper';

describe('PreferenceWrapper', () => {
  it('is defined', () => {
    const results = TestUtils.renderIntoDocument(<MockTestProvider>
      <PreferenceWrapper
        keyRef="key"
        onSelect={() => {}}
        childCallback="onClick"
        setPreference={() => {}}
      >
        <button />
      </PreferenceWrapper>
    </MockTestProvider>);
    expect(results).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    setPreference: ['key', 5],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
