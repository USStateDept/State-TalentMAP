import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import ResultsSearchHeader from './ResultsSearchHeader';

describe('ResultsSearchHeaderComponent', () => {
  let wrapper = null;

  const defaultKeyword = 'keyword';

  const props = {
    onUpdate: () => {},
    defaultKeyword,
    onFilterChange: () => {},
  };

  it('is defined', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined without a defaultKeyword', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      defaultKeyword={null}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(wrapper.instance().props.defaultKeyword).toBe(defaultKeyword);
  });

  it('can call the onUpdate function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().props.onUpdate();
    expect(spy.calledOnce).toBe(true);
  });

  it('can call the changeText function', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={() => {}}
    />);
    wrapper.instance().changeText('q', { target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can call the onChangeQueryText function', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={() => {}}
    />);
    wrapper.instance().onChangeQueryText({ target: { value: defaultKeyword } });
    expect(wrapper.instance().state.q.value).toBe(defaultKeyword);
  });

  it('can call the submitSearch function', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(spy.calledOnce).toBe(true);
  });

  it('sets state and submits the search on this.onClear()', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsSearchHeader
      {...props}
      onUpdate={spy}
    />);
    wrapper.instance().setState({ q: { value: 'abc' } });
    wrapper.instance().onClear();
    expect(wrapper.instance().state.q.value).toBe('');
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsSearchHeader
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
