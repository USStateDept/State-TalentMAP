import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HandshakeStatus from './HandshakeStatus';

describe('HandshakeStatus', () => {
  const props = {
    handshake: {},
    handshakeRegisteredDate: '',
    handshakeRegistered: false,
    infoIcon: false,
  };

  it('is defined', () => {
    const wrapper = shallow(<HandshakeStatus {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HandshakeStatus {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
