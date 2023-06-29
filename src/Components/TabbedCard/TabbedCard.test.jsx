import { shallow } from 'enzyme';
import TabbedCard from './TabbedCard';

describe('TabbedCard', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <TabbedCard
        tabs={[
          {
            text: 'Tab 1',
            value: '1',
            content: <div>First Tab Panel</div>,
          }, {
            text: 'Tab 2',
            value: '2',
            content: <div>Second Tab Panel</div>,
          }]}
      />
    );
    expect(wrapper).toBeDefined();
  });
});
