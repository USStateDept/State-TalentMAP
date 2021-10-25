import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Handshake from './Handshake';

describe('HandshakeComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Handshake />);
    expect(wrapper).toBeDefined();
  });

  it('text correct when !shortName', () => {
    const wrapper = shallow(<Handshake />);
    expect(wrapper.find('Ribbon').props().text).toBe('Handshake');
  });

  it('text correct when shortName', () => {
    const wrapper = shallow(<Handshake shortName />);
    expect(wrapper.find('Ribbon').props().text).toBe('HS');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Handshake />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
