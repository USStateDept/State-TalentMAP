import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ViewDetailsButton from './ViewDetailsButton';

describe('ViewDetailsButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can take props', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(wrapper.props().toLink).toBe('/details/1');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ViewDetailsButton id="1" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
