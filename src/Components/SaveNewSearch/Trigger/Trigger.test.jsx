import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Trigger, mapDispatchToProps } from './Trigger';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('TriggerComponent', () => {
  let wrapper = null;
  it('is defined', () => {
    wrapper = shallow(
      <Trigger>
        <button />
      </Trigger>,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls onClick', () => {
    const spy = sinon.spy();
    wrapper = shallow(
      <Trigger toggle={spy}>
        <button />
      </Trigger>,
    );
    wrapper.instance().onClick();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggle: [true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
