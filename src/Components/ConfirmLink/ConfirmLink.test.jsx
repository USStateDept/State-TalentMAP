import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ConfirmLink from './ConfirmLink';

describe('ConfirmLinkComponent', () => {
  const props = {
    defaultText: 'Remove',
    onClick: sinon.spy(),
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ConfirmLink {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('calls onClick when clicked twice', () => {
    const wrapper = shallow(
      <ConfirmLink {...props} />,
    );
    expect(wrapper).toBeDefined();
    const instance = wrapper.instance();
    expect(wrapper.state().confirm).toBe(false);
    instance.onClick();
    sinon.assert.notCalled(props.onClick);
    expect(wrapper.state().confirm).toBe(true);
    instance.onClick();
    sinon.assert.calledOnce(props.onClick);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ConfirmLink {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
