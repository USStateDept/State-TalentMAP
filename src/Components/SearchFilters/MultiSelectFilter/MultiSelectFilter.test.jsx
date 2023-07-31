import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import MultiSelectFilter from './MultiSelectFilter';

describe('MultiSelectFilterComponent', () => {
  const item = {
    item: { title: 'title', selectionRef: 'ref', description: 'filterType' },
    data: [{ id: 1, isSelected: true, long_description: 'description', description: 'description', title: 'title', name: 'name' },
      { id: 2, isSelected: true, long_description: 'description', description: 'a description', title: 'title', name: 'name' },
      { id: 3, isSelected: true, long_description: 'description 2', description: '#a number description', title: 'title 2', name: 'name 2' }],
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={spy}
        item={item}
      />,
    );
    wrapper.instance().onCheckBoxClick(1, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('creates term titles when groupAlpha is true', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
        groupAlpha
      />,
    );
    expect(wrapper.find('.term-title').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when groupAlpha is true', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
        groupAlpha
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
