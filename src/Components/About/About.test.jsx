import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import About from './About';

describe('About', () => {
  it('is defined', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toBeDefined();
  });

  it('updates state on this.toggleEditor()', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.instance().state.editorVisible).toBe(false);
    wrapper.instance().toggleEditor();
    expect(wrapper.instance().state.editorVisible).toBe(true);
  });

  it('calls patchData on this.submit()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<About patchData={spy} />);
    wrapper.instance().submit();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<About />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
