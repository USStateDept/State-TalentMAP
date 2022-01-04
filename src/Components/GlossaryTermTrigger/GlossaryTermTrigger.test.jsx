import { shallow } from 'enzyme';
import sinon from 'sinon';
import GlossaryTermTrigger, { mapDispatchToProps } from './GlossaryTermTrigger';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

describe('GlossaryTermTriggerComponent', () => {
  const props = {
    text: 'text',
    term: 'term',
    toggle: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <GlossaryTermTrigger.WrappedComponent
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls toggle() on click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <GlossaryTermTrigger.WrappedComponent
        {...props}
        toggle={spy}
      />,
    );
    wrapper.find('InteractiveElement').simulate('click');
    sinon.assert.calledOnce(spy);

    wrapper.instance().onClickLink();
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
