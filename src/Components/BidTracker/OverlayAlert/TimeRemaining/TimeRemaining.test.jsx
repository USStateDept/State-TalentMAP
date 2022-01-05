import { shallow } from 'enzyme';
import TimeRemaining from './TimeRemaining';

describe('TimeRemainingComponent', () => {
  const props = {
    date: new Date('June 10, 2021 12:15:00'),
  };
  it('is defined', () => {
    const wrapper = shallow(
      <TimeRemaining {...props} />,
    );
    expect(wrapper).toBeDefined();
  });
});
