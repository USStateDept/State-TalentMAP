import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Classifications } from 'Constants/Classifications';
import ClientBadgeList from './ClientBadgeList';

describe('ClientBadgeList', () => {
  const props = {
    clientClassifications: ['3', 'T', 'C'],
    Classifications,
  };

  it('is defined', () => {
    const wrapper = shallow(<ClientBadgeList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ClientBadgeList
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
