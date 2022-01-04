import { shallow } from 'enzyme';
import sinon from 'sinon';
import LogRow from './LogRow';

describe('LogRow', () => {
  const props = {
    name: 'name',
    isSelected: false,
    LogRowIsLoading: false,
    onDownloadClick: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<LogRow {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isSelected === true', () => {
    const wrapper = shallow(<LogRow {...props} isSelected />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when loading states are true', () => {
    const wrapper = shallow(<LogRow {...props} isLoading LogRowIsLoading />);
    expect(wrapper).toBeDefined();
  });

  it('responds to button onClick', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<LogRow {...props} onDownloadClick={spy} />);
    wrapper.find('button').simulate('click');
    sinon.assert.calledOnce(spy);
  });

  it('responds to interactive element onClick', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<LogRow {...props} onClick={spy} />);
    wrapper.find('InteractiveElement').props().onClick();
    sinon.assert.calledOnce(spy);
  });
});
