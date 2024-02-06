import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ResultsPillContainer from './ResultsPillContainer';
import items from '../../__mocks__/pillList';

describe('ResultsPillContainerComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ResultsPillContainer
      items={items}
      onPillClick={() => {}}
      isClientsPage
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsPillContainer
      items={items}
      onPillClick={() => {}}
      isClientsPage
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles click events', () => {
    const onPillClick = sinon.spy();
    const wrapper = mount(<ResultsPillContainer
      items={items}
      onPillClick={onPillClick}
      isClientsPage
    />);
    wrapper.find('button').last().simulate('click');
    expect(onPillClick.calledOnce).toBe(true);
  });
});
