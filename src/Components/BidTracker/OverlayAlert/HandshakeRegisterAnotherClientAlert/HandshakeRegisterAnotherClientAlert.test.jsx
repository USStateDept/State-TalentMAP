import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HandshakeRegisterAnotherClientAlert from './HandshakeRegisterAnotherClientAlert';
import bidListObject from '../../../../__mocks__/bidListObject';

describe('HandshakeRegisterAnotherClientAlert', () => {
  const props = {
    bid: bidListObject.results[0],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HandshakeRegisterAnotherClientAlert {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when skill and grade are undefined', () => {
    const wrapper = shallow(
      <HandshakeRegisterAnotherClientAlert
        {...props}
        bid={{ ...props.bid, position: { ...props.bid.position, skill: null, grade: null } }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HandshakeRegisterAnotherClientAlert {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
