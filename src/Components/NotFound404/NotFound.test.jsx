import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NotFound />,
    );
    expect(wrapper).toBeDefined();
  });
});
