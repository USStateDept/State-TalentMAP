import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import Editor from './Editor';

describe('About', () => {
  it('is defined', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper).toBeDefined();
  });

  it('updates state on this.onContentChange()', () => {
    const wrapper = shallow(<Editor />);
    wrapper.instance().onContentChange('s');
    expect(wrapper.instance().state.data).toBe('s');
  });

  it('calls submit on this.submit()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Editor submit={spy} />);
    wrapper.instance().submit();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Editor />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
