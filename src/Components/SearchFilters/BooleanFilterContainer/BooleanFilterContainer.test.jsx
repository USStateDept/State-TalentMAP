import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import BooleanFilterContainer from './BooleanFilterContainer';

describe('BooleanFilterContainerComponent', () => {
  const items = [{
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true }],
  }];

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BooleanFilterContainer
        onBooleanFilterClick={() => {}}
        filters={items}
        legendTitle="Legend"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can handle click events', () => {
    const onClick = sinon.spy();
    const wrapper = mount(
      <BooleanFilterContainer
        onBooleanFilterClick={onClick}
        filters={items}
        legendTitle="Legend"
      />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onClick.calledOnce).toBe(true);
  });
});
