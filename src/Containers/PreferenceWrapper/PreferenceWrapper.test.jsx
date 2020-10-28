import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import MockTestProvider from '../../testUtilities/MockProvider';
import PreferenceWrapperContainer, { PreferenceWrapper, mapDispatchToProps } from './PreferenceWrapper';

describe('PreferenceWrapper', () => {
  const props = {
    keyRef: 'key',
    onSelect: () => {},
    childCallback: 'onClick',
    setPreference: () => {},
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<MockTestProvider>
      <PreferenceWrapperContainer {...props}>
        <button />
      </PreferenceWrapperContainer>
    </MockTestProvider>);
    expect(wrapper).toBeDefined();
  });

  it('calls onSelect() and setPreference() when cb() is called', () => {
    const onSelectSpy = sinon.spy();
    const setPreferenceSpy = sinon.spy();
    const wrapper = shallow(
      <PreferenceWrapper
        keyRef="key"
        onSelect={onSelectSpy}
        childCallback="onClick"
        setPreference={setPreferenceSpy}
      >
        <div />
      </PreferenceWrapper>,
    );
    wrapper.instance().cb({ target: { value: 1 } });
    sinon.assert.calledOnce(onSelectSpy);
    sinon.assert.calledOnce(setPreferenceSpy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    setPreference: ['key', 5],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
