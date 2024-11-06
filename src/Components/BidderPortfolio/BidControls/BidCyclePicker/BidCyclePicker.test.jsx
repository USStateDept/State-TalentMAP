import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCyclePicker, { renderList } from './BidCyclePicker';

describe('BidControlsComponent', () => {
  const props = {
    fetchSeasons: () => {},
    setSeasons: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidCyclePicker.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('returns an array of items when renderList() is called', () => {
    const output = renderList(
      { items: [
        { id: 1, description: 'a' },
        { id: 2, description: 'b' },
        { id: 3, description: 'c' },
      ],
      selectValue: () => {},
      getIsSelected: () => false },
    );
    expect(output.length).toBe(3);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidCyclePicker.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
