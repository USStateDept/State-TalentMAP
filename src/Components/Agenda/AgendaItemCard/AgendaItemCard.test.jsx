import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AgendaItemCard from './AgendaItemCard';

describe('AgendaItemCard Component', () => {
  const props = {
    agenda: {
      legs: [
        {
          pos_title: 'this long string should be shortened',
        },
        {
          pos_title: 'short',
        },
      ],
    },
  };

  it('is defined', () => {
    const wrapper = shallow(<AgendaItemCard />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<AgendaItemCard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('properly renders titles', () => {
    const wrapper = shallow(<AgendaItemCard {...props} />);
    expect(wrapper.find('.ai-history-card-title').text()).toBe('this long string s...0short');
  });
});
