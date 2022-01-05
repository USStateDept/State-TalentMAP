import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BooleanFilter from './BooleanFilter';

describe('BooleanFilterComponent', () => {
  const item = {
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true }],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BooleanFilter
        onBooleanFilterClick={() => {}}
        item={item}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles different props', () => {
    const unselected = Object.assign({}, item);
    unselected.data[0].isSelected = false;
    const wrapper = shallow(
      <BooleanFilter
        onBooleanFilterClick={() => {}}
        item={unselected}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BooleanFilter
        onBooleanFilterClick={() => {}}
        item={item}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can receive click events', () => {
    const onClick = sinon.spy();
    const wrapper = mount(
      <BooleanFilter
        onBooleanFilterClick={onClick}
        item={item}
      />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onClick.calledOnce).toBe(true);
  });
});
